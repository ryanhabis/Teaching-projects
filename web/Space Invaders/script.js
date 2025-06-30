// === DOM Elements and Game Setup ===

// Get references to canvas and UI elements
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreElement = document.getElementById('score');
const livesElement = document.getElementById('lives');
const startBtn = document.getElementById('start-btn');

// === Game State Variables ===
let score = 0;           // Player's score
let lives = 3;           // Player's remaining lives
let gameRunning = false; // Is the game currently running?
let animationId;         // Stores the animation frame ID for the game loop

// === Player Object ===
const player = {
  x: canvas.width / 2 - 25, // Player's starting X position
  y: canvas.height - 50,    // Player's starting Y position
  width: 50,                // Player width
  height: 30,               // Player height
  speed: 5,                 // Player movement speed
  color: '#00ff00'          // Player color (green)
};

// === Bullets ===
const bullets = [];         // Array to hold active bullets
const bulletSpeed = 7;      // Speed of bullets
const bulletSize = 5;       // Size of each bullet

// === Aliens ===
const aliens = [];          // Array to hold alien objects
const alienWidth = 40;      // Width of each alien
const alienHeight = 30;     // Height of each alien
let alienDirection = 1;     // 1 for right, -1 for left
let alienSpeed = 1;         // Speed of alien movement
let alienDropDistance = 20; // How far aliens drop when hitting edge

// === Initialize Game State ===
function initGame() {
  score = 0;
  lives = 3;
  scoreElement.textContent = score;
  livesElement.textContent = lives;
  
  // Create aliens in a grid (4 rows x 8 columns)
  aliens.length = 0;
  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 8; col++) {
      aliens.push({
        x: col * (alienWidth + 20) + 50,
        y: row * (alienHeight + 20) + 50,
        width: alienWidth,
        height: alienHeight,
        color: row % 2 === 0 ? '#ff00ff' : '#ffff00' // Alternate colors
      });
    }
  }
}

// === Drawing Functions ===

// Draw the player spaceship
function drawPlayer() {
  ctx.fillStyle = player.color;
  ctx.fillRect(player.x, player.y, player.width, player.height);
  
  // Draw player "cockpit"
  ctx.fillStyle = '#000';
  ctx.fillRect(player.x + 10, player.y - 5, 30, 5);
}

// Draw all active bullets
function drawBullets() {
  ctx.fillStyle = '#ff0000';
  bullets.forEach(bullet => {
    ctx.fillRect(bullet.x, bullet.y, bulletSize, bulletSize);
  });
}

// Draw all aliens
function drawAliens() {
  aliens.forEach(alien => {
    ctx.fillStyle = alien.color;
    ctx.fillRect(alien.x, alien.y, alien.width, alien.height);
  });
}

// === Player Movement ===

// Move the player left or right, ensuring they stay within canvas bounds
function movePlayer(direction) {
  if (direction === 'left' && player.x > 0) {
    player.x -= player.speed;
  } else if (direction === 'right' && player.x < canvas.width - player.width) {
    player.x += player.speed;
  }
}

// === Bullet Logic ===

// Fire a new bullet from the player's current position
function fireBullet() {
  bullets.push({
    x: player.x + player.width / 2 - bulletSize / 2,
    y: player.y,
    width: bulletSize,
    height: bulletSize
  });
}

// Update bullet positions and handle collisions with aliens
function updateBullets() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    bullets[i].y -= bulletSpeed;
    
    // Remove bullets that go off screen
    if (bullets[i].y < 0) {
      bullets.splice(i, 1);
      continue;
    }
    
    // Check for collisions with aliens
    for (let j = aliens.length - 1; j >= 0; j--) {
      if (checkCollision(bullets[i], aliens[j])) {
        bullets.splice(i, 1); // Remove bullet
        aliens.splice(j, 1);  // Remove alien
        score += 10;          // Increase score
        scoreElement.textContent = score;
        break;
      }
    }
  }
}

// === Alien Logic ===

// Move aliens horizontally, drop down if they hit the edge, and check for game over
function moveAliens() {
  let moveDown = false;
  let hitEdge = false;
  
  // Check if any alien has hit the edge of the canvas
  aliens.forEach(alien => {
    if ((alien.x <= 0 && alienDirection === -1) || 
        (alien.x + alien.width >= canvas.width && alienDirection === 1)) {
      hitEdge = true;
    }
    
    // If any alien reaches the player's level, game over
    if (alien.y + alien.height >= player.y) {
      gameOver();
    }
  });
  
  if (hitEdge) {
    alienDirection *= -1; // Change direction
    moveDown = true;      // Flag to move aliens down
  }
  
  // Move aliens horizontally and drop down if needed
  aliens.forEach(alien => {
    alien.x += alienSpeed * alienDirection;
    if (moveDown) {
      alien.y += alienDropDistance;
    }
  });
}

// === Collision Detection ===

// Check if two objects (rectangles) overlap
function checkCollision(obj1, obj2) {
  return obj1.x < obj2.x + obj2.width &&
         obj1.x + obj1.width > obj2.x &&
         obj1.y < obj2.y + obj2.height &&
         obj1.y + obj1.height > obj2.y;
}

// === Game Over Logic ===

// Display game over screen and stop the game loop
function gameOver() {
  gameRunning = false;
  cancelAnimationFrame(animationId);
  
  // Draw semi-transparent overlay
  ctx.fillStyle = 'rgba(0, 0, 0, 0.75)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  // Draw "GAME OVER" text and final score
  ctx.fillStyle = '#ff0000';
  ctx.font = '36px "Press Start 2P"';
  ctx.textAlign = 'center';
  ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
  ctx.font = '18px "Press Start 2P"';
  ctx.fillText(`Final Score: ${score}`, canvas.width / 2, canvas.height / 2 + 40);
  
  startBtn.style.display = 'block'; // Show the start button to play again
}

// === Main Game Loop ===

// The main animation loop: updates and draws all game elements
function gameLoop() {
  if (!gameRunning) return;
  
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  // Update game elements
  updateBullets();
  moveAliens();
  
  // Draw game elements
  drawPlayer();
  drawBullets();
  drawAliens();
  
  // Check win condition: all aliens destroyed
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
  
  // Request the next animation frame
  animationId = requestAnimationFrame(gameLoop);
}

// === Keyboard Controls ===

// Object to track which keys are pressed
const keys = {
  ArrowLeft: false,
  ArrowRight: false,
  space: false
};

// Listen for keydown events to move player or fire bullets
window.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowLeft') keys.ArrowLeft = true;
  if (e.code === 'ArrowRight') keys.ArrowRight = true;
  if (e.code === 'Space' && !keys.space) {
    keys.space = true;
    if (gameRunning) fireBullet();
  }
});

// Listen for keyup events to stop player movement or firing
window.addEventListener('keyup', (e) => {
  if (e.code === 'ArrowLeft') keys.ArrowLeft = false;
  if (e.code === 'ArrowRight') keys.ArrowRight = false;
  if (e.code === 'Space') keys.space = false;
});

// Handle player movement based on pressed keys
function handlePlayerMovement() {
  if (keys.ArrowLeft) movePlayer('left');
  if (keys.ArrowRight) movePlayer('right');
}

// === Game Start and Loop Control ===

// Start game when the start button is clicked
startBtn.addEventListener('click', () => {
  initGame(); // Reset game state
  gameRunning = true; // Set game as running
  startBtn.style.display = 'none'; // Hide the start button
  gameLoop(); // Begin the main game loop
});

// Movement interval for smooth player movement (runs every ~16ms)
setInterval(() => {
  if (gameRunning) handlePlayerMovement();
}, 16);

// Initialize game state and draw initial screen (but don't start)
initGame();