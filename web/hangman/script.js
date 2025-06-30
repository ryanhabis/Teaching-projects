// Game state
const words = ["JAVASCRIPT", "HANGMAN", "DEVELOPER", "KEYBOARD", "FUNCTION"]; // List of possible words
let selectedWord = ""; // The word to guess
let guessedLetters = []; // Array of guessed letters
let wrongGuesses = 0; // Number of incorrect guesses
const maxWrongGuesses = 6; // Maximum allowed wrong guesses

// DOM elements
const wordDisplay = document.getElementById("word-display"); // Shows the word with underscores and letters
const hangmanDrawing = document.getElementById("hangman-drawing"); // Shows ASCII hangman drawing
const guessesLeftSpan = document.querySelector("#guesses-left span"); // Shows remaining guesses
const usedLettersSpan = document.querySelector("#used-letters span"); // Shows used letters
const messageDiv = document.getElementById("message"); // Shows win/lose message
const keyboardDiv = document.getElementById("keyboard"); // On-screen keyboard
const resetBtn = document.getElementById("reset-btn"); // New Game button

// Hangman drawings for each wrong guess (ASCII art)
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

// Initialize game state and UI for a new game
function initGame() {
  selectedWord = words[Math.floor(Math.random() * words.length)]; // Pick a random word
  guessedLetters = [];
  wrongGuesses = 0;
  messageDiv.textContent = "";
  messageDiv.className = "";
  guessesLeftSpan.textContent = maxWrongGuesses;
  usedLettersSpan.textContent = "";
  hangmanDrawing.textContent = hangmanDrawings[0];
  
  // Create the on-screen keyboard (A-Z)
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
  
  // Check if player won (no underscores left)
  if (!display.includes("_")) {
    messageDiv.textContent = "You won! 🎉";
    messageDiv.className = "correct";
    disableKeyboard();
  }
}

// Handle a letter guess from the player
function handleGuess(letter) {
  // Ignore if already guessed or game is over
  if (guessedLetters.includes(letter) || wrongGuesses >= maxWrongGuesses) return;
  
  guessedLetters.push(letter);
  usedLettersSpan.textContent = guessedLetters.join(", ");
  
  if (selectedWord.includes(letter)) {
    // Correct guess, update the word display
    updateWordDisplay();
  } else {
    // Wrong guess, update hangman and guesses left
    wrongGuesses++;
    guessesLeftSpan.textContent = maxWrongGuesses - wrongGuesses;
    hangmanDrawing.textContent = hangmanDrawings[wrongGuesses];
    
    // Check if player lost
    if (wrongGuesses >= maxWrongGuesses) {
      messageDiv.textContent = `Game Over! The word was: ${selectedWord}`;
      disableKeyboard();
    }
  }
  
  // Disable the guessed button and color it based on correctness
  const buttons = document.querySelectorAll(".letter-btn");
  buttons.forEach(btn => {
    if (btn.textContent === letter) {
      btn.disabled = true;
      btn.style.backgroundColor = selectedWord.includes(letter) ? "#a5d6a7" : "#ef9a9a";
    }
  });
}

// Disable all keyboard buttons (after win/lose)
function disableKeyboard() {
  const buttons = document.querySelectorAll(".letter-btn");
  buttons.forEach(btn => {
    btn.disabled = true;
  });
}

// Event listener for reset button to start a new game
resetBtn.addEventListener("click", initGame);

// Start the game on page load
initGame();