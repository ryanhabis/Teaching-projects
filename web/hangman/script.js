// Game state
const words = ["JAVASCRIPT", "HANGMAN", "DEVELOPER", "KEYBOARD", "FUNCTION"];
let selectedWord = "";
let guessedLetters = [];
let wrongGuesses = 0;
const maxWrongGuesses = 6;

// DOM elements
const wordDisplay = document.getElementById("word-display");
const hangmanDrawing = document.getElementById("hangman-drawing");
const guessesLeftSpan = document.querySelector("#guesses-left span");
const usedLettersSpan = document.querySelector("#used-letters span");
const messageDiv = document.getElementById("message");
const keyboardDiv = document.getElementById("keyboard");
const resetBtn = document.getElementById("reset-btn");

// Hangman drawings for each wrong guess
const hangmanDrawings = [
  `  
  +---+
  |   |
      |
      |
      |
      |
=========`,
  `  
  +---+
  |   |
  O   |
      |
      |
      |
=========`,
  `  
  +---+
  |   |
  O   |
  |   |
      |
      |
=========`,
  `  
  +---+
  |   |
  O   |
 /|   |
      |
      |
=========`,
  `  
  +---+
  |   |
  O   |
 /|\\  |
      |
      |
=========`,
  `  
  +---+
  |   |
  O   |
 /|\\  |
 /    |
      |
=========`,
  `  
  +---+
  |   |
  O   |
 /|\\  |
 / \\  |
      |
=========`
];

// Initialize game
function initGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)];
  guessedLetters = [];
  wrongGuesses = 0;
  messageDiv.textContent = "";
  messageDiv.className = "";
  guessesLeftSpan.textContent = maxWrongGuesses;
  usedLettersSpan.textContent = "";
  hangmanDrawing.textContent = hangmanDrawings[0];
  
  // Create keyboard
  keyboardDiv.innerHTML = "";
  for (let i = 65; i <= 90; i++) {
    const letter = String.fromCharCode(i);
    const button = document.createElement("button");
    button.className = "letter-btn";
    button.textContent = letter;
    button.addEventListener("click", () => handleGuess(letter));
    keyboardDiv.appendChild(button);
  }
  
  updateWordDisplay();
}

// Update the word display with underscores and guessed letters
function updateWordDisplay() {
  const display = selectedWord
    .split("")
    .map(letter => guessedLetters.includes(letter) ? letter : "_")
    .join(" ");
  
  wordDisplay.textContent = display;
  
  // Check if player won
  if (!display.includes("_")) {
    messageDiv.textContent = "You won! 🎉";
    messageDiv.className = "correct";
    disableKeyboard();
  }
}

// Handle a letter guess
function handleGuess(letter) {
  if (guessedLetters.includes(letter) || wrongGuesses >= maxWrongGuesses) return;
  
  guessedLetters.push(letter);
  usedLettersSpan.textContent = guessedLetters.join(", ");
  
  if (selectedWord.includes(letter)) {
    updateWordDisplay();
  } else {
    wrongGuesses++;
    guessesLeftSpan.textContent = maxWrongGuesses - wrongGuesses;
    hangmanDrawing.textContent = hangmanDrawings[wrongGuesses];
    
    // Check if player lost
    if (wrongGuesses >= maxWrongGuesses) {
      messageDiv.textContent = `Game Over! The word was: ${selectedWord}`;
      disableKeyboard();
    }
  }
  
  // Disable the guessed button
  const buttons = document.querySelectorAll(".letter-btn");
  buttons.forEach(btn => {
    if (btn.textContent === letter) {
      btn.disabled = true;
      btn.style.backgroundColor = selectedWord.includes(letter) ? "#a5d6a7" : "#ef9a9a";
    }
  });
}

// Disable all keyboard buttons
function disableKeyboard() {
  const buttons = document.querySelectorAll(".letter-btn");
  buttons.forEach(btn => {
    btn.disabled = true;
  });
}

// Event listener for reset button
resetBtn.addEventListener("click", initGame);

// Start the game
initGame();