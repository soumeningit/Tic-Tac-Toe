const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".gameInfo");
const newBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;
const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function inItGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", ""];
    newBtn.classList.remove("active");
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        boxes[index].classList.remove("win");
        // box.classList = `box box${index + 1}`;
    });

    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

inItGame();

function changeTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
        gameInfo.innerText = `Current Player - ${currentPlayer}`;
    }
    else {
        currentPlayer = "X";
        gameInfo.innerText = `Current Player - ${currentPlayer}`;
    }
}

function checkStatus() {
    let answer = "";
    winningPosition.forEach((position) => {
        // console.log(position);
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {
            // Now We konw X Or O One Of must win but we don't know who win
            if (gameGrid[position[0]] === "X") {
                answer = "X";
            }
            else {
                answer = "O";
            }
            // prevent pointer events whwn someone win

            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });

            // Make green those boxes where player win.

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    // Show the button
    if (answer !== "") {
        newBtn.classList.add("active");
        gameInfo.innerText = `Winner is - ${answer}`;
        return;
    }

    // Check if the game is tie
    let count = 0;
    gameGrid.forEach((box) => {
        if (box !== "") {
            count++;
        }
    })

    if (count === 9) {
        gameInfo.innerText = "Game Tied";
        newBtn.classList.add("active");
    }

}

newBtn.addEventListener("click", inItGame);

// function printDetails() {
//     for (let i = 0; i < 8; i++) {
//         console.log(gameGrid[i] + " ");
//     }
// }

function handleClickEvent(index) {

    boxes[index].innerText = currentPlayer;
    gameGrid[index] = currentPlayer;
    boxes[index].style.pointerEvents = "none";
    // Change the next Player Turn
    changeTurn();
    // Check if the match already win or tie.
    checkStatus();

    // printDetails();

}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClickEvent(index);
    });
});