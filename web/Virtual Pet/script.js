// Pet state
const pet = {
  hunger: 50,
  happiness: 50,
  energy: 50,
  isAlive: true
};

// DOM elements
const hungerBar = document.getElementById('hunger');
const happinessBar = document.getElementById('happiness');
const energyBar = document.getElementById('energy');
const petImage = document.getElementById('pet-image');
const petMessage = document.getElementById('pet-message');
const gameOverScreen = document.getElementById('game-over');
const restartBtn = document.getElementById('restart-btn');

// Update stats display
function updateStats() {
  hungerBar.value = pet.hunger;
  happinessBar.value = pet.happiness;
  energyBar.value = pet.energy;
  
  // Check for game over
  if ((pet.hunger <= 0 || pet.happiness <= 0 || pet.energy <= 0) && pet.isAlive) {
    gameOver();
  }
}

// Game over function
function gameOver() {
  pet.isAlive = false;
  petImage.src = "https://cdn-icons-png.flaticon.com/512/2038/2038850.png";
  petMessage.textContent = "";
  gameOverScreen.classList.remove('hidden');
}

// Pet actions
document.getElementById('feed-btn').addEventListener('click', () => {
  if (!pet.isAlive) return;
  pet.hunger = Math.min(100, pet.hunger + 15);
  pet.energy -= 5;
  petMessage.textContent = "Yummy! Thanks for the food!";
  updateStats();
});

document.getElementById('play-btn').addEventListener('click', () => {
  if (!pet.isAlive) return;
  pet.happiness = Math.min(100, pet.happiness + 15);
  pet.energy -= 10;
  pet.hunger -= 5;
  petMessage.textContent = "Wheee! That was fun!";
  petImage.style.transform = "rotate(10deg)";
  setTimeout(() => petImage.style.transform = "rotate(0deg)", 200);
  updateStats();
});

document.getElementById('sleep-btn').addEventListener('click', () => {
  if (!pet.isAlive) return;
  pet.energy = Math.min(100, pet.energy + 30);
  pet.hunger -= 10;
  petMessage.textContent = "Zzzzz...";
  updateStats();
});

// Restart game
restartBtn.addEventListener('click', () => {
  pet.hunger = 50;
  pet.happiness = 50;
  pet.energy = 50;
  pet.isAlive = true;
  petImage.src = "https://cdn-icons-png.flaticon.com/512/616/616408.png";
  petMessage.textContent = "Hello again! I'll be good this time!";
  gameOverScreen.classList.add('hidden');
  updateStats();
});

// Game loop - stats decrease over time
setInterval(() => {
  if (!pet.isAlive) return;
  
  pet.hunger -= 2;
  pet.happiness -= 1;
  pet.energy -= 1;
  
  // Random events
  if (Math.random() < 0.1) {
    petMessage.textContent = ["I'm bored!", "Play with me!", "I'm hungry!"][Math.floor(Math.random() * 3)];
  }
  
  updateStats();
}, 3000);

// Initial setup
updateStats();