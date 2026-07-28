//physics

import { drawBody, isOutOfBounds } from "./util.js";

import { Fruit,data } from "./Fruit.js"


let { Engine, Bodies, Composite, Body, Events } = Matter; // モジュールを変数化
let engine; // 物理エンジン
let fruits = [];//果物オブジェクトを入れる配列

let hitSE
let canvas
let ki


let scene = "title"; // 現在のシーン

let gameWidth = 400;
let gameHeight = 400;

let gameX;
let gameY;

let currentFruit;
let nextFruit;

let fruitTypes = [
  "cherry",
  "berry",
  "grape",
  "orange"
];

function setup() {
  
  canvas = createCanvas(windowWidth, windowHeight);
  gameX = (width - gameWidth) / 2;
  gameY = (height - gameHeight) / 2;

  canvas.position(
    (windowWidth - width) / 2,
    (windowHeight - height) / 2
  );

  // 物理エンジン（世界）を初期化
  engine = Engine.create();

  // 箱を生成 (X, Y, 幅, 高さ)
  //let boxA   = Bodies.rectangle(150, 200, 120, 120); // 箱（大）
  //let boxB   = Bodies.rectangle(200,   0,  80,  80); // 箱（小） 
  let ground = Bodies.rectangle(gameX + gameWidth / 2, gameY + 350, 380, 50, { isStatic: true }); // 地面

  let leftWall = Bodies.rectangle(gameX, gameY + 200, 20, 400, {
    isStatic: true
  });

  let rightWall = Bodies.rectangle(gameX + gameWidth, gameY + 200, 20, 400, {
    isStatic: true
  });





currentFruit = random(fruitTypes);
nextFruit = random(fruitTypes);




  loadImage("kibokasi.png", function (img) {
    ki = img
  })

  hitSE = loadSound("hitSEct");

  // 箱を世界に配置
  Composite.add(engine.world, [ground,
    leftWall,
    rightWall
  ]);

  //物体同士が衝突した時コールバックを実行する
  Events.on(engine, 'collisionStart', ev => {
    for (let i = 0; i < ev.pairs.length; i++) {
      let pair = ev.pairs[i]//衝突したペア
      let a = pair.bodyA.parent;//衝突物A
      let b = pair.bodyB.parent;//衝突物B

      if (hitSE) {
        hitSE.play();//衝突音を鳴らす
      }
      if (a.fruit) {
        //AがFruitだったら
        a.fruit.hit(b, b.fruit)
      }
    }
  })
}

function draw() {
  background(220);

  image(ki, 0, 0, width, height);

 

 

  //落とす果物を表示


 

  if (scene == "title") {
    // タイトル画面だったら
    textAlign(CENTER);
    textSize(30);
    text("Fruit game", width / 2, height / 2);

  } else if (scene == "play") {

     let x = constrain(mouseX, gameX + 20, gameX + gameWidth - 20);

     stroke(255, 255, 255, 80); // 白・半透明
strokeWeight(2);
line(x, gameY, x, gameY + gameHeight);

push();

translate(x, gameY + 20);

stroke(data[currentFruit].color);
fill(data[currentFruit].color);

if(data[currentFruit].shape){
   for (let part of data[currentFruit].shape) {

        beginShape();

        for (let v of part) {
            vertex(v.x, v.y);
        }

        endShape(CLOSE);}

}else{
    circle(0,0,data[currentFruit].size*2);
}

pop();

 textSize(20);
fill(255);
text("NEXT", width - 100, 50);

text(nextFruit, width - 100, 90);

    
    // 世界に配置された全ての物体を取得（配列） 
    let bodies = Composite.allBodies(engine.world);
    
    // 全ての物体を描画（配列をスキャン）
    // push();
    // translate(width /2, height / 2);
    for (let i = 0; i < bodies.length; i++) {
      let body = bodies[i];
      if (body.fruit) {//物体がフルーツだったら
        body.fruit.draw(); //Fruitのdraw
        if (isOutOfBounds(body, 0, -50, width, height)) {
          scene = 'gameover'

        }
      } else {//物体がフルーツではなかったら
        drawBody(body)
      }

    }
    // pop();


    // 世界の更新（1 フレーム時間を進める）
    Engine.update(engine, 15);

  }else if (scene == "gameover") {


    // 半透明の黒
    fill(0, 0, 0, 180);
    noStroke();
    rect(0, 0, width, height);

    // GAME OVER
    textAlign(CENTER, CENTER);

    fill(255, 60, 60);
    textSize(60);
    text("GAME OVER", width / 2, height / 2 - 40);

    fill(255);
    textSize(24);
    text("Click to Restart", width / 2, height / 2 + 30);

  }


}

function mousePressed() {
  let x = constrain(
    mouseX,
    gameX + 20,
    gameX + gameWidth - 20
);
  if (scene == "title") {
    scene = "play";

  } else if (scene == "play") {
    // 物体を生成
    //let body = Bodies.fromVertices(mouseX, mouseY, moon);
    //Body.scale(body, .5, .5);
    //Composite.add(engine.world, body);
   if(
    mouseX > gameX &&
    mouseX < gameX + gameWidth &&
    mouseY > gameY &&
    mouseY < gameY + gameHeight
){
    let fruit = new Fruit(currentFruit,x,gameY + 20, engine.world);
    fruits.push(fruit);
    currentFruit = nextFruit;
    nextFruit = random(fruitTypes);
}

  }else if (scene == "gameover") {
    location.reload();
}

}



window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
