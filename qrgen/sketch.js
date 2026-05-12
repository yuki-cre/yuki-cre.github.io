let qrData;
let urlInput;
let colorInput;
let button

function setup() {
  createCanvas(windowWidth, 400);

  urlInput = select('#url')

  colorInput = select('#color')

  button = select('#save')
  button.mousePressed(saveQR);//ボタンを押すとsaveQRを呼ぶ


  console.log(qrData)
}

function windowResized() {
  resizeCanvas(windowWidth, 400)
}

function draw() {
  background(220);

  textSize(50)

  let gap = 10;

  //セルの色
  fill(colorInput.value())

  
  qrData = qr.encodeQR(urlInput.value())
  let w = gap * qrData.length;
  let h = w;



  //配列のスキャン
  for (let y = 0; y < qrData.length; y++) {
    let row = qrData[y];//横一列

    for (let x = 0; x < row.length; x++) {
      let cell = row[x];//1マスの黒かしろか

      if (cell) {
        rect(x * gap, y * gap, gap)
      }
    }
  }

  textSize(20)
  text(urlInput.value(), 40, 350)
}


function saveQR() {
  saveCanvas('qr.ping')
}
