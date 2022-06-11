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
                console.log('works')
                playerOne_boardEntry = true;
                playerTwoScore = 1;

                let currPosition = '';
                if (currDiceValue <= 19) {
                    currPosition = uptonineteen[currDiceValue];
                } else {
                    let first = '';
                    let second = '';
                    while (currDiceValue > 0) {
                        second = ten[currDiceValue % 10];
                        first = uptonineteen[currDiceValue / 10];
                    }
                    currPosition = first + second;
                }
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
                document.querySelector('.one').appendChild(playerWrapper);

            } else {
                currPlayer = 'playerTwo';
                return false;
            }
        } else {

        }
    } else {
        if (!playerTwo_BoardEntry) {
            if (currDiceValue == 6) {
                console.log('works')
                playerOne_boardEntry = true;
                playerTwoScore = 1;

                let currPosition = '';
                if (currDiceValue <= 19) {
                    currPosition = uptonineteen[currDiceValue];
                } else {
                    let first = '';
                    let second = '';
                    while (currDiceValue > 0) {
                        second = ten[currDiceValue % 10];
                        first = uptonineteen[currDiceValue / 10];
                    }
                    currPosition = first + second;
                }
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
                document.querySelector('.one').appendChild(playerWrapper);

            } else {
                currPlayer = 'playerOne';
                return false;
            }
        } else {

        }
    }
});

