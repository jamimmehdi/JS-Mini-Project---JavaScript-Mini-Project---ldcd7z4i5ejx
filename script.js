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

const images = ["img/dice-01.svg",
  "img/dice-02.svg",
  "img/dice-03.svg",
  "img/dice-04.svg",
  "img/dice-05.svg",
  "img/dice-06.svg"];

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
let playerOnePiece = "./img/playerOne-01.svg";
let playerTwoPiece = "./img/playerTwo-01.svg";
let playerOneName;
let playerTwoName;



function createPlayer() {
  let playerWrapper = document.createElement("div");
  playerWrapper.classList.add(currPlayer);
  playerWrapper.setAttribute('id', currPlayer);

  let piece = document.createElement('img');
  currPlayerPiece = currPlayer == 'playerOne' ? playerOnePiece : playerTwoPiece;
  piece.src = currPlayerPiece;


  playerWrapper.appendChild(piece);

  /* Append current player in new grid */
  let playerCurrPosition =
    currPlayer == "playerOne" ? playerOneCurrPosition : playerTwoCurrPosition;
  document.querySelector("." + playerCurrPosition).appendChild(playerWrapper);
}

//  Change User
function changeUser() {
  currPlayer = currPlayer == "playerOne" ? "playerTwo" : "playerOne";
}

// Update player name
function updatePlayerTurn() {
  let nextPlayer = currPlayer == "playerOne" ? "p1" : "p2";

  if (nextPlayer == "p1") {
    document.querySelector(".playerName").innerText = "Player 1 Turn";
    document.querySelector(".playerName").classList.remove('blue');
    document.querySelector(".playerName").classList.add('red');
  } else {
    document.querySelector(".playerName").innerText = "Player 2 Turn";
    document.querySelector(".playerName").classList.add('blue');
    document.querySelector(".playerName").classList.remove('red');
  }
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
    updatePlayerTurn();
    addActiveGlow();
  }
}

/* Snake bite and Ladder climb move */
let newMove = async (newPosition) => {
  await new Promise((resolve) => setTimeout(resolve, 800));
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

// Initial Play
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

      let hideHomePlayer = currPlayer == 'playerOne' ? 'home-p1' : 'home-p2';
      document.getElementById(hideHomePlayer).classList.add('visible-hidden');

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
      // changeUser()
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
      // changeUser()
    } else {
      move(newScore);
    }
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
}

// Add Glow to current player
function addActiveGlow() {
  let addGlowPlayer = currPlayer;

  let activeArrow = document.createElement('span');
  activeArrow.classList.add('scroll-down-arrow');

  let AddGlowIn = document.getElementById(addGlowPlayer);
  AddGlowIn.prepend(activeArrow);
}

// Set Player
async function setPlayer(diceValue) {
  currDiceValue = diceValue;

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
        currPlayer = 'playerOne';
      }
    }

  }
  updatePlayerTurn();
  addActiveGlow();
}

updatePlayerTurn();

// Roll Dice
async function roll() {
  document.querySelector('button').removeAttribute('onclick')
  let dice = document.querySelectorAll("#dice");
  let diceValue = Math.floor(Math.random() * 6 + 1);

  dice.forEach(function (die) {
    die.classList.add("shake");
  });

  setTimeout(function () {
    dice.forEach(function (die) {
      die.classList.remove("shake");
    });
    
    document.querySelector("#dice").setAttribute("src", images[diceValue - 1]);
  },
    1000
  );

  await new Promise((resolve) => setTimeout(resolve, 1200));
  setPlayer(diceValue);
  document.querySelector('button').setAttribute('onclick', "roll()");
}

document.getElementById('playAgain').addEventListener('click', () => {
  document.querySelector('.overlay').classList.add('hide');
  window.location.reload();
})
