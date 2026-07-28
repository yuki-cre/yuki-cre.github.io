let bg;
let tenki;

let sky;//sora

function setup() {
  createCanvas(windowWidth, windowHeight)

  //角度の単位を度数に
  angleMode(DEGREES)

  // loadJSON("https://dog.ceo/api/breeds/image/random", receive)

  loadJSON("https://api.open-meteo.com/v1/forecast?latitude=36.5667&longitude=139.8833&hourly=temperature_2m,relative_humidity_2m,precipitation_probability,rain,weather_code,cloud_cover,wind_speed_10m&current=temperature_2m,relative_humidity_2m,is_day,precipitation,rain,weather_code,wind_speed_10m&timezone=Asia%2FTokyo", function (data) {
    console.log("天気情報")
    console.log(data)
    tenki = data;

  }, function (err) {
    // 取得エラー
    console.error("天気情報の取得に失敗しました。");
  });

  loadImage("sora.png", function (img) {
    sky = img
  })

  //console.log(gazou)


}

function receive(data) {
  //console.log(uketori)
  //console.log(data)

  //data.message

  //画像を読み込む
  loadImage(data.message, function (img) {
    bg = img;//画像を変数に保存
  });
}

function draw() {
  background(220);
  
  let date = new Date()

  console.log(date.getSeconds());

  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()

  // background(map(24, 0, 24, 0, 255))

  if (sky) {
    //background(sky.get(map(h, 0, 24, 0, 1000), 0))


  }





  push();
  translate(width / 2, height / 2)

  // 外枠
noFill();
stroke(70);
strokeWeight(12);
circle(0, 0, 570);

// 内側の枠
stroke(180);
strokeWeight(4);
circle(0, 0, 550);

for(let i = 0; i < 60; i++){

    let angle = i * 6 - 90;

    let r1 = 225;
    let r2 = 240;

    if(i % 5 == 0){
        // 5分ごとの長い線
        strokeWeight(5);
        r1 = 210;
    }else{
        // 普通の線
        strokeWeight(2);
    }

    line(
        cos(angle) * r1,
        sin(angle) * r1,
        cos(angle) * r2,
        sin(angle) * r2
    );
}


fill(80);
stroke(255);
strokeWeight(2);

circle(0,0,18);

fill(200);
circle(0,0,8);

  // 時針
stroke(0);
strokeWeight(8);

let hourAngle = (h % 12) * 30 + m * 0.5 - 90;

line(
  0,
  0,
  cos(hourAngle) * 120,
  sin(hourAngle) * 120
);

// 分針
stroke(50);
strokeWeight(5);

let minuteAngle = m * 6 + s * 0.1 - 90;

line(
  0,
  0,
  cos(minuteAngle) * 180,
  sin(minuteAngle) * 180
);

// 秒針
stroke("red");
strokeWeight(2);

let secondAngle = s * 6 - 90;

line(
  0,
  0,
  cos(secondAngle) * 220,
  sin(secondAngle) * 220
);

// 中心の丸
fill(0);
noStroke();
circle(0, 0, 15);

  for (let i = 1; i <= 12; i++) {
    let r = 250;//半径
    let d = (i * 30) - 90;//角度
    let x = cos(d) * r;//x座標＝cos(角度)＊半径
    let y = sin(d) * r;//y座標=sin(角度)＊半径
    text(i, x, y)//数字を描画
  }



  if (bg) {
    bg.resize(400, 0)
    image(bg, -200, -bg.height / 2)
  }

  fill(0, 0, 0)
  textFont('Georgia')
  textSize(100)
  textAlign(CENTER)

  text(date.getFullYear(), 0, -300)
  text(date.getHours() + ":" + nf(date.getMinutes(), 2), -450, -200);
  text(date.getSeconds(), -450, -100);

  if (tenki) {
    text(tenki.hourly.temperature_2m[h] + "°C", -450, 0)

    let wc = tenki.hourly.weather_code[h];
    wc = 0; // デバッグ用。あとで消すこと
    if (wc == 0) {
      // 快晴
    } else if (wc < 10) {
      // 曇り
      loadImage("kumori.jpeg")

    } else {
      // それ以外
      wc = floor(wc / 10); // 10 の位（小数点切り捨て）
      if (wc ==4) {
        // 霧

      } else if (wc ==7) {
        // 雪
      } else if (wc ==6){
        //雨
      }else if (wc ==9){
        //雷
      }
    }
    

  }


  pop()



 // beginClip()
 // noFill()
  //circle(width / 2, height / 2, 400)
  //endClip()

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function mouseClicked() {
  loadJSON("https://dog.ceo/api/breeds/image/random", receive)
}

