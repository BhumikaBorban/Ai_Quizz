// quiz.js

// Question Bank
const quizzes = {
"quantitative-aptitude": [
    { q: "12 + 15 = ?", options: ["25","27","28","30"], answer: "27" },
    { q: "Square root of 144?", options: ["10","11","12","13"], answer: "12" },
    { q: "Average of 10, 20, 30?", options: ["15","20","25","30"], answer: "20" },
    { q: "15 × 3 = ?", options: ["45","40","50","35"], answer: "45" },
    { q: "25 ÷ 5 = ?", options: ["5","6","4","7"], answer: "5" }
  ],
  "logical-reasoning": [
    { q: "Find odd one: Dog, Cat, Cow, Mango", options:["Dog","Cat","Cow","Mango"], answer:"Mango" },
    { q: "If A=1, B=2, Z=?", options:["24","25","26","27"], answer:"26" },
    { q: "What comes next: 2,4,8,16?", options:["18","24","32","20"], answer:"32" },
    { q: "Opposite of True?", options:["False","Wrong","No","Off"], answer:"False" },
    { q: "Complete series: 1,1,2,3,5,?", options:["7","8","6","9"], answer:"8" }
  ],
  "data-interpretation": [
    { q: "If total sales = 100 and X sold 40, what %?", options:["40%","50%","30%","60%"], answer:"40%" },
    { q: "Pie chart shows 50% as A, rest B. B = ?", options:["50","45","40","60"], answer:"50" },
    { q: "If average = 20, sum of 5 numbers?", options:["100","90","80","120"], answer:"100" },
    { q: "If max=90, min=30, range?", options:["60","50","70","40"], answer:"60" },
    { q: "If ratio = 3:2, total = 25?", options:["15 & 10","12 & 8","18 & 12","20 & 5"], answer:"15 & 10" }
  ],
  "number-series": [
    { q: "2,4,8,16,?", options:["20","32","24","30"], answer:"32" },
    { q: "5,10,15,?", options:["18","20","25","30"], answer:"20" },
    { q: "1,3,6,10,?", options:["14","15","13","12"], answer:"15" },
    { q: "10,9,7,4,?", options:["0","3","2","5"], answer:"2" },
    { q: "3,6,12,24,?", options:["36","48","50","60"], answer:"48" }
  ],
  "time-work": [
    { q: "A can do job in 10 days. B in 20. Together?", options:["6.7","8","12","10"], answer:"6.7" },
    { q: "Work=60 units, 3 workers, 4 days?", options:["5 units/day","4 units/day","6 units/day","8 units/day"], answer:"5 units/day" },
    { q: "Pipe fills tank 20 hrs, empty 30 hrs, net time?", options:["60 hrs","50 hrs","40 hrs","45 hrs"], answer:"60 hrs" },
    { q: "A+B can do in 6 days, B alone in 12, A alone?", options:["12","10","8","6"], answer:"6" },
    { q: "1 worker=8 hrs/day, 3 workers=2 days, total hrs?", options:["48","36","24","32"], answer:"48" }
  ]
};

const quizBox = document.getElementById("quiz-box");
const nextBtn = document.getElementById("next-btn");
const resultBox = document.getElementById("result-box");

let currentQuiz = [];
let currentIndex = 0;
let score = 0;
let selectedAnswer = null;
let timer;
let timeLeft = 5;

// Load Quiz based on URL param
function loadQuizFromURL() {
  const params = new URLSearchParams(window.location.search);
  const quizName = params.get("quiz");
  currentQuiz = quizzes[quizName] || [];
  showQuestion();
}

// Show Question
function showQuestion() {
  if (currentIndex >= currentQuiz.length) {
    showResult();
    return;
  }

  clearInterval(timer);
  timeLeft = 5;

  const q = currentQuiz[currentIndex];
  quizBox.innerHTML = `
    <div class="quiz-card">
      <h2>Q${currentIndex + 1}: ${q.q}</h2>
      <div class="options">
        ${q.options.map(opt => 
          `<button class="option-btn">${opt}</button>`
        ).join("")}
      </div>
      <p id="timer" class="timer">Time Left: ${timeLeft}s</p>
    </div>
  `;

  document.querySelectorAll(".option-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (!selectedAnswer) {
        selectedAnswer = btn.textContent;
        btn.style.background = "#4CAF50"; // highlight selection
      }
    });
  });

  startTimer();
}

// Start Timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    let timerEl = document.getElementById("timer");
    timerEl.textContent = `Time Left: ${timeLeft}s`;

    if (timeLeft <= 2) {
      timerEl.style.color = "red";
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

// Next Question
function nextQuestion() {
  clearInterval(timer);
  if (selectedAnswer && selectedAnswer === currentQuiz[currentIndex].answer) {
    score++;
  }
  currentIndex++;
  selectedAnswer = null;
  showQuestion();
}

// Show Result
function showResult() {
  quizBox.innerHTML = "";
  nextBtn.style.display = "none";
  resultBox.innerHTML = `
    <h2>Quiz Finished!</h2>
    <p>Your Score: ${score} / ${currentQuiz.length}</p>
    <a href="index.html"><button>Go to Home</button></a>
  `;
}

// Event Listener
nextBtn.addEventListener("click", nextQuestion);

// Init
loadQuizFromURL();
