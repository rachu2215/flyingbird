console.log(`Linked`);

let canvas = document.getElementById(`canvas`);
console.log(canvas);
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;

let velocity = 0;
let gravity = 0.1;

const drawer = canvas.getContext("2d"); // obtain a 2D rendering context from an HTML canvas element in JavaScript
canvas.style.position = "fixed"; //to fix window

// let x=0;
let y = 0;

let box = {
  top: 0,
  left: 200,
  width: 200,
  height: 200,
};  


const pipeVerticalGap = 800;
const pipehorizontalGap = 800;

const pipeWidth = 150;


let pipes = [];
let score = 0;

function generatePipes() {
  var topPipeHeight = generateRandomHeight(20, canvas.height - pipeVerticalGap);

  var leftOffset = 0;
  if (pipes.length === 0) {
    leftOffset = canvas.width; // Initial position of the first pipe
  } else {
    var lastPipe = pipes[pipes.length - 1];
    leftOffset = lastPipe.topPipe.left + pipehorizontalGap;
  }

  pipes.push({
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
  });
}

function drawPipes() {
  for (var i = 0; i < pipes.length; i++) {
    var pipe = pipes[i];
    
    pipe.topPipe.left--;
    pipe.bottomPipe.left--;
    
    drawBox(pipe.topPipe, "red");
    drawBox(pipe.bottomPipe, "red");

    if (checkCollision(box, pipe.topPipe) || checkCollision(box, pipe.bottomPipe)) {
      gameOver();
    }

    if (pipe.topPipe.left + pipeWidth < 0) {
      pipes.shift(); // Remove the pipe when it goes off the screen
      score++; // Increment the score when a pipe is passed
    }
  }
}

function checkCollision(box, pipe) {
  return (
    box.left < pipe.left + pipe.width &&
    box.left + box.width > pipe.left &&
    box.top < pipe.top + pipe.height &&
    box.top + box.height > pipe.top
  );
}

function gameOver() {
  clearInterval(gameInterval);
  alert("Game Over! Score: " + score);
  location.reload(); // Restart the game
}

function drawBox(box, color) {
  drawer.fillStyle = color; //to fill color to the box
  drawer.fillRect(box.left, box.top, box.width, box.height);
}

function generateRandomHeight(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function jump() {
  velocity = velocity - 15;
}

window.addEventListener("keydown", function (e) {
  if (e.key === " ") {
    jump();
  }
});

let gameInterval = setInterval(function () {
  drawer.clearRect(0, 0, canvas.width, canvas.width); //erasing all canvas

  velocity = velocity + gravity;
  box.top = box.top + velocity;

  if (box.top < 0) {
    box.top = 0;
    velocity = 0;
  }

  if (box.top > canvas.height - box.height) {
    box.top = canvas.height -box.height;
    velocity = 0;
    }
    
    drawPipes();
    drawBox(box, "blue");
    
    }, 1);
    
    // Generate initial set of pipes
    for (let i = 0; i < 3; i++) {
    generatePipes();
    }
