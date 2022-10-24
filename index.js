// variables
const hand = ["rock", "paper", "scissors"];
const topScore = 4;
let totalPlayerScore = 0;
let totalComputerScore = 0;
let playerScore = 0;
let computerScore = 0;
let tieCounter = 0;
let playerSelection = "";
let computerSelection = "";


// stage container elements
var handSelectCon = document.getElementById("handSelection");
var compareCon = document.getElementById("compare");
var resultCon = document.getElementById("result");

// related game elements
var player = document.getElementById("player");
var computer = document.getElementById("computer");
var score = document.getElementById("playerScore");
let result_text = document.querySelector(".result h1");
var final_text = document.getElementById("endText");

// button elements
var replay_btn = document.getElementById("replay");
var rules_btn = document.getElementById("rulesBtn");
var close_btn_rule = document.getElementById("close");
var close_btn_final = document.getElementById("endClose");

// other elements
var overlay = document.getElementById("overlay");

// click events

//open rule dialog
rules_btn.addEventListener("click", () => {
  overlay.style.display = "inherit";
  document.getElementById("rules").open = true;
});

// close rule dialog
close_btn_rule.addEventListener("click", () => {
  document.getElementById("rules").open = false;
  overlay.style.display = "none";
});

// close final result dialog
close_btn_final.addEventListener("click", () => {
  document.getElementById("endResult").open = false;
  overlay.style.display = "none";
});

// first stage; player chooses a hand
const handList = document.querySelectorAll(".hand");
handList.forEach((hand) => {
  hand.addEventListener("click", () => {
    playerSelection = hand.value;
    nextStage();
  });
});

// replay first stage
replay_btn.addEventListener("click", () => {
  //reset scores but not total scores
  playerScore = 0;
  computerScore = 0;
  tieCounter = 0;

  //resets elements to appear like first stage
  compareCon.classList.remove("ending");
  player.classList.remove(playerSelection, "isWinner");
  computer.classList.remove(computerSelection, "isWinner");
  resultCon.style.display = "none";
  compareCon.style.display = "none";
  handSelectCon.style.display = "inherit";

  // resets total scores
  if (totalPlayerScore > topScore || totalComputerScore > topScore) {
    totalPlayerScore = 0;
    totalComputerScore = 0;
    score.textContent = 0;
  }
});

function computerPlay() {
  return hand[Math.floor(Math.random() * hand.length)];
}

//second stage; compare hands b/ players
function nextStage() {
  //hides first stage & display 2nd stage
  handSelectCon.style.display = "none";
  compareCon.style.display = "inherit";
  //display which hand player chose
  player.classList.toggle(playerSelection);
  // to show some delay
  setTimeout(function () {
    computerSelection = computerPlay();
    //display which hand computer generated
    computer.classList.toggle(computerSelection);
    gameLogic(playerSelection, computerSelection);
  }, 200);
}

//last stage & final stage; show which player wins
function resultStage(winner, result) {
  //display winner for the last stage
  resultCon.style.display = "inherit";
  compareCon.classList.toggle("ending");
  winner != null ? winner.classList.toggle("isWinner") : "";
  result_text.textContent = result;

  // display final score for the winner of the game
  if (totalPlayerScore > topScore) {
    document.getElementById("endResult").open = true;
    overlay.style.display = "inherit";
    final_text.textContent = "Congrats, you won the game!";
  }
  if (totalComputerScore > topScore) {
    document.getElementById("endResult").open = true;
    overlay.style.display = "inherit";
    final_text.textContent = "You lost the game! Try again";
  }
}

function gameLogic(playerHand, computerHand) {
  if (playerHand == computerHand) {
    ++tieCounter;
    resultStage(null, "its a tie");
  } else if (
    (playerHand === hand[0] && computerHand === hand[2]) ||
    (playerHand === hand[1] && computerHand === hand[0]) ||
    (playerHand === hand[2] && computerHand === hand[1])
  ) {
    ++playerScore;
    score.textContent = ++totalPlayerScore;
    totalComputerScore > 0 ? --totalComputerScore : 0;
    resultStage(player, "you win");
  } else {
    ++computerScore;
    score.textContent =
      totalPlayerScore > 0 ? --totalPlayerScore : (0, (totalPlayerScore = 0));
    ++totalComputerScore;
    resultStage(computer, "you lose");
  }
}
