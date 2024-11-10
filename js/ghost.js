'use strict'
const GHOST = '&#9781;';

var gGhosts = []
var gIntervalGhosts

function createGhost(board) {
    var ghost = {
        location: {
            i: 3,
            j: 3
        },
        currCellContent: '',
        color: randomColor()
    }
    gGhosts.push(ghost)
    board[ghost.location.i][ghost.location.j] = getGhostHTML(ghost)
}

function createGhosts(board) {
    gGhosts = []
    for (var i = 0; i < 3; i++) {
        createGhost(board)
    }
    gGame.foodOnBoard --
}

function moveGhosts() {
    for (var idx = 0; idx < gGhosts.length; idx++) {
        var ghost = gGhosts[idx]
        var moveDiff = getMoveDiff()
        var targetLoc = {
            i: ghost.location.i + moveDiff.i,
            j: ghost.location.j + moveDiff.j
        }
        var targetCell = gBoard[targetLoc.i][targetLoc.j]
        if (targetCell === WALL) continue
        if (targetCell === GHOST) continue
        if (targetCell === PACMAN) {
            gameOver('Game Over!')
            return
        }
        gBoard[ghost.location.i][ghost.location.j] = ghost.currCellContent
        gBoard[targetLoc.i][targetLoc.j] = GHOST

        renderCell(targetLoc, getGhostHTML(ghost))
        renderCell(ghost.location, ghost.currCellContent)

        ghost.location = targetLoc
        ghost.currCellContent = targetCell
    }
}

function getMoveDiff() {
    var randNum = getRandomIntInclusive(1, 4)
    switch (randNum) {
        case 1: 
            return {i: -1, j: 0}
        case 2: 
            return {i: 1, j: 0}
        case 3: 
            return {i: 0, j: -1}
        case 4: 
            return {i: 0, j: 1}
    }
}

function randomColor() {
    var colors = ['red', 'green', 'yellow', 'turquoise', 'brown']
    var randColor = getRandomIntInclusive(1, colors.length-1)
    return colors[randColor]
}
// ,
function getGhostHTML(ghost) {
    if (!gPacman.eatGhostMode) {
        return `<span style="background-color:${ghost.color}">${GHOST}</span>`
    } else {
        return `<span style="background-color:blue">${GHOST}</span>`
    }
}