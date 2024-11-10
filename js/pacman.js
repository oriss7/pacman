'use strict'
const PACMAN = '😃'
// const PACMAN = '&#9786;'

var gPacman = null
var gTimeoutEatGhost

function createPacman(board) {
    gPacman = {
        location: {
            i: 5,
            j: 5
        },
        eatGhostMode: false,
        ghostsEaten: 0
    }
    gGame.foodOnBoard --
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function movePacman(ev) {
    if (!gGame.isOn) {
        return
    }
    var targetLoc = getNextLocation(ev)
    if (!targetLoc) {
        return
    }
    var targetCell = gBoard[targetLoc.i][targetLoc.j]
    if (targetCell === WALL) {
        return
    } else if (targetCell === FOOD) {
        updateFoodCount(1)
        updateScore(1)
    } else if (targetCell === CHERRY) {
        updateScore(10)
    } else if (targetCell === SUPERFOOD && !gPacman.eatGhostMode) {
        updateFoodCount(1)
        updateScore(3)
        gPacman.eatGhostMode = true
        for (var idx = 0; idx < gGhosts.length; idx++) {
            renderCell(gGhosts[idx].location, getGhostHTML(gGhosts[idx]))
        }
        gTimeoutEatGhost = setTimeout(finishEatGhostMode, 5000)
    } else if (targetCell === SUPERFOOD && gPacman.eatGhostMode) {
        return
    } else if (targetCell === GHOST && !gPacman.eatGhostMode) {
        gameOver('Game Over!')
        return
    } else if (targetCell === GHOST && gPacman.eatGhostMode) {
        var currGhostIdx = gGhosts.findIndex((ghost) => {
            return ghost.location.i === targetLoc.i && ghost.location.j === targetLoc.j
        })
        if (gGhosts[currGhostIdx].currCellContent === FOOD) {
            updateFoodCount(1)
            updateScore(1)
        } else if (gGhosts[currGhostIdx].currCellContent === SUPERFOOD) {
            return
        } else if (gGhosts[currGhostIdx].currCellContent === CHERRY) {
            updateScore(10)
        }
        updateScore(12)
        gPacman.ghostsEaten ++
        gGhosts.splice(currGhostIdx, 1)
    }
    gBoard[targetLoc.i][targetLoc.j] = PACMAN
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY

    renderCell(targetLoc, PACMAN)
    renderCell(gPacman.location, EMPTY)

    gPacman.location = targetLoc

    checkVictory()
}

function getNextLocation(ev) {
    var moveDiff = getPlayerMoveDiff(ev)
    if (!moveDiff) {
        return
    }
    return {
        i: gPacman.location.i + moveDiff.i ,
        j: gPacman.location.j + moveDiff.j
    }
}

function getPlayerMoveDiff(ev) {
    switch (ev.key) {
        case 'ArrowUp': 
            return {i: -1, j: 0}
        case 'ArrowDown': 
            return {i: 1, j: 0}
        case 'ArrowLeft': 
            return {i: 0, j: -1}
        case 'ArrowRight': 
            return {i: 0, j: 1}
    }
}