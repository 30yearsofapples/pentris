//$(function() {

var BOARD_HEIGHT = 21;
var BOARD_WIDTH = 13;
var DOWN_SPEED = 70;
var SIDE_SPEED = 100;
var CLEAR_LINE_DELAY = 200;
var DROP_DELAY = 200;

var tickSpeed = 500;
var gameActive = false;

var ACTION = {
    DOWN: 0,
    LEFT: 1,
    RIGHT: 2,
    ROTATE: 3,
    DROP: 4
};

var score = 0;

var linesClearedTransaction = 0;

var activePieces = [];
var holdPiece;
var holdOkay = true;

var gameStarted = false;

var nextPieces = permutePieces([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
var nextNextPieces = permutePieces([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);

var cellTaken = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

var currentPiece;

// Clones an array
function clone(arr) {
    var cloneArr = arr.slice(0);

    for (var i = 0; i < arr.length; i++) {
        if ($.isArray(arr[i])) {
            cloneArr[i] = clone(arr[i]);
        }
    }

    return cloneArr;
}

/*
** BEGIN Piece
**/
// Piece constructor.
// args is either {'type' : t, 'structure' : [...]} or {'type' : t, 'orientation' : o}
function Piece(x, y, args) {
    this.x = x;
    this.y = y;

    if (args.structure) {
        this.type = args.type;
        this.structure = clone(args.structure);
    } else {
        this.orientation = args.orientation;
        this.type = args.type;
        this.structure = clone(PIECE_TYPE[this.type][this.orientation]);
    }
}

// Draw the piece in the DOM
Piece.prototype.draw = function(reallyDraw) {
    for (var j = 0; j < this.structure.length; j++) {
        for (var i = 0; i < this.structure[j].length; i++) {
            if (this.structure[j][i]) {
                var color = reallyDraw ? PIECE_COLOR[this.type] : PIECE_COLOR[0];

                colorCell(this.x + i, this.y + j, color);
            }
        }
    }
};

// Draw the piece in the next pieces
Piece.prototype.drawNextPiece = function(num, reallyDraw) {
    for (var j = 0; j < this.structure.length; j++) {
        for (var i = 0; i < this.structure[j].length; i++) {
            if (this.structure[j][i]) {
                var color = reallyDraw ? PIECE_COLOR[this.type] : PIECE_COLOR[0];

                colorCellNextPiece(num, this.x + i, this.y + j, color);
            }
        }
    }
};

// Draw the piece in the hold piece
Piece.prototype.drawHoldPiece = function(reallyDraw) {
    for (var j = 0; j < this.structure.length; j++) {
        for (var i = 0; i < this.structure[j].length; i++) {
            if (this.structure[j][i]) {
                var color = reallyDraw ? PIECE_COLOR[this.type] : PIECE_COLOR[0];

                colorCellHoldPiece(this.x + i, this.y + j, color);
            }
        }
    }
};

// Mark on cellTaken 2D array for collision detection
Piece.prototype.mark = function(reallyMark) {
    for (var j = 0; j < this.structure.length; j++) {
        for (var i = 0; i < this.structure[j].length; i++) {
            if (this.structure[j][i]) {
                markCell(this.x + i, this.y + j, reallyMark);
            }
        }
    }
};

// Store piece in activePieces
Piece.prototype.store = function() {
    activePieces.push(this);
};

// Performs an action
Piece.prototype.move = function(action) {
    this.draw(false);
    if (!this.collides(action)) {
        switch (action) {
            case ACTION.DOWN:
                this.y++;
                break;
            case ACTION.LEFT:
                this.x--;
                break;
            case ACTION.RIGHT:
                this.x++;
                break;
            case ACTION.ROTATE:
                this.orientation = (this.orientation + 1) % 4;
                this.structure = clone(PIECE_TYPE[this.type][this.orientation]);
                break;
            case ACTION.DROP:
                this.mark(false);
                this.y++;
                break;
        }

        this.draw(true);

        return 1;
    } else { // Collides
        this.draw(true);
        if (action == ACTION.DOWN) { // Hit something moving down
            this.mark(true);
            this.store();

            checkAndClear(true);

            return 2;
        } else if (action == ACTION.DROP) { // Hit something going down as a result of a cleared line
            this.mark(true);
            return 0;
        }
    }
};

Piece.prototype.down = function() {
    return this.move(ACTION.DOWN);
};
Piece.prototype.left = function() {
    return this.move(ACTION.LEFT);
};
Piece.prototype.right = function() {
    return this.move(ACTION.RIGHT);
};
Piece.prototype.rotate = function() {
    return this.move(ACTION.ROTATE);
};
Piece.prototype.drop = function() {
    return this.move(ACTION.DROP);
};

// Returns true if performing an action would result in a collision
Piece.prototype.collides = function(action) {
    var willCollide = false;

    var testStructure = clone(this.structure);
    var testX = this.x;
    var testY = this.y;

    switch (action) {
        case ACTION.DOWN:
            testY++;
            break;
        case ACTION.LEFT:
            testX--;
            break;
        case ACTION.RIGHT:
            testX++;
            break;
        case ACTION.ROTATE:
            testStructure = clone(PIECE_TYPE[this.type][(this.orientation + 1) % 4]);
            break;
        case ACTION.DROP:
            testY++;
            this.mark(false);
            break;
    }

    willCollide = this.collidesHelper(testX, testY, testStructure, action);

    if (action == ACTION.DROP) {
        this.mark(true);
    }

    return willCollide;
};

Piece.prototype.collidesHelper = function(testX, testY, testStructure, action) {
    for (var j = 0; j < testStructure.length; j++) {
        for (var i = 0; i < testStructure[j].length; i++) {
            if (testStructure[j][i]) {
                if (testX + i < 0 || testX + i >= BOARD_WIDTH ||
                        testY + j >= BOARD_HEIGHT ||
                        cellMarked(testX + i, testY + j)) {
                    if (action == ACTION.ROTATE) {
                        // Rotate on the side pushes off
                        if (testX + i < 0) {
                            if (!this.collidesHelper(testX + 1, testY, testStructure, action)) {
                                this.x++;
                                return false;
                            } else {
                                return true;
                            }
                        } else if (testX + i >= BOARD_WIDTH) {
                            if (!this.collidesHelper(testX - 1, testY, testStructure, action)) {
                                this.x--;
                                return false;
                            } else {
                                return true;
                            }
                        } else {
                            return true;
                        }
                    } else {
                        return true;
                    }
                }
            }
        }
    }
    
    return false;
};

// Clear lines. Argument is in terms of the game grid. Returns true if cleared lines
Piece.prototype.clearLines = function(linesToClear) {
    var lines = clone(linesToClear);
    var clearedLines = 0;

    // Get lines relative to this.structure
    for (var l = 0; l < lines.length; l++) {
        lines[l] -= this.y;
    }

    for (var j = this.structure.length - 1; j >= 0; j--) {
        if ($.inArray(j, lines) > -1) {
            clearedLines = 1;
            var newPieceStructure = this.structure.splice(j);

            // Handle C case
            if (this.structure.length == 1 &&
                    this.structure[0].length == 3 &&
                    this.structure[0][0] == 1 &&
                    this.structure[0][1] === 0 &&
                    this.structure[0][2] == 1) {
                this.structure[0] = [1];

                activePieces.push(new Piece(this.x + 2, this.y, {'type' : this.type, 'structure' : [[1]]}));
            }

            if (newPieceStructure.length > 1) {
                // Remove the line that was cleared. This is now a new piece
                newPieceStructure.shift();

                // Handle C case
                if (newPieceStructure.length == 1 &&
                        newPieceStructure[0].length == 3 &&
                        newPieceStructure[0][0] == 1 &&
                        newPieceStructure[0][1] === 0 &&
                        newPieceStructure[0][2] == 1) {
                    activePieces.push(new Piece(this.x, this.y + j + 1, {'type' : this.type, 'structure' : [[1]]}));
                    activePieces.push(new Piece(this.x + 2, this.y + j + 1, {'type' : this.type, 'structure' : [[1]]}));
                } else {
                    activePieces.push(new Piece(this.x, this.y + j + 1, {'type' : this.type, 'structure' : newPieceStructure}));
                }
            }
        }
    }

    return clearedLines;
};

// Returns whether structure is essentially empty
Piece.prototype.isEmpty = function() {
    if (!this.structure.length) { // Empty structure
        return true;
    } else { // Non-empty structure. Checking for all false cells
        for (var j = 0; j < this.structure.length; j++) {
            for (var i = 0; i < this.structure[j].length; i++) {
                if (this.structure[j][i]) {
                    return false;
                }
            }
        }

        return true;
    }
};
/*
** END Piece
**/

// Check the game grid for full lines and clear them
function checkAndClear(delay) {
    var fullLines = getFullLines();
    
    if (fullLines.length > 0) {
        linesClearedTransaction += fullLines.length;
        
        pause(false);
        if (delay) {
            setTimeout(function(){checkAndClearHelper(fullLines, delay)}, CLEAR_LINE_DELAY);
        } else {
            checkAndClearHelper(fullLines, delay);
        }
    } else {
        checkAndClearHelper(fullLines, delay);
    }
}

// Clear lines and draw the pieces
function checkAndClearHelper(fullLines, delay) {
    for (var i = 0; i < activePieces.length; i++) {
        activePieces[i].draw(false);
        activePieces[i].mark(false);
        activePieces[i].clearLines(fullLines);
    }

    // There may be new active pieces, do this in a separate loop
    for (i = 0; i < activePieces.length; i++) {
        activePieces[i].draw(true);
        activePieces[i].mark(true);
    }
    
    if (fullLines.length > 0) {
        setTimeout(function(){dropPieces()}, DROP_DELAY);
    } else {
        issueNewPiece(0);
        unpause(false);
    }
}

// Drop all pieces until they all hit the bottom
function dropPieces() {
    var somethingHappened = false;

    removeEmptyPieces();

    for (var p = 0; p < activePieces.length; p++) {
        if (activePieces[p].drop()) {
            somethingHappened = true;
        }
    }
    
    if (somethingHappened) {
        setTimeout(function(){dropPieces()}, DROP_DELAY);
    } else {
        checkAndClear(false);
    }
}

// Updates score
function updateScore(score) {
    $('#score').html('SCORE: ' + score);
}

// Removes the pieces from activePieces that have an empty structure
function removeEmptyPieces() {
    var removedPiece = false
    for (var i = activePieces.length - 1; i >= 0; i--) {
        if (activePieces[i].isEmpty()) {
            activePieces.splice(i, 1);

            removedPiece = true;
        }
    }

    return removedPiece;
}

function cellMarked(x, y) {
    return cellTaken[y][x];
}

function markCell(x, y, reallyMark) {
    cellTaken[y][x] = reallyMark;
}

function colorCell(x, y, color) {
    $($('#gameTable>tbody').children()[y].children[x]).css('background', color);
}

function colorCellNextPiece(num, x, y, color) {
    $($('#nextPiece' + num).children()[y].children[x]).css('background', color);
}

function colorCellHoldPiece(x, y, color) {
    $($('#holdPiece').children()[y].children[x]).css('background', color);
}

// Issues a new piece.
// If pieceType is 0, you get the true next piece
// If pieceType is -1, you get the true next piece, but is coming from a hold command
function issueNewPiece(pieceType) {
    score += linesClearedTransaction * linesClearedTransaction * 10;
    updateScore(score);
    linesClearedTransaction = 0;
    
    var newPieceType;
    if (pieceType === 0) {
        newPieceType = getNextPiece();
        holdOkay = true;
    } else if (pieceType == -1) {
        newPieceType = getNextPiece();
    } else {
        newPieceType = pieceType;
    }

    var nextPieceTypes = getPreviewPieces();
    
    clearPreview();
    var previewPiece;
    for (var p = 0; p < nextPieceTypes.length; p++) {
        previewPiece = new Piece(PIECE_PREVIEW_POS[nextPieceTypes[p]][0], PIECE_PREVIEW_POS[nextPieceTypes[p]][1],
                                 {'type':nextPieceTypes[p], 'orientation':0});
        previewPiece.drawNextPiece(p, true);
    }

    currentPiece = new Piece(PIECE_START_POS[newPieceType][0], PIECE_START_POS[newPieceType][1],
                             {'type':newPieceType, 'orientation':0});
    currentPiece.draw(true);
    
    // Check for game over
    var testPiece = new Piece(PIECE_START_POS[newPieceType][0], PIECE_START_POS[newPieceType][1] - 1,
                              {'type':newPieceType, 'orientation':0});
    
    if (testPiece.collides(ACTION.DOWN)) {
        endGame();
    }
}

function endGame() {
    clearInterval(gameActive);
    gameActive = false;
    gameStarted = false;
    
    $('#gameOverlay').html('<span id="gameOverSpan">GAME OVER</span>');
    $('#gameOverlay').css('background', 'rgba(238, 238, 238, 0.4)');
}

// Swaps current piece with hold piece
function hold() {
    if (holdOkay) {
        holdOkay = false;
        
        currentPiece.draw(false);
        
        if (holdPiece) {
            var holdPieceType = holdPiece.type;
            
            holdPiece.drawHoldPiece(false);
            
            holdPiece = new Piece(PIECE_PREVIEW_POS[currentPiece.type][0], PIECE_PREVIEW_POS[currentPiece.type][1],
                                  {'type':currentPiece.type, 'orientation':0});
            
            currentPiece = new Piece(PIECE_START_POS[holdPieceType][0], PIECE_START_POS[holdPieceType][1],
                                     {'type':holdPieceType, 'orientation':0});
            currentPiece.draw(true);
        } else {
            holdPiece = new Piece(PIECE_PREVIEW_POS[currentPiece.type][0], PIECE_PREVIEW_POS[currentPiece.type][1],
                                  {'type':currentPiece.type, 'orientation':0});
            
            issueNewPiece(-1);
        }
        
        
        holdPiece.drawHoldPiece(true);
    }
}

function clearPreview() {
    $('.nextPiece td').css('background', 'transparent');
}

// Returns the next piece and updates the nextPieces list
function getNextPiece() {
    var nextPiece = nextPieces.shift();
    
    if (nextPieces.length === 0) {
        nextPieces = nextNextPieces;
        nextNextPieces = permutePieces([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    }
    
    return nextPiece;
}

// Returns the next five pieces. Does not change the nextPieces list
function getPreviewPieces() {
    if (nextPieces.length >= 5) {
        return nextPieces.slice(0, 5);
    } else {
        return nextPieces.slice(0).concat(nextNextPieces.slice(0, 5 - nextPieces.length));
    }
}

// Get the lines that are completely filled
function getFullLines() {
    var fullLines = [];

    for (var j = BOARD_HEIGHT - 1; j >= 0; j--) {
        var isFull = true;
        for (var i = 0; i < BOARD_WIDTH; i++) {
            if (!cellMarked(i, j)) {
                isFull = false;
                break;
            }
        }

        if (isFull) {
            fullLines.push(j);
        }
    }

    return fullLines;
}

function startNewGame() {
    clearBoard(true);
    
    gameStarted = true;
    
    holdOkay = true;
    if (holdPiece) {
        holdPiece.drawHoldPiece(false);
        holdPiece = undefined;
    }
    
    $('#gameOverlay').html('');
    $('#gameOverlay').css('background', 'transparent');
    
    linesClearedTransaction = 0;
    score = 0;
    updateScore(0);

    nextPieces = permutePieces([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    nextNextPieces = permutePieces([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    
    issueNewPiece(0);

    if (!gameActive) {
        gameActive = setInterval(gameTick, tickSpeed);
    }
}

function clearBoard() {
    for (var j = 0; j < BOARD_HEIGHT; j++) {
        for (var i = 0; i < BOARD_WIDTH; i++) {
            markCell(i, j, false);
            colorCell(i, j, PIECE_COLOR[0]);
        }
    }

    activePieces = [];
}

function permutePieces(pieces) {
    for (var i = pieces.length - 1; i >= 0; i--) {
        var rand = Math.floor(Math.random() * pieces.length);

        var temp = pieces[i];
        pieces[i] = pieces[rand];
        pieces[rand] = temp;
    }

    return pieces;
}

function gameTick() {
    currentPiece.down();
}

function togglePause(displayOverlay) {
    if (gameActive) {
        pause(displayOverlay)
    } else {
        unpause(displayOverlay)
    }   
}

function pause(displayOverlay) {
    if (gameActive) {
        clearInterval(gameActive);
        gameActive = false;
        if (displayOverlay) {
            $('#gameOverlay').html('PAUSED');
            $('#gameOverlay').css('background', '#eee');
        }
    }
}

function unpause(displayOverlay) {
    if (!gameActive) {
        if (gameStarted) {
            gameActive = setInterval(gameTick, tickSpeed);
            if (displayOverlay) {
                $('#gameOverlay').html('');
                $('#gameOverlay').css('background', 'transparent');
            }
        }
    }
}

var leftInterval = 0;
var rightInterval = 0;
var downInterval = 0;
$('html').keydown(function(event) {
    switch (event.keyCode) {
        case 38: // UP
            if (gameActive) {
                currentPiece.rotate();
            }
            break;
        case 37: // LEFT
            if (gameActive) {
                if (!leftInterval) {
                    currentPiece.left();
                    leftInterval = setInterval(function() { currentPiece.left(); }, SIDE_SPEED);
                }
            }
            break;
        case 39: // RIGHT
            if (gameActive) {
                if (!rightInterval) {
                    currentPiece.right();
                    rightInterval = setInterval(function() { currentPiece.right(); }, SIDE_SPEED);
                }
            }
            break;
        case 40: // DOWN
            if (gameActive) {
                if (!downInterval) {
                    currentPiece.down();
                    downInterval = setInterval(function() { currentPiece.down(); }, DOWN_SPEED);
                }
            }
            break;
        case 32: // SPACE
            if (gameActive) {
                while (currentPiece.down() != 2) {}
            }
            break;
        case 67: // C
            if (gameActive) {
                hold();
            }
            break;
        case 80: // P
            togglePause(true);
            break;
        case 13: // ENTER
            startNewGame();
            break;
    }
});
$('html').keyup(function(event) {
    switch (event.keyCode) {
        case 37: // LEFT
            clearInterval(leftInterval);
            leftInterval = 0;
            break;
        case 39: // RIGHT
            clearInterval(rightInterval);
            rightInterval = 0;
            break;
        case 40: // DOWN
            clearInterval(downInterval);
            downInterval = 0;
            break;
    }
});

//});