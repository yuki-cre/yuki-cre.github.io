
let px;
let py;

let sw = 1;

let inputColor;
let inputWeight
let btnClear;

function setup(){
  createCanvas(400,400)
  pixelDensity(1);//ピクセル速度

  let code =getItem('paint')//保存データをロード
  decodePixels(code)


  inputColor=select('#color');
  inputWeight=select('#weight')
  btnClear=select('#clear')
  btnClear.mousePressed(clearAll)
  button = select('#save')
  button.mousePressed(saveImg)
  update();
}

function draw(){
  //background(220)

  //noStroke()
  //fill(0,0,0)

  if(keyIsPressed){//キーが押されていたら
    console.log(key)
    if(key == 'f'){//Fキーが押されていたら
    sw++;
  }
  else if (key=='d' ){
   sw--;
  }
  }

  sw=constrain(sw, 1,100)//awを1から100までの間で制限する

  stroke( inputColor.value() );//線の色
  strokeWeight(sw)
    if(mouseIsPressed){
      //条件がtrueだったら実行
      //circle(mouseX,mouseY,10)

      //前のフレームの位置から今のフレームの位置まで線を引く
      line(px,py,mouseX,mouseY)
    }

  update();
    
}

//マウス座標を更新
function update(){
  px=mouseX;
  py=mouseY;
}

function clearAll(){
  background(255)
}

function saveImg(){
  saveCanvas('paint.png')
}

function mouseReleased(){
  console.log('マウスを離しました。')
  let code=encodePixels();
  console.log(code)
  storeItem('paint',code);//符号化データをブラウザに保存
}