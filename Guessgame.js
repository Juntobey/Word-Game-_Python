// Initialize DOM Elements
const wordDisplay = document.getElementById("word-display");
const message = document.getElementById("message");
const guessInput = document.getElementById("guess-input");
const submitBtn = document.getElementById("submit-btn");
const turnsLeftDisplay = document.getElementById("turns-left");
const guessedLettersDisplay = document.getElementById("guessed-letters");
const result = document.getElementById("result");

// Game Data
const wordList = [
  "apple", "banana", "cherry", "date", "elderberry", "fig", "grape", 
  "honeydew", "kiwi", "lemon", "mango", "nectarine", "orange", "pear", 
  "plum", "quince", "raspberry", "strawberry", "tangerine", "watermelon"
];

class HangmanGame {
  constructor() {
    this.chosenWord = this.selectRandomWord();
    this.hiddenWord = Array(this.chosenWord.length).fill("_");
    this.guessedLetters = [];
    this.turnsLeft = 10;

    this.initializeEventListeners();
    this.updateDisplay();
  }

  selectRandomWord() {
    return wordList[Math.floor(Math.random() * wordList.length)];
  }

  initializeEventListeners() {
    submitBtn.addEventListener("click", () => this.checkGuess());
    guessInput.addEventListener("keyup", (event) => {
      if (event.key === "Enter") {
        this.checkGuess();
      }
    });
  }

  updateDisplay() {
    // Update word display
    wordDisplay.textContent = this.hiddenWord.join(" ");
    
    // Update turns left
    turnsLeftDisplay.textContent = this.turnsLeft;
    
    // Update guessed letters
    guessedLettersDisplay.textContent = this.guessedLetters.join(", ");
  }

  checkGuess() {
    const guess = guessInput.value.toLowerCase();
    guessInput.value = "";
    message.textContent = "";

    // Validate Input
    if (!guess || guess.length !== 1 || !/^[a-z]$/.test(guess)) {
      message.textContent = "Please enter a single letter.";
      return;
    }

    // Check if already guessed
    if (this.guessedLetters.includes(guess)) {
      message.textContent = "You already guessed that letter!";
      return;
    }

    // Add to guessed letters
    this.guessedLetters.push(guess);

    // Check if guess is correct
    if (this.chosenWord.includes(guess)) {
      // Reveal correct letters
      this.chosenWord.split("").forEach((char, index) => {
        if (char === guess) {
          this.hiddenWord[index] = char;
        }
      });
    } else {
      // Incorrect guess
      this.turnsLeft--;
    }

    // Update display
    this.updateDisplay();

    // Check for Win/Loss
    this.checkGameStatus();
  }

  checkGameStatus() {
    if (!this.hiddenWord.includes("_")) {
      this.endGame(true);
    } else if (this.turnsLeft === 0) {
      this.endGame(false);
    }
  }

  endGame(isWin) {
    if (isWin) {
      result.textContent = `🎉 You Win! The word is: ${this.chosenWord}`;
      this.createFloatingEmojis();
    } else {
      result.textContent = `😢 You Lose! The word was: ${this.chosenWord}`;
    }

    // Disable input
    guessInput.disabled = true;
    submitBtn.disabled = true;
  }

  createFloatingEmojis() {
    const container = document.body;
    const emojis = ["🎉", "🌟", "🎊", "✨"];

    for (let i = 0; i < 50; i++) {
      const emoji = document.createElement("div");
      emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
      emoji.className = "floating-emoji";
      emoji.style.left = `${Math.random() * 100}vw`;
      emoji.style.top = `${Math.random() * 100}vh`;
      emoji.style.animationDuration = `${Math.random() * 2 + 3}s`;
      container.appendChild(emoji);

      // Remove the emoji after the animation ends
      emoji.addEventListener("animationend", () => {
        emoji.remove();
      });
    }
  }
}

// Start the game
const game = new HangmanGame();