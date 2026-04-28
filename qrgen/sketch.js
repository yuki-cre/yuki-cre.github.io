let qrData;
let urlInput;
let colorInput;

function setup() {
  createCanvas(windowWidth, 400);

  urlInput=select('#url')

  colorInput=select('#color')


console.log(qrData)
}
 function windowResized(){
  resizeCanvas(windowWidth,400)
 }

function draw() {
  background(220);

   textSize(50)

   let gap=10;

   //セルの色
   fill(colorInput.value())

  qrData=qr.encodeQR(urlInput.value())



   //配列のスキャン
   for(let y =0;y<qrData.length;y++){
    let row = qrData[y];//横一列
  
   for (let x = 0; x<row.length; x++){
    let cell = row[x];//1マスの黒かしろか

    if (cell){
      rect(x*gap,y*gap,gap)
    }
   }
  }

  textSize(20)
  text(urlInput.value(),40,350)
}

