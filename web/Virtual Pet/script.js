// === Pet State ===
// Object to track the pet's stats and whether it's alive
const pet = {
  hunger: 50,      // Hunger level (0-100)
  happiness: 50,   // Happiness level (0-100)
  energy: 50,      // Energy level (0-100)
  isAlive: true    // Is the pet still alive?
};

// === DOM Elements ===
const hungerBar = document.getElementById('hunger');           // Hunger progress bar
const happinessBar = document.getElementById('happiness');     // Happiness progress bar
const energyBar = document.getElementById('energy');           // Energy progress bar
const petImage = document.getElementById('pet-image');         // Pet image element
const petMessage = document.getElementById('pet-message');     // Message area for pet
const gameOverScreen = document.getElementById('game-over');   // Game over screen container
const restartBtn = document.getElementById('restart-btn');     // Restart button

// === Update Stats Display ===
// Updates the progress bars and checks for game over
function updateStats() {
  hungerBar.value = pet.hunger;
  happinessBar.value = pet.happiness;
  energyBar.value = pet.energy;
  
  // If any stat reaches 0 and pet is alive, trigger game over
  if ((pet.hunger <= 0 || pet.happiness <= 0 || pet.energy <= 0) && pet.isAlive) {
    gameOver();
  }
}

// === Game Over Function ===
// Shows game over screen and changes pet image
function gameOver() {
  pet.isAlive = false;
  petImage.src = "https://cdn-icons-png.flaticon.com/512/2038/2038850.png"; // Sad pet image
  petMessage.textContent = "";
  gameOverScreen.classList.remove('hidden'); // Show game over screen
}

// === Pet Actions ===

// Feed button: increases hunger, decreases energy
document.getElementById('feed-btn').addEventListener('click', () => {
  if (!pet.isAlive) return;
  pet.hunger = Math.min(100, pet.hunger + 15); // Cap at 100
  pet.energy -= 5;
  petMessage.textContent = "Yummy! Thanks for the food!";
  updateStats();
});

// Play button: increases happiness, decreases energy and hunger
document.getElementById('play-btn').addEventListener('click', () => {
  if (!pet.isAlive) return;
  pet.happiness = Math.min(100, pet.happiness + 15); // Cap at 100
  pet.energy -= 10;
  pet.hunger -= 5;
  petMessage.textContent = "Wheee! That was fun!";
  petImage.style.transform = "rotate(10deg)"; // Animate pet image
  setTimeout(() => petImage.style.transform = "rotate(0deg)", 200);
  updateStats();
});

// Sleep button: increases energy, decreases hunger
document.getElementById('sleep-btn').addEventListener('click', () => {
  if (!pet.isAlive) return;
  pet.energy = Math.min(100, pet.energy + 30); // Cap at 100
  pet.hunger -= 10;
  petMessage.textContent = "Zzzzz...";
  updateStats();
});

// === Restart Game ===
// Resets pet stats and UI to start a new game
restartBtn.addEventListener('click', () => {
  pet.hunger = 50;
  pet.happiness = 50;
  pet.energy = 50;
  pet.isAlive = true;
  petImage.src = "https://cdn-icons-png.flaticon.com/512/616/616408.png"; // Happy pet image
  petMessage.textContent = "Hello again! I'll be good this time!";
  gameOverScreen.classList.add('hidden'); // Hide game over screen
  updateStats();
});

// === Game Loop ===
// Decreases stats over time and triggers random pet messages
setInterval(() => {
  if (!pet.isAlive) return;
  
  pet.hunger -= 2;      // Hunger decreases over time
  pet.happiness -= 1;   // Happiness decreases over time
  pet.energy -= 1;      // Energy decreases over time
  
  // Occasionally show a random message from the pet
  if (Math.random() < 0.1) {
    petMessage.textContent = ["I'm bored!", "Play with me!", "I'm hungry!"][Math.floor(Math.random() * 3)];
  }
  
  updateStats();
}, 3000); // Every 3 seconds

// === Initial Setup ===
// Set initial stats and UI
updateStats();