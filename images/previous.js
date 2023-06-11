/*
HTML

<!DOCTYPE html>
<html>
<head>
  <title>Stylish Bat and Ball Game</title>
  <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
  <div id="starter-screen">
    <h1>Welcome to the Bat and Ball Game</h1>
    <button id="start-button">Start Game</button>
  </div>
  <div id="game-container">
    <div id="bat"></div>
    <div id="ball"></div>
  </div>
  <script src="game.js"></script>
</body>
</html>


CSS

/* Starter screen styles */
#starter-screen {
  background-color: #282828;
  color: #fff;
  text-align: center;
  padding: 100px;
}

/* Game container styles */
#game-container {
  width: 600px;
  height: 400px;
  background-color: #282828;
  margin: 0 auto;
  position: relative;
  overflow: hidden;
}

/* Bat styles */
#bat {
  width: 100px;
  height: 20px;
  background-color: #fff;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
}

/* Ball styles */
#ball {
  width: 20px;
  height: 20px;
  background-color: #fff;
  border-radius: 50%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

/* Hide game container by default */
#game-container {
  display: none;
}


JS

// JavaScript code for game logic
var gameContainer = document.getElementById('game-container');
var startButton = document.getElementById('start-button');
var bat = document.getElementById('bat');
var ball = document.getElementById('ball');
var ballSpeedX = 2;
var ballSpeedY = -2;
var isGameStarted = false;

function startGame() {
  document.getElementById('starter-screen').style.display = 'none';
  gameContainer.style.display = 'block';
  isGameStarted = true;
  animate();
}

function animate() {
  if (isGameStarted) {
    // Update ball position
    var ballX = ball.offsetLeft + ballSpeedX;
    var ballY = ball.offsetTop + ballSpeedY;
    var ballWidth = ball.offsetWidth;
    var ballHeight = ball.offsetHeight;

    // Check collision with bat
    if (
      (ballY + ballHeight > bat.offsetTop) &&
      (ballX + ballWidth > bat.offsetLeft) &&
      (ballX < bat.offsetLeft + bat.offsetWidth)
    ) {
      ballSpeedY *= -1;
    }

    // Check collision with walls
    if (ballX < 0 || ballX + ballWidth > gameContainer.offsetWidth) {
      ballSpeedX *= -1;
    }

    if (ballY < 0 || ballY + ballHeight > gameContainer.offsetHeight) {
      ballSpeedY *= -1;
    }

    // Move ball
    ball.style.left = ballX + 'px';
    ball.style.top = ballY + 'px';

    requestAnimationFrame(animate);
  }
}

// Move bat with mouse
gameContainer.addEventListener('mousemove', function(event) {
  var containerLeft = gameContainer.offsetLeft;
  var mouseX = event.clientX - containerLeft;
  bat.style.left = mouseX + 'px';
});

startButton.addEventListener('click', startGame);



*/
