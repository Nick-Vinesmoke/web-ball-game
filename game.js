/*
███╗░░██╗██╗░█████╗░██╗░░██╗░░░░░░██╗░░░██╗██╗███╗░░██╗███████╗░██████╗███╗░░░███╗░█████╗░██╗░░██╗███████╗
████╗░██║██║██╔══██╗██║░██╔╝░░░░░░██║░░░██║██║████╗░██║██╔════╝██╔════╝████╗░████║██╔══██╗██║░██╔╝██╔════╝
██╔██╗██║██║██║░░╚═╝█████═╝░█████╗╚██╗░██╔╝██║██╔██╗██║█████╗░░╚█████╗░██╔████╔██║██║░░██║█████═╝░█████╗░░
██║╚████║██║██║░░██╗██╔═██╗░╚════╝░╚████╔╝░██║██║╚████║██╔══╝░░░╚═══██╗██║╚██╔╝██║██║░░██║██╔═██╗░██╔══╝░░
██║░╚███║██║╚█████╔╝██║░╚██╗░░░░░░░░╚██╔╝░░██║██║░╚███║███████╗██████╔╝██║░╚═╝░██║╚█████╔╝██║░╚██╗███████╗
╚═╝░░╚══╝╚═╝░╚════╝░╚═╝░░╚═╝░░░░░░░░░╚═╝░░░╚═╝╚═╝░░╚══╝╚══════╝╚═════╝░╚═╝░░░░░╚═╝░╚════╝░╚═╝░░╚═╝╚══════╝ 


██████╗░░█████╗░██╗░░░░░██╗░░░░░  ░██████╗░░█████╗░███╗░░░███╗███████╗
██╔══██╗██╔══██╗██║░░░░░██║░░░░░  ██╔════╝░██╔══██╗████╗░████║██╔════╝
██████╦╝███████║██║░░░░░██║░░░░░  ██║░░██╗░███████║██╔████╔██║█████╗░░
██╔══██╗██╔══██║██║░░░░░██║░░░░░  ██║░░╚██╗██╔══██║██║╚██╔╝██║██╔══╝░░
██████╦╝██║░░██║███████╗███████╗  ╚██████╔╝██║░░██║██║░╚═╝░██║███████╗
╚═════╝░╚═╝░░╚═╝╚══════╝╚══════╝  ░╚═════╝░╚═╝░░╚═╝╚═╝░░░░░╚═╝╚══════╝
*/

var starterScreen = document.getElementById('starter-screen');
var startButton = document.getElementById('start-button');
var gameContainer = document.getElementById('game-container');
var platform = document.getElementById('platform');
var ball = document.getElementById('ball');
var building = document.getElementById('building');
var squares = [];
var ballSpeedX = 2;
var ballSpeedY = -2;
var isGameStarted = false;
var isGameOver = false;

function startGame() {
  starterScreen.style.display = 'none';
  gameContainer.style.display = 'block';
  isGameStarted = true;
  ball.style.top = platform.offsetTop - ball.offsetHeight + 'px';
  ball.style.left = platform.offsetLeft + (platform.offsetWidth / 2) + 'px';
  animate();
}

function animate() {
  if (isGameStarted && !isGameOver) {
    movePlatform();
    moveBall();
    checkCollision();
    requestAnimationFrame(animate);
  }
}

function movePlatform() {
  document.addEventListener('mousemove', function(event) {
    var containerOffset = gameContainer.offsetLeft;
    var mouseX = event.clientX - containerOffset;
    platform.style.left = mouseX - platform.offsetWidth / 2 + 'px';
  });
}

function moveBall() {
  var ballX = ball.offsetLeft + ballSpeedX;
  var ballY = ball.offsetTop + ballSpeedY;
  var ballWidth = ball.offsetWidth;
  var ballHeight = ball.offsetHeight;

  if (ballX < 0 || ballX + ballWidth > gameContainer.offsetWidth) {
    ballSpeedX *= -1;
  }

  if (ballY < 0) {
    ballSpeedY *= -1;
  } else if (ballY + ballHeight > gameContainer.offsetHeight) {
    isGameOver = true;
    gameOver();
  }

  ball.style.left = ballX + 'px';
  ball.style.top = ballY + 'px';
}

function checkCollision() {
  if (
    (ball.offsetTop + ball.offsetHeight >= platform.offsetTop) &&
    (ball.offsetLeft + ball.offsetWidth >= platform.offsetLeft) &&
    (ball.offsetLeft <= platform.offsetLeft + platform.offsetWidth)
  ) {
    ballSpeedY *= -1;
  }

  squares.forEach(function(square, index) {
    if (
      (ball.offsetTop + ball.offsetHeight >= square.offsetTop) &&
      (ball.offsetLeft + ball.offsetWidth >= square.offsetLeft) &&
      (ball.offsetLeft <= square.offsetLeft + square.offsetWidth)
    ) {
      square.remove();
      squares.splice(index, 1);
      ballSpeedY *= -1;
    }
  });

  if (
    (ball.offsetTop <= building.offsetTop) ||
    (ball.offsetLeft <= building.offsetLeft) ||
    (ball.offsetLeft + ball.offsetWidth >= building.offsetLeft + building.offsetWidth)
  ) {
    ballSpeedX *= -1;
  }

  if (squares.length === 0) {
    isGameOver = true;
    gameOver();
  }
}

function createBuilding() {
  var rows = 28;
  var columns = 56;

  for (var i = 0; i < rows; i++) {
    for (var j = 0; j < columns; j++) {
      var square = document.createElement('div');
      square.className = 'square';
      square.style.top = i * 10 + 'px';
      square.style.left = j * 10 + 'px';
      building.appendChild(square);
      squares.push(square);
    }
  }
}

function gameOver() {
  alert('Game Over!');
  location.reload();
}

createBuilding();
startButton.addEventListener('click', startGame);
