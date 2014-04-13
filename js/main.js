const BOARD_HEIGHT = 21;
const BOARD_WIDTH = 13;

var tickSpeed = 1000;
var gameTicker = false;
var pieceCounter = 1;

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

Piece.prototype.rotate = function() {
    this.orientation = (this.orientation + 1) % 4;
    this.structure = PIECE_TYPE[this.type][this.orientation];
};

Piece.prototype.draw = function(reallyDraw) {
    for (var j = 0; j < this.structure.length; j++) {
        for (var i = 0; i < this.structure[j].length; i++) {
            if (this.structure[j][i]) {
                if (reallyDraw) {
                    colorCell(this.x + i, this.y + j, PIECE_COLOR[this.type]);
                } else {
                    colorCell(this.x + i, this.y + j, PIECE_COLOR[0]);
                }
            }
        }
    }
};

Piece.prototype.move = function(direction) {
    this.draw(false);
    
    switch (direction) {
        case 1: // Left
            this.x--;
            break;
        case 2: // Right
            this.x++;
            break;
        default: // Down
            y++;
            break;
    }
    
    this.draw(true);
};
/*
 * END Piece
 */
 
function colorCell(x, y, color) {
    $($('#gameTable>tbody').children()[y].children[x]).css('background', color);
}

var currentColor = 0;
var currentOrientation = 0;
var currentPos = [];

// Board of cells [piece counter, piece color]
var gameBoard = [
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],
    [[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]]
];

var nextPieces = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
var nextPieceCounter = 0;

function permutePieces(pieces) {
    for (var i = pieces.length - 1; i >= 0; i--) {
        var rand = Math.floor(Math.random() * pieces.length);

        var temp = pieces[i];
        pieces[i] = pieces[rand];
        pieces[rand] = temp;
    };

    return pieces;
}

function colliding(pieceIdx, x, y, orientation) {
    var piece = PIECE_TYPE[pieceIdx];
    for (var j = 0; j < piece[orientation].length; j++) {
        for (var i = 0; i < piece[orientation][j].length; i++) {
            if (piece[orientation][j][i]) { // if this is part of the piece
                if (y + j < 0 || y + j >= BOARD_HEIGHT ||
                    x + i < 0 || x + i >= BOARD_WIDTH ||
                    gameBoard[y + j][x + i][0])
                    return true;
            }
        }
    }

    return false;
}

function drawPiece(pieceIdx, x, y, orientation) {
    var piece = PIECE_TYPE[pieceIdx];
    for (var j = 0; j < piece[orientation].length; j++) {
        for (var i = 0; i < piece[orientation][j].length; i++) {
            if (piece[orientation][j][i])
                colorCell(x + i, y + j, PIECE_COLOR[pieceIdx]);
        }
    }
}

function erasePiece(pieceIdx, x, y, orientation) {
    var piece = PIECE_TYPE[pieceIdx];
    for (var j = 0; j < piece[orientation].length; j++) {
        for (var i = 0; i < piece[orientation][j].length; i++) {
            if (piece[orientation][j][i])
                colorCell(x + i, y + j, PIECE_COLOR[0]);
        }
    }
}

function colorCell(x, y, color) {
    $($('#gameTable>tbody').children()[y].children[x]).css('background', color);
}

function gameTick() {
    //alert("111");
}

function clearBoard(clearGameState) {
    for (var j = 0; j < BOARD_HEIGHT; j++) {
        for (var i = 0; i < BOARD_WIDTH; i++) {
            if (clearGameState) gameBoard[j][i] = [0,0];
            colorCell(i, j, PIECE_COLOR[0]);
        }
    }
}

function startNewGame() {
    clearBoard(true);
    nextPieces = permutePieces(nextPieces);
    
    issueNextPiece();

    if (!gameTicker) {
        gameTicker = setInterval(gameTick, tickSpeed);
    }
}

function getFullLines() {
    var fullLines = [];

    for (var j = 0; j < BOARD_HEIGHT; j++) {
        var fullLine = true;

        for (var i = 0; i < BOARD_WIDTH; i++) {
            if (!gameBoard[j][i][0]) {
                fullLine = false;
                break;
            }
        }

        if (fullLine) {
            fullLines.push(j);
        }
    }

    return fullLines;
}

function clearLines(lines) {
    if (lines.length > 0) {
        lines.sort();

        lines.forEach(function(line) {
            for (var j = line - 1; j >= 0; j--) {
                for (var i = 0; i < BOARD_WIDTH; i++) {
                    gameBoard[j + 1][i] = gameBoard[j][i];
                }
            }
        });

        clearBoard(false);
        paintBoard();
    }
}

function paintBoard() {
    for (var j = 0; j < BOARD_HEIGHT; j++) {
        for (var i = 0; i < BOARD_WIDTH; i++) {
            colorCell(i, j, PIECE_COLOR[gameBoard[j][i][1]]);
        }
    }
}

function endGame() {
    clearInterval(gameTicker);
    gameTicker = false;

    clearBoard(true);
}

function movePieceLeft() {
    if (!colliding(currentColor, currentPos[0] - 1, currentPos[1], currentOrientation)) {
        erasePiece(currentColor, currentPos[0], currentPos[1], currentOrientation);

        currentPos = [currentPos[0] - 1, currentPos[1]];
        drawPiece(currentColor, currentPos[0], currentPos[1], currentOrientation);
    }
}

function movePieceRight() {
    if (!colliding(currentColor, currentPos[0] + 1, currentPos[1], currentOrientation)) {
        erasePiece(currentColor, currentPos[0], currentPos[1], currentOrientation);

        currentPos = [currentPos[0] + 1, currentPos[1]];
        drawPiece(currentColor, currentPos[0], currentPos[1], currentOrientation);
    }
}

function movePieceDown() {
    if (!colliding(currentColor, currentPos[0], currentPos[1] + 1, currentOrientation)) {
        erasePiece(currentColor, currentPos[0], currentPos[1], currentOrientation);

        currentPos = [currentPos[0], currentPos[1] + 1];
        drawPiece(currentColor, currentPos[0], currentPos[1], currentOrientation);
    } else { // Hit bottom
        putInGameBoard(pieceCounter, currentColor, currentPos[0], currentPos[1], currentOrientation);
        
        var fullLines = getFullLines();
        if (fullLines.length > 0) {
            clearLines(fullLines);
        }
        writeDebug();
        issueNextPiece();
    }
}

function rotatePiece() {
    var nextOrientation = (currentOrientation + 1) % 4;

    if (!colliding(currentColor, currentPos[0], currentPos[1], nextOrientation)) {
        erasePiece(currentColor, currentPos[0], currentPos[1], currentOrientation);

        currentOrientation = nextOrientation;
        drawPiece(currentColor, currentPos[0], currentPos[1], currentOrientation);
    }
}

function writeDebug() {
    $('#debug').html('');
    for (var j = 0; j < BOARD_HEIGHT; j++) {
        for (var i = 0; i < BOARD_WIDTH; i++) {
            var pieceStr = gameBoard[j][i][0];
            if (pieceStr < 10) pieceStr = "&nbsp;" + pieceStr;
            $('#debug').html($('#debug').html() + pieceStr + ' ')
        }

        $('#debug').html($('#debug').html() + '<br>');
    }
}

function issueNextPiece() {
    pieceCounter++;
    currentColor = nextPieces[nextPieceCounter];
    //here instead of random, do random bag
    currentColor = Math.floor(Math.random()*18) + 1;
    currentPos = PIECE_START_POS[currentColor];
    currentOrientation = 0;
    drawPiece(currentColor, PIECE_START_POS[currentColor][0], PIECE_START_POS[currentColor][1], currentOrientation);

    nextPieceCounter = (nextPieceCounter + 1) % 18;
}

function putInGameBoard(pieceCounter, pieceIdx, x, y, orientation) {
    var piece = PIECE_TYPE[pieceIdx];
    for (var j = 0; j < piece[orientation].length; j++) {
        for (var i = 0; i < piece[orientation][j].length; i++) {
            if (piece[orientation][j][i]) {
                gameBoard[y + j][x + i] = [pieceCounter, pieceIdx];
                
            }
        }
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
                rotatePiece();
                break;
            case 37: // LEFT
                movePieceLeft();
                break;
            case 40: // DOWN
                movePieceDown();
                break;
            case 39: // RIGHT
                movePieceRight();
                break;
            case 13: // ENTER
                startNewGame();
                break;
        }
        //$('#debug').html($('#debug').html() + ", " + event.keyCode);
        
    });
});
