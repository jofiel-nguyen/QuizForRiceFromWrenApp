const questions = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "Rome", "Berlin", "Madrid"],
    answer: "Paris"
  },
  {
    question: "What is the largest ocean in the world?",
    options: ["Atlantic", "Pacific", "Indian", "Arctic"],
    answer: "Pacific"
  },
  {
    question: "What is the currency of Japan?",
    options: ["Yen", "Dollar", "Euro", "Pound"],
    answer: "Yen"
  }
];

const startBtn = document.getElementById("start-btn");
const timerEl = document.getElementById("timer");
const questionEl = document.getElementById("question");
const answerOptionsEl = document.getElementById("answer-options");
const scoresEl = document.getElementById("scores");

let currentQuestionIndex;
let timeLeft;

startBtn.addEventListener("click", startQuiz);

function startQuiz() {
  currentQuestionIndex = 0;
  timeLeft = 75;
  startTimer();
  showQuestion();
  startBtn.style.display = "none";
}

function startTimer() {
  const intervalId = setInterval(() => {
    timeLeft--;
    if (timeLeft < 0) {
      timeLeft = 0;
    }
    timerEl.textContent = `Time left: ${timeLeft}s`;

    if (timeLeft <= 0 || currentQuestionIndex === questions.length) {
      clearInterval(intervalId);
      endQuiz();
    }
  }, 1000);
}
function showQuestion() {
  const { question, options } = questions[currentQuestionIndex];
  questionEl.textContent = question;
  
  const playMoreButton = answerOptionsEl.querySelector(".play-more-button");
  const playMoreMessage = answerOptionsEl.querySelector(".play-more-message");
  if (playMoreButton) {
    answerOptionsEl.removeChild(playMoreButton);
  }
  if (playMoreMessage) {
    answerOptionsEl.removeChild(playMoreMessage);
  }

  options.forEach((option) => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.textContent = option;
    li.appendChild(button);
    answerOptionsEl.appendChild(li);

    button.addEventListener("click", () => {
      if (option === questions[currentQuestionIndex].answer) {
        currentQuestionIndex++;
        answerOptionsEl.innerHTML = "";
        showQuestion();
        const feedback = document.createElement("p");
        feedback.textContent = "Correct!";
        feedback.classList.add("correct-feedback");
        answerOptionsEl.appendChild(feedback);
        setTimeout(() => {
          answerOptionsEl.removeChild(feedback);
        }, 1000); 
        playMoreButton.style.display = "none";
      } else {
        timeLeft -= 10;
        const feedback = document.createElement("p");
        feedback.textContent = "Wrong!";
        feedback.classList.add("wrong-feedback");
        answerOptionsEl.appendChild(feedback);
        setTimeout(() => {
          answerOptionsEl.removeChild(feedback);
        }, 1000); 
      }
    });
  });
}



function endQuiz() {
  questionEl.textContent = "Quiz is over!";
  answerOptionsEl.innerHTML = "";

  const initials = prompt("Enter your initials:");
  const score = timeLeft;

  localStorage.setItem(initials, score);

  showScores();

  const playMoreButton = document.createElement("button");
  playMoreButton.textContent = "Play again";
  playMoreButton.addEventListener("click", function() {
    startQuiz();
  });
  answerOptionsEl.appendChild(playMoreButton);

  const playMoreMessage = document.createElement("p");
  playMoreMessage.textContent = "Do you want to play again?";
  answerOptionsEl.appendChild(playMoreMessage);

  playMoreButton.addEventListener("click", function() {
    answerOptionsEl.removeChild(playMoreButton);
    answerOptionsEl.removeChild(playMoreMessage);
  });
}


function showScores() {
  scoresEl.innerHTML = "";

  for (let i = 0; i < localStorage.length; i++) {
    const initials = localStorage.key(i);
    const score = localStorage.getItem(initials);

    const li = document.createElement("li");
    li.textContent = `${initials}: ${score}`;
    scoresEl.appendChild(li);
  }

  const clearButton = document.createElement("button");
  clearButton.textContent = "Clear Scores";
  clearButton.addEventListener("click", function() {
    const confirmClear = confirm("Are you sure you want to clear all scores?");
    if (confirmClear) {
      localStorage.clear();
      scoresEl.innerHTML = "Scores cleared.";
    }
  });
  scoresEl.appendChild(clearButton);
}
