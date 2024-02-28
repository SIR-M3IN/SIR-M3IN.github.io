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
    const existingEnemies = document.querySelectorAll('.enemy');
    existingEnemies.forEach((enemy) => {
        enemy.remove();
    });

    const enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.style.left = `${Math.random() * (window.innerWidth - 30)}px`;
    document.body.appendChild(enemy);

    const enemyInterval = setInterval(() => {
        const enemyRect = enemy.getBoundingClientRect();
        if (enemyRect.top > window.innerHeight) {
            enemy.remove();
            clearInterval(enemyInterval);
        }
    }, 100);
}


function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    
    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach((enemy) => {
        const enemyRect = enemy.getBoundingClientRect();

        if (
            playerRect.top < enemyRect.bottom &&
            playerRect.bottom > enemyRect.top &&
            playerRect.right > enemyRect.left &&
            playerRect.left < enemyRect.right
        ) {
            gameOver();
        }
    });
}


function gameOver() {
    window.location.href = 'index.html';
}

setInterval(createEnemy, 2000);
setInterval(() => {
    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach((enemy) => {
        checkCollision(enemy);
    });
}, 100);
