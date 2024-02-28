window.addEventListener('deviceorientation', handleOrientation);

const player = document.getElementById('player');
let currentPositionX = window.innerWidth / 2;

function handleOrientation(event) {
    // Gyroscope controls
    const beta = event.beta;
    const newPositionX = window.innerWidth / 2 + beta * 10;

    // Ensure the new position is within the window boundaries
    currentPositionX = Math.max(0, Math.min(newPositionX, window.innerWidth - player.clientWidth));
    
    player.style.left = currentPositionX + "px";
}

function createEnemy() {
    const enemy = document.querySelector('.enemy');
    enemy.style.left = `${Math.random() * (window.innerWidth - 30)}px`; // Zufällige horizontale Position

    const enemyInterval = setInterval(() => {
        const enemyRect = enemy.getBoundingClientRect();
        if (enemyRect.top > window.innerHeight) {
            enemy.remove();
            clearInterval(enemyInterval);
        }
    }, 100);
}

function checkCollision(enemy) {
    const playerRect = player.getBoundingClientRect();
    const enemyRect = enemy.getBoundingClientRect();

    if (
        playerRect.top < enemyRect.bottom &&
        playerRect.right > enemyRect.left &&
        playerRect.left < enemyRect.right
    ) {
        gameOver();
    }
}

function gameOver() {
    window.location.href = 'startscreen.html';
}

setInterval(createEnemy, 2000);
setInterval(() => {
    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach((enemy) => {
        checkCollision(enemy);
    });
}, 100);
