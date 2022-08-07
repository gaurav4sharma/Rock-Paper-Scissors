const buttons = document.querySelectorAll(".pick");
const CHOICES = ["paper", "scissors", "rock"];
const scoreEl = document.getElementById("score");
const main = document.getElementById("main");
const selection = document.getElementById("selection");
const reset = document.getElementById("btn-result");
const userSelect = document.getElementById("user-select");
const aiSelect = document.getElementById("ai-select");
const result = document.getElementById("result");
const modalOpen = document.getElementById("open-modal");
const modalClose = document.getElementById("close-modal");
const modal = document.getElementById("modal");

let userChoice = undefined;
let score = 0;

buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
        userChoice = btn.getAttribute("data-choice");
        checkWin();
    });
});

reset.addEventListener("click", () => {
    main.style.display = "grid";
    selection.style.display = "none";
});

modalOpen.addEventListener("click", () => {
    modal.style.display = "flex";
});
modalClose.addEventListener("click", () => {
    modal.style.display = "none";
});

function pickRandom() {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
}

function checkWin() {
    const aiChoice = pickRandom();

    //Updating the View
    updateSelection(userSelect, userChoice);
    updateSelection(aiSelect, aiChoice);

    if (userChoice === aiChoice) {
        //draw
        result.innerText = "Draw";
    } else if (
        (userChoice === "rock" && aiChoice === "scissors") ||
        (userChoice === "paper" && aiChoice === "rock") ||
        (userChoice === "scissors" && aiChoice === "paper")
    ) {
        updateScore(1);
        result.innerText = "Win";
    } else {
        updateScore(-1);
        result.innerText = "Lose";
    }
    main.style.display = "none";
    selection.style.display = "flex";
}

function updateScore(value) {
    score += value;

    scoreEl.innerText = score;
}

function updateSelection(selEl, choice) {
    const img = selEl.querySelector("img");
    //Class Reset
    selEl.classList.remove("btn-paper");
    selEl.classList.remove("btn-rock");
    selEl.classList.remove("btn-scissors");

    selEl.classList.add(`btn-${choice}`);
    img.src = `./images/icon-${choice}.svg`;
    img.alt = `${choice}`;
}
