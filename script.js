window.addEventListener('deviceorientation', handleOrientation, false);

var currentPositionX = 0;
var playerWidth = 50;
var playerHeight = 50;
var enemyspeed = 2;

function handleOrientation(event) {
    var beta = event.beta;
    var newPositionX = window.innerWidth / 2 + beta*10;

    if (newPositionX !== currentPositionX) {
        currentPositionX = newPositionX;

        var player = document.querySelector('.player');
        player.style.left = currentPositionX + "px";

        checkCollision(player);
    }
}

setInterval(function() {createMovingSquare();enemyspeed += 0.05;}, 3000);

function createMovingSquare() {
    var randomX = Math.floor(Math.random() * window.innerWidth);
    var newSquare = document.createElement('div');
    newSquare.className = 'enemy';
    newSquare.style.left = randomX + 'px';
    newSquare.style.top = '-100px';
    newSquare.style.display = 'block';
    document.body.appendChild(newSquare);
  

    moveDown(newSquare);
}


function moveDown(square) {
    var positionY = 0;

    function frame() {
        positionY += enemyspeed;
        square.style.top = positionY + 'px';
        checkCollision(square);
        if (positionY < window.innerHeight) {
            requestAnimationFrame(frame);
        } else {
            square.remove();
        }
    }

    requestAnimationFrame(frame);
}


function checkCollision(square) {
    var squareRect = square.getBoundingClientRect();
    var playerRect = {
        left: currentPositionX,
        top: window.innerHeight - playerHeight,
        right: currentPositionX + playerWidth,
        bottom: window.innerHeight
    };

    if (
        squareRect.left < playerRect.right &&
        squareRect.right > playerRect.left &&
        squareRect.top < playerRect.bottom &&
        squareRect.bottom > playerRect.top
    ) {
        window.location.href = 'startscreen.html';
    }
}
