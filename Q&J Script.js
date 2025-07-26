const questions = [
      {
        question: "What event triggered the start of World War I?",
        options: ["Bombing of Pearl Harbor", "Assassination of Archduke Franz Ferdinand", "Invasion of Poland", "Sinking of the Lusitania"],
        answer: 1
      },
      {
        question: "Which treaty officially ended World War I?",
        options: ["Treaty of Paris", "Treaty of Rome", "Treaty of Versailles", "Treaty of Vienna"],
        answer: 2
      },
      {
        question: " Which country’s invasion marked the beginning of World War II?",
        options: ["France", "Belgium", "Russia", "Poland"],
        answer: 3
      },
      {
        question: "Which city was the first to be attacked with an atomic bomb?",
        options: ["Tokyo", "Berlin", "Hiroshima", "Nagasaki"],
        answer: 2
      }
    ];

    let currentQuestion = 0;
    let score = 0;

    const questionText = document.getElementById("question-text");
    const optionsContainer = document.getElementById("options-container");
    const nextBtn = document.getElementById("next-btn");
    const quizPage = document.getElementById("quiz-page");
    const resultPage = document.getElementById("result-page");
    const scoreText = document.getElementById("score-text");
    const feedback = document.getElementById("feedback");
    const restartBtn = document.getElementById("restart-btn");

    function loadQuestion() {
      const q = questions[currentQuestion];
      questionText.textContent = `${currentQuestion + 1}. ${q.question}`;
      optionsContainer.innerHTML = "";
      feedback.textContent = "";
      nextBtn.classList.add("hidden");

      q.options.forEach((option, index) => {
        const btn = document.createElement("button");
        btn.textContent = option;
        btn.onclick = () => handleAnswer(index);
        optionsContainer.appendChild(btn);
      });
    }

    function handleAnswer(selectedIndex) {
      const correctIndex = questions[currentQuestion].answer;
      const buttons = optionsContainer.querySelectorAll("button");

      buttons.forEach((btn, i) => {
        btn.disabled = true;
        if (i === correctIndex) {
          btn.classList.add("correct");
        }
        if (i === selectedIndex && i !== correctIndex) {
          btn.classList.add("wrong");
        }
      });

      if (selectedIndex === correctIndex) {
        score++;
        feedback.textContent = "✅ Correct Answer!";
        feedback.style.color = "green";
      } else {
        feedback.textContent = `❌ Wrong Answer! Correct answer is: ${questions[currentQuestion].options[correctIndex]}`;
        feedback.style.color = "red";
      }

      nextBtn.classList.remove("hidden");
    }

    nextBtn.onclick = () => {
      currentQuestion++;
      if (currentQuestion < questions.length) {
        loadQuestion();
      } else {
        showResult();
      }
    };

    function showResult() {
      quizPage.style.display = "none";
      resultPage.style.display = "block";
      scoreText.textContent = `Your Score: ${score} / ${questions.length}`;
    }

    restartBtn.onclick = () => {
      currentQuestion = 0;
      score = 0;
      quizPage.style.display = "block";
      resultPage.style.display = "none";
      loadQuestion();
    };

    loadQuestion();

