'use strict'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' ';
const SUPERFOOD = '🥡'
const CHERRY = '🍒'

var gBoard
var gGame
var gIntervalBunos

function init() {
    gGame = {
        score: 0,
        isOn: false,
        foodOnBoard: 0,
        foodEaten: 0
    }
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    printMat(gBoard, '.board-container')
    gGame.isOn = true

    document.querySelector('.score span').innerText = 0
    clearInterval(gIntervalGhosts)
    gIntervalGhosts = setInterval(moveGhosts, 2000)
    clearInterval(gIntervalBunos)
    gIntervalBunos = setInterval(bunosFood, 15000)
}

function buildBoard() {
    var SIZE = 10;
    var board = [];
    for (var i = 0; i < SIZE; i++) {
        board.push([]);
        for (var j = 0; j < SIZE; j++) {
            board[i][j] = FOOD
            gGame.foodOnBoard ++
            if (i === 0 || i === SIZE - 1 ||
                j === 0 || j === SIZE - 1 ||
                (j === 3 && i > 4 && i < SIZE - 2)) {
                board[i][j] = WALL
                gGame.foodOnBoard --
            } else if (i === 1 && j === 1 || i === 1 && j === 8||
                         i === 8 && j === 1 || i === 8 && j === 8 ) {
                board[i][j] = SUPERFOOD
            }
        }
    }
    return board;
}

function finishEatGhostMode() {
    gPacman.eatGhostMode = false
    // clearTimeout(gTimeoutEatGhost)
    for (var idx = 0; idx < gGhosts.length; idx++) {
        renderCell(gGhosts[idx].location, getGhostHTML(gGhosts[idx]))
    }
    for (var i = 0; i < gPacman.ghostsEaten; i++) {
        createGhost(gBoard)
    }
    gPacman.ghostsEaten = 0
}

function bunosFood() {
    var emptyCells = []
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[i].length; j++) { 
            if (gBoard[i][j] === EMPTY) {
                emptyCells.push({i,j})
            }
        }
    }
    if (emptyCells.length === 0) {
        return
    }
    var randNum = getRandomIntInclusive(1, emptyCells.length)
    var randCell = emptyCells[randNum]
    gBoard[randCell.i][randCell.j] = CHERRY
    renderCell(randCell, CHERRY)
}

function updateScore(score) {
    gGame.score += score
    document.querySelector('.score span').innerText = gGame.score
}

function updateFoodCount(foodEaten) {
    gGame.foodEaten += foodEaten
}

function gameOver(msg) {
    var alertAnswer = confirm(msg + '\n Do you want to play again?')
    clearInterval(gIntervalGhosts)
    clearInterval(gIntervalBunos)
    gGame.isOn = false
    if (alertAnswer) {
        init()
    }
}

function checkVictory() {
    if (gGame.foodEaten === gGame.foodOnBoard) {
        gameOver('You Win!')
    }
}