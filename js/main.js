var BOARD_HEIGHT = 21;
var BOARD_WIDTH = 13;

var ACTION = {
    DOWN: 0,
    LEFT: 1,
    RIGHT: 2,
    ROTATE: 3
};

var tickSpeed = 1000;
var gameTicker = false;

var activePieces = [];
var nextPieces = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];

var currentPiece;

/*
 * Piece
 */
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

Piece.prototype.move = function(action) {
    if (!this.collides(action)) {
        this.draw(false);
        
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
        }
        
        this.draw(true);
    } else if (action == ACTION.DOWN) { // Hit something going down
        this.mark(true);
        this.store();
        
        var fullLines = getFullLines();
        if (fullLines.length > 0) {
            for (var i = 0; i < activePieces.length; i++) {
                activePieces[i].draw(false);
                activePieces[i].mark(false);
                activePieces[i].clearLines(fullLines);
            }
            
            for (var i = 0; i < activePieces.length; i++) {
                activePieces[i].draw(true);
                activePieces[i].mark(true);
            }
        }
        
        issueNewPiece();
        writeDebug();
    }
};

Piece.prototype.left = function() {
    this.move(ACTION.LEFT);
};
Piece.prototype.right = function() {
    this.move(ACTION.RIGHT);
};
Piece.prototype.down = function() {
    this.move(ACTION.DOWN);
};
Piece.prototype.rotate = function() {
    this.move(ACTION.ROTATE);
};

Piece.prototype.collides = function(action) {
    var testStructure = this.structure;
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
    }
    
    for (var j = 0; j < testStructure.length; j++) {
        for (var i = 0; i < testStructure[j].length; i++) {
            if (testStructure[j][i]) {
                if (testX + i < 0 || testX + i >= BOARD_WIDTH ||
                        testY + j >= BOARD_HEIGHT ||
                        cellMarked(testX + i, testY + j)) {
                    return true;
                }
            }
        }
    }
    
    return false;
};

Piece.prototype.clearLines = function(linesToClear) {
    var lines = clone(linesToClear);

    // Get lines relative to this.structure
    for (var l = 0; l < lines.length; l++) {
        lines[l] -= this.y;
    }
    
    for (var j = this.structure.length - 1; j >= 0; j--) {
        if ($.inArray(j, lines) > -1) {
            var newPieceStructure = this.structure.splice(j);
            
            if (newPieceStructure.length > 1) {
                // Remove the line that was cleared. This is now a new piece
                newPieceStructure.shift();
                
                activePieces.push(new Piece(this.x, this.y + j + 1, {'type' : this.type, 'structure' : newPieceStructure}));
            }
        }
    }
};
/*
 * END Piece
 */
 
// Clones a 1/2D array
function clone(arr) {
    var cloneArr = arr.slice(0);
    
    for (var i = 0; i < arr.length; i++) {
        if ($.isArray(arr[i])) {
            cloneArr[i] = clone(arr[i]);
        }
    }
    
    return cloneArr;
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

var cellTaken = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0]
];

function issueNewPiece() {
    var newPieceType = Math.floor(Math.random() * 18) + 1;
    currentPiece = new Piece(PIECE_START_POS[newPieceType][0], PIECE_START_POS[newPieceType][1],
                             {'type':newPieceType, 'orientation':0});
    currentPiece.draw(true);
}

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
    
    issueNewPiece();
    
    if (!gameTicker) {
        gameTicker = setInterval(gameTick, tickSpeed);
    }
}

function paintBoard() {
    for (var j = 0; j < BOARD_HEIGHT; j++) {
        for (var i = 0; i < BOARD_WIDTH; i++) {
            colorCell(i, j, PIECE_COLOR[gameBoard[j][i][1]]);
        }
    }
}

function clearBoard() {
    for (var j = 0; j < BOARD_HEIGHT; j++) {
        for (var i = 0; i < BOARD_WIDTH; i++) {
            markCell(i, j, false);
            colorCell(i, j, PIECE_COLOR[0]);
        }
    }
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
    
}

function endGame() {
    clearInterval(gameTicker);
    gameTicker = false;

    clearBoard(true);
}

function writeDebug() {
    $('#debug').html('');
    for (var j = 0; j < BOARD_HEIGHT; j++) {
        for (var i = 0; i < BOARD_WIDTH; i++) {
            var pieceStr = cellTaken[j][i] ? 1 : 0;
            $('#debug').html($('#debug').html() + pieceStr + '&nbsp;&nbsp;');
        }

        $('#debug').html($('#debug').html() + '<br>');
    }
}

$(function() {
    $('#startBtn').click(function() {
        startNewGame();
    });

    $('#endBtn').click(function() {
        endGame();
    });

    $('html').keydown(function(event) {
        switch (event.keyCode) {
            case 38: // UP
                currentPiece.rotate();
                break;
            case 37: // LEFT
                currentPiece.left();
                break;
            case 40: // DOWN
                currentPiece.down();
                break;
            case 39: // RIGHT
                currentPiece.right();
                break;
            case 13: // ENTER
                startNewGame();
                break;
        }
        //$('#debug').html($('#debug').html() + ", " + event.keyCode);
        
    });
});
