const questions = [
  {
    text: "Would you rather find out your partner is cheating with your best friend, or that one of your parents is cheating on the other?",
    choices: ["Your partner and best friend", "One of your parents"],
    results: [62, 38],
  },
  {
    text: "Would you rather know every secret your friends keep from you, or let them know every secret you keep from them?",
    choices: ["Know all of their secrets", "They know all of yours"],
    results: [71, 29],
  },
  {
    text: "Would you rather be able to undo one decision from your past, or see one decision from your future?",
    choices: ["Undo the past", "See the future"],
    results: [44, 56],
  },
];

const poll = document.querySelector("[data-poll]");
if (poll) {
  const prompt = poll.querySelector("[data-prompt]");
  const number = poll.querySelector("[data-number]");
  const feedback = poll.querySelector("[data-feedback]");
  const choices = [...poll.querySelectorAll("[data-choice]")];
  const nextButton = poll.querySelector("[data-next]");
  let questionIndex = 0;

  const renderQuestion = () => {
    const question = questions[questionIndex];
    poll.classList.remove("answered");
    number.textContent = `Question ${String(questionIndex + 1).padStart(2, "0")}`;
    prompt.textContent = question.text;
    feedback.textContent = "Make your pick to reveal the split";
    choices.forEach((choice, index) => {
      choice.classList.remove("selected");
      choice.disabled = false;
      choice.style.setProperty("--result", "0%");
      choice.querySelector("[data-choice-text]").textContent = question.choices[index];
      choice.querySelector("[data-result]").textContent = `${question.results[index]}%`;
    });
  };

  choices.forEach((choice, selectedIndex) => {
    choice.addEventListener("click", () => {
      if (poll.classList.contains("answered")) return;
      const question = questions[questionIndex];
      poll.classList.add("answered");
      choice.classList.add("selected");
      feedback.textContent = question.results[selectedIndex] >= 50 ? "You picked with the majority" : "You went against the crowd";
      choices.forEach((item, index) => {
        item.disabled = true;
        item.style.setProperty("--result", `${question.results[index]}%`);
      });
    });
  });

  nextButton.addEventListener("click", () => {
    questionIndex = (questionIndex + 1) % questions.length;
    renderQuestion();
  });
  renderQuestion();
}

const year = document.querySelector("[data-year]");
if (year) year.textContent = new Date().getFullYear();
