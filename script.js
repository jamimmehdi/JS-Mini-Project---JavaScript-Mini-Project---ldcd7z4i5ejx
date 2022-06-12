//Number Arrays
uptonineteen = ["", "one", "two", "three", "four",
    "five", "six", "seven", "eight", "nine", "ten",
    "eleven", "twelve", "thirteen", "fourteen", "fifteen",
    "sixteen", "seventeen", "eighteen", "nineteen"];

ten = ["", "", "twenty", "thirty", "forty", "fifty",
    "sixty", "seventy", "eighty", "ninety"];

let currPlayer = 'playerOne';
let currDiceValue = 0;
let playerOneScore = 0;
let playerOneCurrPosition = '';
let playerTwoCurrPosition = '';
let playerTwoScore = 0;
let playerOne_boardEntry = false;
let playerTwo_BoardEntry = false;

// function boardEntry() {
//     if (playerOne_boardEntry)
// }

//Roll Dice
document.querySelector('.diceWrapper').addEventListener('click', () => {
    let dicevalue = Math.floor((Math.random() * 6) + 1);
    currDiceValue = dicevalue;

    document.querySelector('.dice').textContent = currDiceValue;
    console.log(currDiceValue)
    if (currPlayer == 'playerOne') {
        if (!playerOne_boardEntry) {
            if (currDiceValue == 6) {
                console.log('works', currPlayer)
                playerOne_boardEntry = true;
                playerOneScore = 1;

                let currPosition = 'one';

                playerOneCurrPosition = currPosition;

                console.log(playerOneCurrPosition);

                //Create Player
                let playerWrapper = document.createElement('div');
                playerWrapper.classList.add(currPlayer);

                let head = document.createElement('div');
                head.classList.add('head');

                let playerName = currPlayer == "playerOne" ? "P1" : "P2";
                head.innerText = playerName;

                let arrowDown = document.createElement('div');
                arrowDown.classList.add('arrow-down');

                playerWrapper.appendChild(head);
                playerWrapper.appendChild(arrowDown);

                //Append current player in first grid
                document.querySelector('.'+playerOneCurrPosition).appendChild(playerWrapper);

            } else {
                currPlayer = 'playerTwo';
            }
        } else {
            let newScore = playerOneScore + currDiceValue;

            //Clear previous position
            // document.querySelector('.'+ playerOneCurrPosition).innerHTML = '';

            document.querySelector('.'+ playerOneCurrPosition).querySelector('.'+currPlayer).remove()

            
            // document.querySelector('.'+ playerOneCurrPosition).innerHTML = playerOneScore;

            
            //Update playerOne Score
            playerOneScore = newScore;

            //Add player to new position
            let currPosition = '';
            if (newScore <= 19) {
                currPosition = uptonineteen[playerOneScore];
            } else {
                let first = '';
                let second = '';
                while (newScore > 0) {
                    second = uptonineteen[newScore % 10];
                    newScore =  Math.floor(newScore / 10);
                    console.log(newScore);
                    first = ten[newScore % 10];
                    newScore = Math.floor(newScore / 10);
                }
                currPosition = first + second;
                console.log(currPosition);
            }
            playerOneCurrPosition = currPosition;

            //Create Player
            let playerWrapper = document.createElement('div');
            playerWrapper.classList.add(currPlayer);

            let head = document.createElement('div');
            head.classList.add('head');

            let playerName = currPlayer == "playerOne" ? "P1" : "P2";
            head.innerText = playerName;

            let arrowDown = document.createElement('div');
            arrowDown.classList.add('arrow-down');

            playerWrapper.appendChild(head);
            playerWrapper.appendChild(arrowDown);

            //Append current player in first grid
            document.querySelector('.'+ currPosition).appendChild(playerWrapper);

            currPlayer = 'playerTwo';
        }
    } else {
        if (!playerTwo_BoardEntry) {
            if (currDiceValue == 6) {
                console.log('works', currPlayer)
                playerTwo_BoardEntry = true;
                playerTwoScore = 1;

                let currPosition = 'one';

                playerTwoCurrPosition = currPosition;

                //Create Player
                let playerWrapper = document.createElement('div');
                playerWrapper.classList.add(currPlayer);

                let head = document.createElement('div');
                head.classList.add('head');

                let playerName = currPlayer == "playerOne" ? "P1" : "P2";
                head.innerText = playerName;

                let arrowDown = document.createElement('div');
                arrowDown.classList.add('arrow-down');

                playerWrapper.appendChild(head);
                playerWrapper.appendChild(arrowDown);

                //Append current player in first grid
                document.querySelector('.'+ playerTwoCurrPosition).appendChild(playerWrapper);

            } else {
                currPlayer = 'playerOne';
            }
        } else {
            let newScore = playerTwoScore + currDiceValue;

            //Clear previous position
            // document.querySelector('.'+ playerTwoCurrPosition).innerHTML = '';
            document.querySelector('.'+ playerTwoCurrPosition).querySelector('.'+currPlayer).remove()
            
            // document.querySelector('.'+ playerTwoCurrPosition).innerHTML = playerTwoScore;

            //Update playerOne Score
            playerTwoScore = newScore;

            //Add player to new position
            let currPosition = '';
            if (newScore <= 19) {
                currPosition = uptonineteen[playerTwoScore];
            } else {
                let first = '';
                let second = '';
                while (newScore > 0) {
                    second = uptonineteen[newScore % 10];
                    newScore =  Math.floor(newScore / 10);
                    console.log(newScore);
                    first = ten[newScore % 10];
                    newScore = Math.floor(newScore / 10);
                }
                currPosition = first + second;
            }
            playerTwoCurrPosition = currPosition;

            //Create Player
            let playerWrapper = document.createElement('div');
            playerWrapper.classList.add(currPlayer);

            let head = document.createElement('div');
            head.classList.add('head');

            let playerName = currPlayer == "playerOne" ? "P1" : "P2";
            head.innerText = playerName;

            let arrowDown = document.createElement('div');
            arrowDown.classList.add('arrow-down');

            playerWrapper.appendChild(head);
            playerWrapper.appendChild(arrowDown);

            //Append current player in first grid
            document.querySelector('.'+ currPosition).appendChild(playerWrapper);

            currPlayer = 'playerOne';
        }
    }

    let nextPlayer = currPlayer == "playerOne" ? "p1" : "p2";

    if (nextPlayer == 'p1') {
        document.querySelector('.playerName').innerText = "Player 1 Turn";
    } else {
        document.querySelector('.playerName').innerText = "Player 2 Turn";
    }
});

let nextPlayer = currPlayer == "playerOne" ? "p1" : "p2";

if (nextPlayer == 'p1') {
    document.querySelector('.playerName').textContent = "Player 1 Turn";
} else {
    document.querySelector('.playerName').textContent = "Player 2 Turn";
}
