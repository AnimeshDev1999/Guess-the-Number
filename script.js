"use strict";

let comChoice = undefined;
let userChoice = undefined;
let comChoiceMax = undefined;
let comChoiceMin = undefined;
let points = undefined;
let ans = undefined;
let highs = 0;
let userScores = undefined;
let keyPressed;
const button = document.querySelector("#btn");
const overlay = document.querySelector("#overlay");
const popup = document.querySelector("#popup");
const terminate = document.querySelector("#close");

function start(clicked) {
  points = 20;
  comChoice = Number(Math.floor(Math.random() * 20 + 1));
  document.getElementById("body").style.backgroundColor = "white";
  document.getElementById("hint").innerHTML = "❔ Start the game to get hints.";
  document.getElementById("user-input").value = "0";
  console.log(comChoice);
  comChoiceMax = comChoice + 3;
  comChoiceMin = comChoice - 3;
  document.getElementById("user-score").innerHTML = `Score: 20`;
  document.getElementById("reveal").innerHTML = `?`;
  document.getElementById("score").innerHTML = `💯 Score: 0`;
  document.getElementById("user-input").style.pointerEvents = "all";
  document.getElementById("check").style.pointerEvents = "all";
}

function check(clicked) {
  userChoice = Number(document.getElementById("user-input").value);
  if (userChoice === comChoice) {
    document.getElementById(
      "hint"
    ).innerHTML = `🎉 ${userChoice} is the correct answer!`;
    document.getElementById("reveal").innerHTML = `${userChoice}`;
    document.getElementById("body").style.backgroundColor = "#90EE90";
    document.getElementById("user-input").style.pointerEvents = "none";
    document.getElementById("check").style.pointerEvents = "none";
    ans = true;
  } else if (userChoice >= comChoice && userChoice <= comChoiceMax) {
    document.getElementById(
      "hint"
    ).innerHTML = `📈 ${userChoice}? close but a bit high.`;
  } else if (userChoice <= comChoice && userChoice >= comChoiceMin) {
    document.getElementById(
      "hint"
    ).innerHTML = `📉 ${userChoice}? close but a bit low`;
  } else if (userChoice !== comChoice) {
    document.getElementById(
      "hint"
    ).innerHTML = `🤷‍♂️ ${userChoice}? not even close`;
  }
  userScores = document.getElementById("score").innerText;
  console.log(userScores);
  calcScore(ans);
  calcHigh(points);
  winOrLoose(userScores);
}

function calcScore(answer) {
  if (answer) {
    document.getElementById("user-score").innerHTML = `Score: ${points}`;
    document.getElementById("score").innerHTML = `💯 Score: ${points}`;
  } else {
    points--;
    document.getElementById("user-score").innerHTML = `Score: ${points}`;
    document.getElementById("score").innerHTML = `💯 Score: ${points}`;
  }
}

function calcHigh(scores) {
  if (highs < scores) {
    document.getElementById("high").innerHTML = `🥇 High score: ${scores}`;
  }
}

function winOrLoose(gameState) {
  if (gameState === "💯 Score: 1") {
    document.getElementById("hint").innerHTML = `💥 You Loose.`;
    document.getElementById("check").style.pointerEvents = "none";
    document.getElementById("user-input").style.pointerEvents = "none";
  }
}
function active() {
  overlay.classList.remove("hidden");
  popup.classList.remove("hidden");
}

function deactive() {
  overlay.classList.add("hidden");
  popup.classList.add("hidden");
}

button.addEventListener("click", active);
terminate.addEventListener("click", deactive);
overlay.addEventListener("click", deactive);

document.addEventListener("keydown", function (e) {
  keyPressed = e.key;
  if (keyPressed === "Escape") {
    if (
      !overlay.classList.contains("hidden") &&
      !popup.classList.contains("hidden")
    ) {
      deactive();
    }
  }
});
