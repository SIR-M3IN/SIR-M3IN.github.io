window.addEventListener('deviceorientation', handleOrientation);

const player = document.getElementById('player');
let playerX = 50; // Initial position

function handleOrientation(event) {
    // Gyroscope controls
    const tilt = event.gamma; // Get the gamma value for left and right movement
    playerX += tilt / 5; // Adjust the player position based on the tilt
    player.style.left = `${playerX}%`;

    // Ensure the player stays within the window boundaries
    if (playerX < 0) {
        playerX = 0;
    } else if (playerX > 100) {
        playerX = 100;
    }
}

function createEnemy() {
    const enemy = document.querySelector('.enemy');
    enemy.style.left = `${Math.random() * 100}%`; // Zufällige horizontale Position

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
//window.location.href = 'startscreen.html';