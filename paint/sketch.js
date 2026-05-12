function setup(){
  createCanvas(400,400)
}

function draw(){
  //background(220)

  noStroke()
  fill(0,0,0)

    if(mouseIsPressed){
      //条件がtrueだったら実行
      circle(mouseX,mouseY,10)
    }
  
}