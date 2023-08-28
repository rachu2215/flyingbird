console.log(`Linked`);

let canvas = document.getElementById(`canvas`);
console.log(canvas);
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

var hasCollided=false;
let pipeVelocity=1.5;

let score=0;

let velocity = 0;
let gravity = 0.1;

const drawer = canvas.getContext("2d"); // obtain a 2D rendering context from an HTML canvas element in JavaScript
canvas.style.position = "fixed"; //to fix window

// let x=0;
let y = 0;

let box = {
  top: canvas.height/2,
  left: 600,
  width: 150,
  height: 150,
};  


const pipeVerticalGap = 1000;
const pipehorizontalGap = 800;

const pipeWidth = 150;


let pipes=[];
 for(var i=0;i<10;i++)
 {
    pipes.push(generatePipe());
 }
 
  

setInterval(function () {

  if(hasCollided)
  {
    drawer.fillText("Game Over",canvas.width/2,canvas.height/2);
    setTimeout(function(){
      window.location.reload();
    })
  }
  drawer.clearRect(0, 0, canvas.width, canvas.width); //erasing all convas

  velocity = velocity + gravity;
  box.top = box.top + velocity;


  if (box.top < 0) {
    box.top = 0;
    velocity = 0;
  }

  if (box.top > canvas.height - box.height) {
    box.top = canvas.height - box.height;
    velocity = 0;
  }

  for(var i=0;i<pipes.length;i++)
  {
    var pipe=pipes[i];
    //drawing pipe
 
    // pipe.topPipe.left-=pipe.topPipe.left-1;
    pipe.topPipe.left-= pipeVelocity; 
    pipe.bottomPipe.left-= pipeVelocity;  
 
    drawBox(pipe.topPipe, " rgb(228, 43, 74)");
    drawBox(pipe.bottomPipe, " rgb(228, 43, 74)");

    if(pipe.topPipe.left<0)
    {
        pipes.shift();//remove 1st pipe from array
        pipes.push(generatePipe())//add new pipe to the last array
       if(!hasCollided){
        score++;
         }
        // document.write(`score : ${score}`);
      
    }
    checkCollision(pipe.topPipe,box)
    checkCollision(pipe.bottomPipe,box)
    //console.log(pipes)

   drawBox(box,hasCollided ?  "pink":"blue")

  //  drawer.fillStyle="black"
  // drawer.fillText(`Score:`)


  }
 
  
  //drawing box
  drawBox(box, "blue");
}, 1);



window.addEventListener("keydown", function (e) {
  //  console.log(e.key)

  if (e.key == " ") {
    velocity = velocity - 15;
  }
});

function drawBox(box, color) {
  drawer.fillStyle = color; //to fill color to the box

  drawer.fillRect(box.left, box.top, box.width, box.height);
}

//for generating random pipes

function generatePipe() {
  var topPipeHeight = generateRandomHeight(20,canvas.height-pipeVerticalGap);//generating random pipes


  //

  var leftOffset=box.left+800;
  if(pipes.length==0)
  {
    //change leftOffset
  } 
  else
  {
    var lastPipe=pipes[pipes.length-1];
    leftOffset=lastPipe.topPipe.left+pipehorizontalGap;
  }
  
  return {
    topPipe: {
      top: 0,
      left: leftOffset,
      width: pipeWidth,
      height: topPipeHeight,
    },

    bottomPipe: {
      top: topPipeHeight + pipeVerticalGap,
      left: leftOffset,
      width: pipeWidth,
      height: canvas.height - topPipeHeight - pipeVerticalGap,
    }, 
  };
}


//random value generation for generatePipes
function generateRandomHeight(min,max){
    return Math.floor( Math.random()*(max-min+1))+min;

}
   
function checkCollision(box1,box2)
{
    if(box1.left < box2.left+box2.width && 
        box1.left+box1.width > box2.left && 
        box1.top<box2.top+ box2.height&&
       box1.height + box1.top>box2.top) {
        alert(`Score:${score}`)
      
       }

       
}

