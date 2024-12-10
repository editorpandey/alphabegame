const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const cardsContainer = document.getElementById("cards");
const feedbackElement = document.getElementById("feedback");
const questionElement = document.getElementById("question");

// Initialize the game
function initGame() {
  feedbackElement.textContent = ""; // Clear feedback
  generateCards();
  askQuestion();  // Ask a playful question
}

// Ask a playful question
function askQuestion() {
  const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
  questionElement.textContent = `Can you find the letter: ${randomLetter}? 🎉`;
  playVoiceQuestion(randomLetter);
}

// Generate alphabet cards
function generateCards() {
  cardsContainer.innerHTML = ""; // Clear previous cards

  // Shuffle and display cards
  const shuffledAlphabet = shuffle([...alphabet]);
  shuffledAlphabet.forEach((letter) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.textContent = letter;

    // Add click event to show feedback
    card.onclick = () => checkAnswer(letter);
    cardsContainer.appendChild(card);
  });
}

// Shuffle function
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Check the selected answer
function checkAnswer(selectedLetter) {
  const currentQuestion = questionElement.textContent.split(": ")[1].slice(0, 1);  // Extract the target letter

  if (selectedLetter === currentQuestion) {
    feedbackElement.textContent = `🎉 Hooray! You found the letter: ${selectedLetter}`;
    playVoice(selectedLetter, "correct");
  } else {
    feedbackElement.textContent = `❌ Oops! That's not the right letter. Try again! You selected: ${selectedLetter}`;
    playVoice(selectedLetter, "wrong");
  }
}

// Play the voice when clicking a letter
function playVoice(letter, result) {
  const msg = new SpeechSynthesisUtterance();
  msg.lang = 'en-US';
  
  if (result === "correct") {
    msg.text = `Great job! You selected the letter ${letter}`;
  } else {
    msg.text = `Oops! That was incorrect. Try again. You selected ${letter}`;
  }
  
  speechSynthesis.speak(msg);
}

// Play the voice question
function playVoiceQuestion(letter) {
  const questionVoice = new SpeechSynthesisUtterance();
  questionVoice.lang = 'en-US';
  questionVoice.text = `Can you find the letter ${letter}?`;
  
  speechSynthesis.speak(questionVoice);
}

// Start the game
initGame();
