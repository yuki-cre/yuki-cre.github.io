let qrData;

function setup() {
  createCanvas(400, 400);

  qrData=qr.encodeQR('https://google.com')

console.log(qrData)
}


function draw() {
  background(220);

   textSize(50)

   let gap=10;

   fill(50,20,40)

   //配列のスキャン
   for(let y =0;y<qrData.length;y++){
    let row = qrData[y];//横一列
  
   for (let x = 0; x<row.length; x++){
    let cell = row[x];//1マスの黒かしろか

    if (cell){
      circle(x*gap,y*gap,gap)
    }
   }
  }
}

