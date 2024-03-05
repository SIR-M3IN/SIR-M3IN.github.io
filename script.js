window.addEventListener('deviceorientation', handleOrientation);

const player = document.getElementById('player');
let currentPositionX = window.innerWidth / 2;

const ufoOptions = [
    'images/ufo-for-website_blue.svg',
    'images/ufo-for-website_green.svg',
    'images/ufo-for-website_pink.svg',
    'images/ufo-for-website_yellow.svg'
];
const randomUfo = ufoOptions[Math.floor(Math.random() * ufoOptions.length)];
const playerPicture = document.getElementById('player').querySelector('img');
playerPicture.src = randomUfo;

function handleOrientation(event) {
    // Gyroscope controls
    const beta = event.beta;
    const newPositionX = window.innerWidth / 2 + beta * 10;
    currentPositionX = Math.max(0, Math.min(newPositionX, window.innerWidth - player.clientWidth));
    
    player.style.left = currentPositionX + "px";
}

function createEnemy() {
    const existingEnemies = document.querySelectorAll('.enemy');
    existingEnemies.forEach((enemy) => {
        enemy.remove();
    });

    const randomAsteroid = 'images/asteroidcrop.svg';

    const enemy = document.createElement('div');
    enemy.className = 'enemy';
    enemy.style.left = `${Math.random() * (window.innerWidth - 150)}px`;

    const enemyImage = document.createElement('img');
    enemyImage.src = randomAsteroid;
    enemy.appendChild(enemyImage);

    document.body.appendChild(enemy);

    const enemyInterval = setInterval(() => {
        const enemyRect = enemy.getBoundingClientRect();
        if (enemyRect.top > window.innerHeight) {
            enemy.remove();
            clearInterval(enemyInterval);
        }
    }, 50);
    const playerUFO = document.getElementById('player').querySelector('img');
    playerUFO.src = randomUfo;
}




function checkCollision() {
    const playerRect = player.getBoundingClientRect();
    
    const enemies = document.querySelectorAll('.enemy');
    enemies.forEach((enemy) => {
        const enemyRect = enemy.getBoundingClientRect();

        const playerTop = playerRect.top + 15;
        const playerBottom = playerRect.bottom - 15;
        const playerLeft = playerRect.left + 15;
        const playerRight = playerRect.right - 15;

        if (
            playerTop < enemyRect.bottom &&
            playerBottom > enemyRect.top &&
            playerRight > enemyRect.left &&
            playerLeft < enemyRect.right
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
