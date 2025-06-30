// Game State
let cookies = 0;
let cookiesPerSecond = 0;

// DOM Elements
const cookieBtn = document.getElementById('cookie-btn');
const cookiesDisplay = document.getElementById('cookies');
const cpsDisplay = document.getElementById('cps');
const upgrades = document.querySelectorAll('.upgrade');

// Click the cookie
cookieBtn.addEventListener('click', () => {
  cookies++;
  updateDisplay();
});

// Buy upgrades
upgrades.forEach(upgrade => {
  upgrade.addEventListener('click', () => {
    const cost = parseInt(upgrade.dataset.cost);
    const cps = parseInt(upgrade.dataset.cps);
    
    if (cookies >= cost) {
      cookies -= cost;
      cookiesPerSecond += cps;
      upgrade.disabled = true;
      upgrade.style.backgroundColor = '#aaa';
      updateDisplay();
    }
  });
});

// Update display
function updateDisplay() {
  cookiesDisplay.textContent = cookies;
  cpsDisplay.textContent = cookiesPerSecond;
}

// Passive income (every second)
setInterval(() => {
  cookies += cookiesPerSecond;
  updateDisplay();
}, 1000);