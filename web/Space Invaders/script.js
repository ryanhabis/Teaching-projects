// Game elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const startBtn = document.getElementById('start-btn');

// Game state
let score = 0;
let lives = 3;
let gameRunning = false;
let animationId;

// Player
const player = {
  x: canvas.width / 2 - 25,
  y: canvas.height - 50,
  width: 50,
  height: 30,
  speed: 5,
  color: '#00ff00'
};

// Bullets
const bullets = [];
const bulletSpeed = 7;
const bulletSize = 5;

// Aliens
const aliens = [];
const alienWidth = 40;
const alienHeight = 30;
let alienDirection = 1;
let alienSpeed = 1;
let alienDropDistance = 20;

// Initialize game
function initGame() {
  score = 0;
  lives = 3;
  scoreElement.textContent = score;
  livesElement.textContent = lives;
  
  // Create aliens
  aliens.length = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 8; col++) {
      aliens.push({
        x: col * (alienWidth + 20) + 50,
        y: row * (alienHeight + 20) + 50,
        width: alienWidth,
        height: alienHeight,
        color: row % 2 === 0 ? '#ff00ff' : '#ffff00'
      });
    }
  }
}

// Draw player
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
  
  // Draw player "cockpit"
  ctx.fillStyle = '#000';
  ctx.fillRect(player.x + 10, player.y - 5, 30, 5);
}

// Draw bullets
function drawBullets() {
  ctx.fillStyle = '#ff0000';
  bullets.forEach(bullet => {
    ctx.fillRect(bullet.x, bullet.y, bulletSize, bulletSize);
  });
}

// Draw aliens
function drawAliens() {
  aliens.forEach(alien => {
    ctx.fillStyle = alien.color;
    ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
  });
}

// Move player
function movePlayer(direction) {
  if (direction === 'left' && player.x > 0) {
    player.x -= player.speed;
  } else if (direction === 'right' && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }
}

// Fire bullet
function fireBullet() {
  bullets.push({
    x: player.x + player.width / 2 - bulletSize / 2,
    y: player.y,
    width: bulletSize,
    height: bulletSize
  });
}

// Update bullets
function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= bulletSpeed;
    
    // Remove bullets that go off screen
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
      continue;
    }
    
    // Check for alien hits
    for (let j = aliens.length - 1; j >= 0; j--) {
      if (checkCollision(bullets[i], aliens[j])) {
        bullets.splice(i, 1);
        aliens.splice(j, 1);
        score += 10;
        scoreElement.textContent = score;
        break;
      }
    }
  }
}

// Move aliens
function moveAliens() {
  let moveDown = false;
  let hitEdge = false;
  
  // Check if any alien has hit the edge
  aliens.forEach(alien => {
    if ((alien.x <= 0 && alienDirection === -1) || 
        (alien.x + alien.width >= canvas.width && alienDirection === 1)) {
      hitEdge = true;
    }
    
    // Check if aliens reached bottom
    if (alien.y + alien.height >= player.y) {
      gameOver();
    }
  });
  
  if (hitEdge) {
    alienDirection *= -1;
    moveDown = true;
  }
  
  // Move aliens
  aliens.forEach(alien => {
    alien.x += alienSpeed * alienDirection;
    if (moveDown) {
      alien.y += alienDropDistance;
    }
  });
}

// Check collision between two objects
function checkCollision(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

// Game over
function gameOver() {
  gameRunning = false;
  cancelAnimationFrame(animationId);
  
  ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  ctx.fillStyle = '#ff0000';
  ctx.font = '36px "Press Start 2P"';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
  ctx.font = '18px "Press Start 2P"';
  ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
  
  startBtn.style.display = 'block';
}

// Game loop
function gameLoop() {
  if (!gameRunning) return;
  
  // Clear canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update game elements
  updateBullets();
  moveAliens();
  
  // Draw game elements
  drawPlayer();
  drawBullets();
  drawAliens();
  
  // Check win condition
  if (aliens.length === 0) {
    ctx.fillStyle = '#00ff00';
    ctx.font = '36px "Press Start 2P"';
    ctx.textAlign = 'center';
    ctx.fillText('YOU WIN!', canvas.width / 2, canvas.height / 2);
    gameRunning = false;
    cancelAnimationFrame(animationId);
    startBtn.style.display = 'block';
    return;
  }
  
  animationId = requestAnimationFrame(gameLoop);
}

// Keyboard controls
const keys = {
  ArrowLeft: false,
  ArrowRight: false,
  space: false
};

window.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') keys.ArrowLeft = true;
  if (e.code === 'ArrowRight') keys.ArrowRight = true;
  if (e.code === 'Space' && !keys.space) {
    keys.space = true;
    if (gameRunning) fireBullet();
  }
});

window.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowLeft') keys.ArrowLeft = false;
  if (e.code === 'ArrowRight') keys.ArrowRight = false;
  if (e.code === 'Space') keys.space = false;
});

// Handle player movement
function handlePlayerMovement() {
  if (keys.ArrowLeft) movePlayer('left');
  if (keys.ArrowRight) movePlayer('right');
}

// Start game
startBtn.addEventListener('click', () => {
  initGame();
  gameRunning = true;
  startBtn.style.display = 'none';
  gameLoop();
});

// Movement interval
setInterval(() => {
  if (gameRunning) handlePlayerMovement();
}, 16);

// Initialize (but don't start)
initGame();