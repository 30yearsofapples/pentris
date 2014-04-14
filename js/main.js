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
function Piece(x, y, type, orientation) {
    this.x = x;
    this.y = y;
    this.type = type;
    this.orientation = orientation;
    this.structure = PIECE_TYPE[type][orientation];
}

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

Piece.prototype.mark = function(reallyMark) {
    for (var j = 0; j < this.structure.length; j++) {
        for (var i = 0; i < this.structure[j].length; i++) {
            if (this.structure[j][i]) {
                markCell(this.x + i, this.y + j, reallyMark);
            }
        }
    }
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
                this.structure = PIECE_TYPE[this.type][this.orientation];
                break;
        }
        
        this.draw(true);
    } else if (action == ACTION.DOWN) {
        this.mark(true);
        issueNewPiece();
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
            testStructure = PIECE_TYPE[this.type][(this.orientation + 1) % 4];
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

Piece.prototype.clearLine = function(lines) {
    for (var l = 0; l < lines.length; l++) {
        if (lines[l] >= this.y && lines[l] <= this.y + this.structure.length) {
            for (var i = 0; i < this.structure[lines[l] - this.y].length; i++) {
                this.structure[lines[l] - this.y][i] = 0;
            }
        }
    }
}
/*
 * END Piece
 */

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
    currentPiece = new Piece(PIECE_START_POS[newPieceType][0], PIECE_START_POS[newPieceType][1], newPieceType, 0);
    currentPiece.draw(true);
}

function getFullLines() {
    var fullLines = [];
    
    for (var j = 0; j < BOARD_HEIGHT; j++) {
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
            var pieceStr = gameBoard[j][i][0];
            if (pieceStr < 10) pieceStr = "&nbsp;" + pieceStr;
            $('#debug').html($('#debug').html() + pieceStr + ' ');
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
