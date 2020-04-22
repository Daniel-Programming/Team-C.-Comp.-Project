const statusDisplay = document.querySelector('.game--status');
/*
Declares some variables that will use track the
game state throught the game.
*/
/*
Uses gameActive to pause the game in case of an end scenario
*/
let gameActive = true;
/*
Stores our current player here
*/
let currentPlayer = "X";
/*
Stores our current game state here
*/
let gameState = ["", "", "", "", "", "", "", "", ""];
/*
Declared some messages we will display to the user during the game.
Since we have some dynamic factors in those messages, namely the current player,
we have declared them as functions, so that the actual message gets created with
current data every time we need it.
*/
const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => `Game ended in a draw!`;
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;
/*
Lets the players know whose turn it is
*/
statusDisplay.innerHTML = currentPlayerTurn();
function handleCellPlayed(clickedCell, clickedCellIndex) {
/*
We update our internal game state to reflect the played move,
as well as update the user interface to reflect the played move
*/
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
function handlePlayerChange() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusDisplay.innerHTML = currentPlayerTurn();
}
const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break
        }
    }
if (roundWon) {
        statusDisplay.innerHTML = winningMessage();
        gameActive = false;
        return;
    }
}
function handleCellClick(clickedCellEvent) {
/*
Save the clicked html element in a variable
*/
    const clickedCell = clickedCellEvent.target;
/*
Grabs the 'data-cell-index' attribute from the clicked cell to identify where that cell is in our grid.
*/
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute('data-cell-index')
    );
/*
checks whether the cell has already been played, or if the game is paused.
*/
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
    function handleCellPlayed(clickedCell, clickedCellIndex) {
/*
We update our internal game state to reflect the played move,
as well as update the user interface to reflect the played move
*/
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
}
function handleCellClick(clickedCellEvent) {
/*
We will save the clicked html element in a variable for easier further use
*/
    const clickedCell = clickedCellEvent.target;
/*
Here we will grab the 'data-cell-index' attribute from the clicked cell to identify where that cell is in our grid.
Please note that the getAttribute will return a string value. Since we need an actual number we will parse it to an
integer(number)
*/
    const clickedCellIndex = parseInt(
      clickedCell.getAttribute('data-cell-index')
    );
/*
Next up we need to check whether the call has already been played,
or if the game is paused. If either of those is true we will simply ignore the click.
*/
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }
/*
If everything if in order we will proceed with the game flow
*/
    handleCellPlayed(clickedCell, clickedCellIndex);
    handleResultValidation();
}
}
function handleRestartGame() {
    gameActive = true;
    currentPlayer = "X";
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerHTML = currentPlayerTurn();
    document.querySelectorAll('.cell')
               .forEach(cell => cell.innerHTML = "");
}
/*
Adds event listeners to the actual game cells, as well as the
restart button
*/
document.querySelectorAll('.cell').forEach(cell => cell.addEventListener('click', handleCellClick));
document.querySelector('.game--restart').addEventListener('click', handleRestartGame);
