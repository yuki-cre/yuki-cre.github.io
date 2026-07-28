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
  let date = new Date()

  let h = date.getHours()
  let m = date.getMinutes()
  let s = date.getSeconds()

  // background(map(24, 0, 24, 0, 255))

  if (sky) {
    background(sky.get(map(h, 0, 24, 0, 1000), 0))


  }





  push();
  translate(width / 2, height / 2)

  for (let i = 1; i <= 12; i++) {
    let r = 250;//半径
    let d = (i * 30) - 90;//角度
    let x = cos(d) * r;//x座標＝cos(角度)＊半径
    let y = sin(d) * r;//y座標=sin(角度)＊半径
    text(i, x, y)//数字を描画
  }

  //分針
  strokeWeight(6)
  stroke('red')
  line(0, 0, cos(6 * m - 90) * 220, sin(6 * m - 90) * 220)

  if (bg) {
    bg.resize(400, 0)
    image(bg, -200, -bg.height / 2)
  }

  fill(0, 0, 0)
  textFont('Georgia')
  textSize(100)
  textAlign(CENTER)

  text(date.getFullYear(), 0, -300)
  text(date.getHours() + ":" + date.getMinutes(), 0, 0)
  text(date.getSeconds() + "." + date.getMilliseconds(), 0, 100)

  if (tenki) {
    text(tenki.hourly.temperature_2m[date.getDate.Hours()] + "°C", 0, 200)

    let wc = temki.hourly.weather_code[h];
    wc = 0; // デバッグ用。あとで消すこと
    if (wc == 0) {
      // 快晴
    } else if (wc < 10) {
      // 曇り
      loadImage("kumori.jpeg")

    } else {
      // それ以外
      wc = floor(wc / 10); // 10 の位（小数点切り捨て）
      if (4) {
        // 霧

      } else if (7) {
        // 雪
      } else if (6){
        //雨
      }else if (9){
        //雷
      }
    }
    

  }


  pop()



  beginClip()
  noFill()
  circle(width / 2, height / 2, 400)
  endClip()

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight)
}

function mouseClicked() {
  loadJSON("https://dog.ceo/api/breeds/image/random", receive)
}

