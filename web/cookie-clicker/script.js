// Game State
let cookies = 0;
let cookiesPerSecond = 0;

// DOM Elements
const cookieBtn = document.getElementById('cookie-btn');
const cookiesDisplay = document.getElementById('cookies');
const cpsDisplay = document.getElementById('cps');
const upgrades = document.querySelectorAll('.upgrade'); // Select all upgrade buttons

// Click the cookie
cookieBtn.addEventListener('click', () => {
  cookies++; // Increase cookies by 1 each click
  updateDisplay(); // Update the UI with new values
});

// Buy upgrades
upgrades.forEach(upgrade => {
  upgrade.addEventListener('click', () => {
    const cost = parseInt(upgrade.dataset.cost); // Get the cost from data attribute
    const cps = parseInt(upgrade.dataset.cps);   // Get the CPS increase from data attribute
    
    if (cookies >= cost) { // Only allow purchase if enough cookies
      cookies -= cost; // Deduct the cost
      cookiesPerSecond += cps; // Increase cookies per second
      upgrade.disabled = true; // Disable the upgrade button after purchase
      upgrade.style.backgroundColor = '#aaa'; // Change button color to show it's bought
      updateDisplay(); // Update the UI
    }
  });
});

// Update display
function updateDisplay() {
  cookiesDisplay.textContent = cookies; // Show current cookie count
  cpsDisplay.textContent = cookiesPerSecond; // Show current cookies per second
}

// Passive income (every second)
setInterval(() => {
  cookies += cookiesPerSecond; // Add cookies based on CPS every second
  updateDisplay(); // Update the UI
}, 1000);