// Number Arrays
uptonineteen = [
  "",
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
  "ten",
  "eleven",
  "twelve",
  "thirteen",
  "fourteen",
  "fifteen",
  "sixteen",
  "seventeen",
  "eighteen",
  "nineteen",
];

ten = [
  "",
  "",
  "twenty",
  "thirty",
  "forty",
  "fifty",
  "sixty",
  "seventy",
  "eighty",
  "ninety",
];

const snakeBiteValues = {
  _43: { start: 43, end: 17 },
  _55: { start: 55, end: 8 },
  _87: { start: 87, end: 49 },
  _84: { start: 84, end: 63 },
  _98: { start: 98, end: 40 },
};

const ladderClimbValues = {
  _6: { start: 6, end: 25 },
  _20: { start: 20, end: 58 },
  _48: { start: 48, end: 69 },
  _66: { start: 66, end: 85 },
};

let currPlayer = "playerOne";
let currDiceValue = 0;
let playerOneScore = 0;
let playerTwoScore = 0;
let playerOneCurrPosition = "";
let playerTwoCurrPosition = "";
let playerOne_boardEntry = false;
let playerTwo_BoardEntry = false;



function createPlayer() {
  let playerWrapper = document.createElement("div");
  playerWrapper.classList.add(currPlayer);

  let head = document.createElement("div");
  head.classList.add("head");

  let playerName = currPlayer == "playerOne" ? "P1" : "P2";
  head.innerText = playerName;

  let arrowDown = document.createElement("div");
  arrowDown.classList.add("arrow-down");

  playerWrapper.appendChild(head);
  playerWrapper.appendChild(arrowDown);

  /* Append current player in new grid */
  let playerCurrPosition =
    currPlayer == "playerOne" ? playerOneCurrPosition : playerTwoCurrPosition;
  document.querySelector("." + playerCurrPosition).appendChild(playerWrapper);
}

function move(newScore, specialMoves = false) {
  let playerPosition =
    currPlayer == "playerOne" ? playerOneCurrPosition : playerTwoCurrPosition;
  let playerScore = newScore;

  // Clear previous position
  document
    .querySelector("." + playerPosition)
    .querySelector("." + currPlayer)
    .remove();

  // Update player Score
  currPlayer == "playerOne"
    ? (playerOneScore = playerScore)
    : (playerTwoScore = playerScore);

  // Add player to new position
  let currPosition = "";
  if (newScore <= 19) {
    currPosition = uptonineteen[playerScore];
  } else {
    let first = "";
    let second = "";
    while (newScore > 0) {
      second = uptonineteen[newScore % 10];
      newScore = Math.floor(newScore / 10);
      first = ten[newScore % 10];
      newScore = Math.floor(newScore / 10);
    }
    currPosition = first + second;
  }

  currPlayer == "playerOne"
    ? (playerOneCurrPosition = currPosition)
    : (playerTwoCurrPosition = currPosition);

  // Create Player
  createPlayer();

  if (!specialMoves) {
    currPlayer = currPlayer == "playerOne" ? "playerTwo" : "playerOne";
  }
}

/* Snake bite and Ladder climb move */
let newMove = async (newPosition) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  currPlayer == "playerOne"
    ? (playerOneScore = newPosition)
    : (playerTwoScore = newPosition);
  move(newPosition);
};

/* Snake bite */
function snakeBite(biteAt) {
  switch (biteAt) {
    case snakeBiteValues._43.start: {
      newMove(snakeBiteValues._43.end);
      break;
    }
    case snakeBiteValues._55.start: {
      newMove(snakeBiteValues._55.end);
      break;
    }
    case snakeBiteValues._87.start: {
      newMove(snakeBiteValues._87.end);
      break;
    }
    case snakeBiteValues._84.start: {
      newMove(snakeBiteValues._84.end);
      break;
    }
    case snakeBiteValues._98.start: {
      newMove(snakeBiteValues._98.end);
      break;
    }
    default: {
      return false;
    }
  }
}

/* Lader Climb */
function ladderClimb(startAt) {
  switch (startAt) {
    case ladderClimbValues._6.start: {
      newMove(ladderClimbValues._6.end);
      break;
    }
    case ladderClimbValues._20.start: {
      newMove(ladderClimbValues._20.end);
      break;
    }
    case ladderClimbValues._48.start: {
      newMove(ladderClimbValues._48.end);
      break;
    }
    case ladderClimbValues._66.start: {
      newMove(ladderClimbValues._66.end);
      break;
    }
    default: {
      return false;
    }
  }
}

function play(player_boardEntry, diceValue) {
  if (!player_boardEntry) {
    if (diceValue == 6) {
      currPlayer == "playerOne"
        ? (playerOne_boardEntry = true)
        : (playerTwo_BoardEntry = true);

      currPlayer == "playerOne" ? (playerOneScore = 1) : (playerTwoScore = 1);

      let currPosition = "one";

      currPlayer == "playerOne"
        ? (playerOneCurrPosition = currPosition)
        : (playerTwoCurrPosition = currPosition);

      createPlayer();
    } else {
      currPlayer == "playerOne"
        ? (currPlayer = "playerTwo")
        : (currPlayer = "playerOne");
    }
  } else {
    let newScore =
      currPlayer == "playerOne"
        ? playerOneScore + diceValue
        : playerTwoScore + diceValue;

    // Check for Snakebite
    if (
      newScore === snakeBiteValues._43.start ||
      newScore === snakeBiteValues._55.start ||
      newScore === snakeBiteValues._87.start ||
      newScore === snakeBiteValues._84.start ||
      newScore === snakeBiteValues._98.start
    ) {
      move(newScore, true);
      snakeBite(newScore);
    }
    // Check for Ladderclimb
    else if (
      newScore === ladderClimbValues._6.start ||
      newScore === ladderClimbValues._20.start ||
      newScore === ladderClimbValues._48.start ||
      newScore === ladderClimbValues._66.start
    ) {
      move(newScore, true);
      ladderClimb(newScore);
    } else {
      move(newScore);
    }
  }
}

function updatePlayerTurn() {
  let nextPlayer = currPlayer == "playerOne" ? "p1" : "p2";

  if (nextPlayer == "p1") {
    document.querySelector(".playerName").innerText = "Player 1 Turn";
  } else {
    document.querySelector(".playerName").innerText = "Player 2 Turn";
  }
}

// Winner
function checkWinner(diceValue) {
  let currPlayerScore = currPlayer == 'playerOne' ? playerOneScore : playerTwoScore;
  if (currPlayerScore + diceValue === 100) {
    return true;
  }
  return false;
}

// Announce Winner
function announceWinner(winner) {
  let winnerName = winner == 'playerOne' ? "Player 1 Wins" : "Player  2 Wins"

  document.getElementById('winnerName').innerText = winnerName;
  document.querySelector('.overlay').classList.remove('hide');
  location.reload();
}

// Roll Dice
document.querySelector(".diceWrapper").addEventListener("click", async () => {
  let dicevalue = Math.floor(Math.random() * 6 + 1);
  currDiceValue = dicevalue;

  document.querySelector(".dice").textContent = currDiceValue;

  if (currPlayer == "playerOne") {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (checkWinner(currDiceValue)) {
      document.querySelector("." + playerOneCurrPosition).querySelector("." + currPlayer).remove();
      playerOneCurrPosition = 'hundread';
      createPlayer();

      await new Promise((resolve) => setTimeout(resolve, 500));
      announceWinner(currPlayer);
    } else {
      if (currDiceValue <= (100 - playerOneScore)) {
        play(playerOne_boardEntry, currDiceValue);
      } else {
        currPlayer = 'playerTwo';
      }
    }

  } else if (currPlayer == "playerTwo") {
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (checkWinner(currDiceValue)) {
      document.querySelector("." + playerTwoCurrPosition).querySelector("." + currPlayer).remove();
      playerTwoCurrPosition = 'hundread';
      createPlayer();

      await new Promise((resolve) => setTimeout(resolve, 500));
      announceWinner(currPlayer);
    } else {
      if (currDiceValue <= (100 - playerTwoScore)) {
        play(playerTwo_BoardEntry, currDiceValue);
      } else {
        currPlayer = 'playerOne'
      }
    }

  }
  updatePlayerTurn();
});

updatePlayerTurn();

document.getElementById('playAgain').addEventListener('click', () => {
  document.querySelector('.overlay').classList.add('hide');
})