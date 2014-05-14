$(function () {

/*
Piece indices. 0: no piece

1:I    2:J    3:L    4:C    5:B
xxxxx  xxxx      x   xxx    xxx    
          x   xxxx   x x    xx

6:D    7:S    8:Z    9:X    10:E
xxx    x        x     x       x
 xx    xxx    xxx    xxx    xxx
         x    x       x      x

11:F   12:T   13:N   14:O   15:A
x      xxx    xxx    xxxx   xxxx
xxx     x     x       x       x
 x      x     x

16:Q   17:P   18:K
 xxx   xxx    xx
xx       xx    xx
                x

*/

var PIECE_I = [
    [
        [0],
        [0],
        [1, 1, 1, 1, 1]
    ],
    [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1]
    ],
    [
        [0],
        [0],
        [1, 1, 1, 1, 1]
    ],
    [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1]
    ]
];

var PIECE_J = [
    [
        [0],
        [0],
        [1, 1, 1, 1],
        [0, 0, 0, 1]
    ],
    [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 1, 1]
    ],
    [
        [0],
        [0, 1],
        [0, 1, 1, 1, 1]
    ],
    [
        [0],
        [0, 0, 1, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1]
    ]
];

var PIECE_L = [
    [
        [0],
        [0],
        [0, 1, 1, 1, 1],
        [0, 1, 0, 0, 0]
    ],
    [
        [0],
        [0, 1, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1]
    ],
    [
        [0],
        [0, 0, 0, 1],
        [1, 1, 1, 1]
    ],
    [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1, 1]
    ]
];

var PIECE_C = [
    [
        [0],
        [1, 1, 1],
        [1, 0, 1]
    ],
    [
        [1, 1],
        [0, 1],
        [1, 1]
    ],
    [
        [1, 0, 1],
        [1, 1, 1]
    ],
    [
        [0, 1, 1],
        [0, 1],
        [0, 1, 1]
    ]
];

var PIECE_B = [
    [
        [0],
        [1, 1, 1],
        [1, 1]
    ],
    [
        [1, 1],
        [1, 1],
        [0, 1]
    ],
    [
        [0, 1, 1],
        [1, 1, 1]
    ],
    [
        [0, 1],
        [0, 1, 1],
        [0, 1, 1]
    ]
];

var PIECE_D = [
    [
        [0],
        [1, 1, 1],
        [0, 1, 1]
    ],
    [
        [0, 1],
        [1, 1],
        [1, 1]
    ],
    [
        [1, 1],
        [1, 1, 1]
    ],
    [
        [0, 1, 1],
        [0, 1, 1],
        [0, 1]
    ]
];

var PIECE_S = [
    [
        [1],
        [1, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 1, 1],
        [0, 1],
        [1, 1]
    ],
    [
        [1],
        [1, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 1, 1],
        [0, 1],
        [1, 1]
    ]
];

var PIECE_Z = [
    [
        [0, 0, 1],
        [1, 1, 1],
        [1]
    ],
    [
        [1, 1],
        [0, 1],
        [0, 1, 1]
    ],
    [
        [0, 0, 1],
        [1, 1, 1],
        [1]
    ],
    [
        [1, 1],
        [0, 1],
        [0, 1, 1]
    ]
];

var PIECE_X = [
    [
        [0, 1],
        [1, 1, 1],
        [0, 1]
    ],
    [
        [0, 1],
        [1, 1, 1],
        [0, 1]
    ],
    [
        [0, 1],
        [1, 1, 1],
        [0, 1]
    ],
    [
        [0, 1],
        [1, 1, 1],
        [0, 1]
    ]
];

var PIECE_E = [
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 1]
    ],
    [
        [0, 1],
        [1, 1],
        [0, 1, 1]
    ],
    [
        [0, 1],
        [1, 1, 1],
        [1]
    ],
    [
        [1, 1],
        [0, 1, 1],
        [0, 1]
    ]
];

var PIECE_F = [
    [
        [1],
        [1, 1, 1],
        [0, 1]
    ],
    [
        [0, 1, 1],
        [1, 1],
        [0, 1]
    ],
    [
        [0, 1],
        [1, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 1],
        [0, 1, 1],
        [1, 1]
    ]
];

var PIECE_T = [
    [
        [1, 1, 1],
        [0, 1],
        [0, 1]
    ],
    [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 1],
        [0, 1],
        [1, 1, 1]
    ],
    [
        [1],
        [1, 1, 1],
        [1]
    ]
];

var PIECE_N = [
    [
        [1, 1, 1],
        [1],
        [1]
    ],
    [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
    ],
    [
        [0, 0, 1],
        [0, 0, 1],
        [1, 1, 1]
    ],
    [
        [1],
        [1],
        [1, 1, 1]
    ]
];

var PIECE_O = [
    [
        [0],
        [0],
        [0, 1, 1, 1, 1],
        [0, 0, 1]
    ],
    [
        [0],
        [0, 0, 1],
        [0, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
    ],
    [
        [0],
        [0, 0, 1],
        [1, 1, 1, 1]
    ],
    [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1, 1],
        [0, 0, 1]
    ]
];

var PIECE_A = [
    [
        [0],
        [0],
        [1, 1, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 0, 1],
        [0, 0, 1],
        [0, 1, 1],
        [0, 0, 1]
    ],
    [
        [0],
        [0, 0, 1],
        [0, 1, 1, 1, 1]
    ],
    [
        [0],
        [0, 0, 1],
        [0, 0, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
    ]
];

var PIECE_Q = [
    [
        [0],
        [0],
        [0, 0, 1, 1, 1],
        [0, 1, 1]
    ],
    [
        [0],
        [0, 1],
        [0, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
    ],
    [
        [0],
        [0, 0, 1, 1],
        [1, 1, 1]
    ],
    [
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1, 1],
        [0, 0, 0, 1]
    ]
];

var PIECE_P = [
    [
        [0],
        [0],
        [1, 1, 1],
        [0, 0, 1, 1]
    ],
    [
        [0, 0, 1],
        [0, 0, 1],
        [0, 1, 1],
        [0, 1]
    ],
    [
        [0],
        [0, 1, 1],
        [0, 0, 1, 1, 1]
    ],
    [
        [0],
        [0, 0, 0, 1],
        [0, 0, 1, 1],
        [0, 0, 1],
        [0, 0, 1]
    ]
];

var PIECE_K = [
    [
        [1, 1],
        [0, 1, 1],
        [0, 0, 1]
    ],
    [
        [0, 0, 1],
        [0, 1, 1],
        [1, 1]
    ],
    [
        [1],
        [1, 1],
        [0, 1, 1]
    ],
    [
        [0, 1, 1],
        [1, 1],
        [1]
    ]
];

// The position for the piece when in comes into play
var PIECE_START_POS = [
    null,
    [4, 0],    //  1:I
    [4, 0],    //  2:J
    [4, 0],    //  3:L
    [5, 1],    //  4:C
    [5, 1],    //  5:B
    [5, 1],    //  6:D
    [5, 2],    //  7:S
    [5, 2],    //  8:Z
    [5, 2],    //  9:X
    [5, 2],    // 10:E
    [5, 2],    // 11:F
    [5, 2],    // 12:T
    [5, 2],    // 13:N
    [4, 0],    // 14:O
    [4, 0],    // 15:A
    [4, 0],    // 16:Q
    [4, 0],    // 17:P
    [5, 2]     // 18:K
];

// The position of the piece of a preview or hold grid
var PIECE_PREVIEW_POS = [
    null,
    [0, -1],   //  1:I
    [0, -1],   //  2:J
    [0, -1],   //  3:L
    [1, 0],    //  4:C
    [1, 0],    //  5:B
    [1, 0],    //  6:D
    [1, 0],    //  7:S
    [1, 0],    //  8:Z
    [1, 0],    //  9:X
    [1, 0],    // 10:E
    [1, 0],    // 11:F
    [1, 0],    // 12:T
    [1, 0],    // 13:N
    [0, -1],   // 14:O
    [0, -1],   // 15:A
    [0, -1],   // 16:Q
    [0, -1],   // 17:P
    [1, 0]     // 18:K
];

var PIECE_COLOR = [
    'transparent',
    '#CC568E', //  1:I
    '#77DA48', //  2:J
    '#83CBC7', //  3:L
    '#C38536', //  4:C
    '#8277D8', //  5:B
    '#483523', //  6:D
    '#DA4A39', //  7:S
    '#CDAB90', //  8:Z
    '#D3CF50', //  9:X
    '#CB51CE', // 10:E
    '#83D693', // 11:F
    '#ABA7CE', // 12:T
    '#4C6770', // 13:N
    '#679337', // 14:O
    '#582C4B', // 15:A
    '#9A433E', // 16:Q
    '#536A3D', // 17:P
    '#5B4C88'  // 18:K
];

// Mapping of piece index -> piece
var PIECE_TYPE = [
    null,
    PIECE_I, PIECE_J, PIECE_L, PIECE_C, PIECE_B,
    PIECE_D, PIECE_S, PIECE_Z, PIECE_X, PIECE_E,
    PIECE_F, PIECE_T, PIECE_N, PIECE_O, PIECE_A,
    PIECE_Q, PIECE_P, PIECE_K
];

var BOARD_HEIGHT = 21;
var BOARD_WIDTH = 13;
var DOWN_SPEED = 70;
var SIDE_SPEED = 100;
var CLEAR_LINE_DELAY = 200;
var DROP_DELAY = 200;

var ACTION = {
    DOWN: 0,
    LEFT: 1,
    RIGHT: 2,
    ROTATE: 3,
    DROP: 4 // When a piece falls down after a line clear
};

var ENCOURAGEMENT_TEXT = [
    '',
    '', // No encouragement for one line cleared
    'COOL',
    'GREAT!',
    'WOW',
    'SUCH LINES',
    'VERY SKILL',
    'UNBELIEVABLE!'
];

var tickSpeed = 500; // How often the piece drops

var score = 0;

var linesClearedTransaction = 0; // Lines cleared from one piece placement

var holdOkay = true;

var holdPiece; // Piece that the player is holding
var currentPiece; // Piece that the player is controlling
var ghostPiece; // Preview of where the piece will drop

var nextPieces = permutePieces([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
var nextNextPieces = permutePieces([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);

var activePieces = []; // Pieces that have been placed down

// 2D grid representing whether each cell is taken by a piece or not
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

var gameActive = false; // Whether the game is active (as opposed to paused)
var gameStarted = false; // Whether the game has started

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

// Draw the piece in the game board
Piece.prototype.draw = function (reallyDraw) {
    for (var j = 0; j < this.structure.length; j++) {
        for (var i = 0; i < this.structure[j].length; i++) {
            if (this.structure[j][i]) {
                var color = reallyDraw ? PIECE_COLOR[this.type] : PIECE_COLOR[0];
                
                if (this.isGhost) {
                    if (reallyDraw) {
                        cellOpacity(this.x + i, this.y + j, 0.2);
                    } else {
                        cellOpacity(this.x + i, this.y + j, 1);
                    }
                } else {
                    cellOpacity(this.x + i, this.y + j, 1);
                }

                colorCell(this.x + i, this.y + j, color);
            }
        }
    }
};

// Draw the piece in the next pieces grids
Piece.prototype.drawNextPiece = function (num, reallyDraw) {
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
Piece.prototype.drawHoldPiece = function (reallyDraw) {
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
Piece.prototype.markTaken = function (reallyMark) {
    for (var j = 0; j < this.structure.length; j++) {
        for (var i = 0; i < this.structure[j].length; i++) {
            if (this.structure[j][i]) {
                markCell(this.x + i, this.y + j, reallyMark);
            }
        }
    }
};

// Store piece in activePieces
Piece.prototype.store = function () {
    activePieces.push(this);
};

// Performs an action
Piece.prototype.move = function (action) {
    if (action != ACTION.DROP) {
        ghostPiece.draw(false);
    }
    this.draw(false);
    if (!this.collides(action)) {
        switch (action) {
            case ACTION.DOWN:
                this.y++;
                break;
            case ACTION.LEFT:
                this.x--;
                this.updateGhostPosition();
                break;
            case ACTION.RIGHT:
                this.x++;
                this.updateGhostPosition();
                break;
            case ACTION.ROTATE:
                this.orientation = (this.orientation + 1) % 4;
                this.structure = clone(PIECE_TYPE[this.type][this.orientation]);
                ghostPiece.orientation = this.orientation;
                ghostPiece.structure = clone(this.structure);
                this.updateGhostPosition();
                break;
            case ACTION.DROP:
                this.markTaken(false);
                this.y++;
                break;
        }

        if (action != ACTION.DROP) {
            ghostPiece.draw(true);
        }
        this.draw(true);

        return 1;
    } else { // Collides
        if (action != ACTION.DROP) {
            ghostPiece.draw(true);
        }
        this.draw(true);
        if (action == ACTION.DOWN) { // Hit something moving down
            this.markTaken(true);
            this.store();
            
            // Fix bug with going down while lines are being cleared
            clearInterval(downInterval);
            downInterval = 0;
            
            checkAndClear(true);
            
            return 2;
        } else if (action == ACTION.DROP) { // Hit something going down as a result of a cleared line
            this.markTaken(true);
            return 0;
        }
    }
};

Piece.prototype.down = function () {
    return this.move(ACTION.DOWN);
};
Piece.prototype.left = function () {
    return this.move(ACTION.LEFT);
};
Piece.prototype.right = function () {
    return this.move(ACTION.RIGHT);
};
Piece.prototype.rotate = function () {
    return this.move(ACTION.ROTATE);
};
Piece.prototype.drop = function () {
    return this.move(ACTION.DROP);
};

Piece.prototype.updateGhostPosition = function () {
    ghostPiece.x = this.x;
    ghostPiece.y = this.y;
    ghostPiece.dropGhost();
};

Piece.prototype.dropGhost = function () {
    this.y = this.dropGhostHelper(this.x, this.y, this.structure);
};

Piece.prototype.dropGhostHelper = function (testX, testY, testStructure) {
    var beforeCollisionY = testY;

    while (true) {
        for (var j = 0; j < testStructure.length; j++) {
            for (var i = 0; i < testStructure[j].length; i++) {
                if (testStructure[j][i]) {
                    if (beforeCollisionY + j >= BOARD_HEIGHT || cellMarked(testX + i, beforeCollisionY + j)) {
                        if (beforeCollisionY > testY) {
                            return beforeCollisionY - 1;
                        } else {
                            return testY;
                        }
                    }
                }
            }
        }
        beforeCollisionY++;
    }
};

// Returns true if performing an action would result in a collision
Piece.prototype.collides = function (action) {
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
            this.markTaken(false);
            break;
    }

    willCollide = this.collidesHelper(testX, testY, testStructure, action);

    if (action == ACTION.DROP) {
        this.markTaken(true);
    }

    return willCollide;
};

Piece.prototype.collidesHelper = function (testX, testY, testStructure, action) {
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

// Clear lines. Argument is in terms of the game grid. Returns true if cleared lines
Piece.prototype.clearLines = function (linesToClear) {
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
Piece.prototype.isEmpty = function () {
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

function cellMarked(x, y) {
    return cellTaken[y][x];
}

function markCell(x, y, reallyMark) {
    cellTaken[y][x] = reallyMark;
}

function colorCell(x, y, color) {
    $('#gameTbody').find('tr:eq('+y+') td:eq('+x+')').css('background', color);
}

function cellOpacity(x, y, opacity) {
    $('#gameTbody').find('tr:eq('+y+') td:eq('+x+')').css('opacity', opacity);
}

function colorCellNextPiece(num, x, y, color) {
    $('#nextPiece' + num).find('tr:eq('+y+') td:eq('+x+')').css('background', color);
}

function colorCellHoldPiece(x, y, color) {
    $('#holdPiece').find('tr:eq('+y+') td:eq('+x+')').css('background', color);
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

// End the game
function endGame() {
    clearInterval(gameActive);
    gameActive = false;
    gameStarted = false;
    
    $('#gameOverlay').html('<span id="gameOverSpan">GAME OVER</span>');
}

// Check the game grid for full lines and clear them
function checkAndClear(delay) {
    var fullLines = getFullLines();
    var numFullLines = fullLines.length;
    
    if (numFullLines > 0) {
        linesClearedTransaction += numFullLines;
        
        showEncouragement(linesClearedTransaction);
        
        pause(false);
        if (delay) {
            setTimeout(function (){checkAndClearHelper(fullLines);}, CLEAR_LINE_DELAY);
        } else {
            checkAndClearHelper(fullLines);
        }
    } else {
        checkAndClearHelper(fullLines);
    }
}

// Clear lines and draw the pieces
function checkAndClearHelper(fullLines) {
    for (var i = 0; i < activePieces.length; i++) {
        activePieces[i].draw(false);
        activePieces[i].markTaken(false);
        activePieces[i].clearLines(fullLines);
    }

    // There may be new active pieces, do this in a separate loop
    for (i = 0; i < activePieces.length; i++) {
        activePieces[i].draw(true);
        activePieces[i].markTaken(true);
    }
    
    if (fullLines.length > 0) {
        setTimeout(function (){dropPieces();}, DROP_DELAY);
    } else {
        issueNewPiece(0);
        unpause(false);
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

// Removes the pieces from activePieces that have an empty structure
function removeEmptyPieces() {
    var removedPiece = false;
    for (var i = activePieces.length - 1; i >= 0; i--) {
        if (activePieces[i].isEmpty()) {
            activePieces.splice(i, 1);

            removedPiece = true;
        }
    }

    return removedPiece;
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
        setTimeout(function (){dropPieces();}, DROP_DELAY);
    } else {
        checkAndClear(false);
    }
}

function updateScore(score) {
    $('#score').html('SCORE: ' + score);
}

// Splash encourage text
function showEncouragement(lines) {
    var encouragementTextIdx = lines;
    if (lines > ENCOURAGEMENT_TEXT.length) {
        encouragementTextIdx = ENCOURAGEMENT_TEXT.length - 1;
    }
    $('#encouragement').html(ENCOURAGEMENT_TEXT[encouragementTextIdx]);
    $('#encouragement').finish().fadeOut(50).fadeIn(100).delay(200).fadeOut(150)
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

    ghostPiece = new Piece(PIECE_START_POS[newPieceType][0], PIECE_START_POS[newPieceType][1],
                           {'type':newPieceType, 'orientation':0});
    ghostPiece.isGhost = true;
    ghostPiece.dropGhost();
    ghostPiece.draw(true);
    
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

// Returns the next piece and updates the nextPieces list
function getNextPiece() {
    var nextPiece = nextPieces.shift();
    
    if (nextPieces.length === 0) {
        nextPieces = nextNextPieces;
        nextNextPieces = permutePieces([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]);
    }
    
    return nextPiece;
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

// Swaps current piece with hold piece
function hold() {
    if (holdOkay) {
        holdOkay = false;
        
        ghostPiece.draw(false);
        currentPiece.draw(false);
        
        if (holdPiece) {
            var holdPieceType = holdPiece.type;
            
            holdPiece.drawHoldPiece(false);
            
            holdPiece = new Piece(PIECE_PREVIEW_POS[currentPiece.type][0], PIECE_PREVIEW_POS[currentPiece.type][1],
                                  {'type':currentPiece.type, 'orientation':0});
                                  
            currentPiece = new Piece(PIECE_START_POS[holdPieceType][0], PIECE_START_POS[holdPieceType][1],
                                     {'type':holdPieceType, 'orientation':0});
            
            ghostPiece = new Piece(PIECE_START_POS[holdPieceType][0], PIECE_START_POS[holdPieceType][1],
                                   {'type':holdPieceType, 'orientation':0});
            ghostPiece.isGhost = true;
            ghostPiece.dropGhost();
            
            ghostPiece.draw(true);
            currentPiece.draw(true);
        } else {
            holdPiece = new Piece(PIECE_PREVIEW_POS[currentPiece.type][0], PIECE_PREVIEW_POS[currentPiece.type][1],
                                  {'type':currentPiece.type, 'orientation':0});
            
            issueNewPiece(-1);
        }
        
        
        holdPiece.drawHoldPiece(true);
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

function clearPreview() {
    $('.nextPiece td').css('background', PIECE_COLOR[0]);
}

function clearHold() {
    $('#holdPiece td').css('background', PIECE_COLOR[0]);
}

// Returns the next five pieces. Does not change the nextPieces list
function getPreviewPieces() {
    if (nextPieces.length >= 5) {
        return nextPieces.slice(0, 5);
    } else {
        return nextPieces.slice(0).concat(nextNextPieces.slice(0, 5 - nextPieces.length));
    }
}

function gameTick() {
    currentPiece.down();
}

function togglePause(displayOverlay) {
    if (gameActive) {
        pause(displayOverlay);
    } else {
        unpause(displayOverlay);
    }   
}

function pause(displayOverlay) {
    if (gameActive) {
        clearInterval(gameActive);
        gameActive = false;
        if (displayOverlay) {
            $('#gameOverlay').html('PAUSED');
            $('#holdPieceDiv, #gameDiv, #nextPieces').css('visibility', 'hidden');
        }
    }
}

function unpause(displayOverlay) {
    if (!gameActive) {
        if (gameStarted) {
            gameActive = setInterval(gameTick, tickSpeed);
            if (displayOverlay) {
                $('#gameOverlay').html('');
                $('#holdPieceDiv, #gameDiv, #nextPieces').css('visibility', 'visible');
            }
        }
    }
}

var leftInterval = 0;
var rightInterval = 0;
var downInterval = 0;
$('html').keydown(function (event) {
    switch (event.keyCode) {
        case 75: // K
        case 38: // UP
            if (gameActive) {
                currentPiece.rotate();
            }
            return false;
            break;
        case 72: // H
        case 37: // LEFT
            if (gameActive) {
                if (!leftInterval) {
                    currentPiece.left();
                    leftInterval = setInterval(function () { currentPiece.left(); }, SIDE_SPEED);
                }
            }
            break;
        case 76: // L
        case 39: // RIGHT
            if (gameActive) {
                if (!rightInterval) {
                    currentPiece.right();
                    rightInterval = setInterval(function () { currentPiece.right(); }, SIDE_SPEED);
                }
            }
            break;
        case 74: // J
        case 40: // DOWN
            if (gameActive) {
                if (!downInterval) {
                    currentPiece.down();
                    downInterval = setInterval(function () { currentPiece.down(); }, DOWN_SPEED);
                }
            }
            return false;
            break;
        case 32: // SPACE
            if (gameActive) {
                while (currentPiece.down() != 2) {}
            }
            return false;
            break;
        case 16: // SHIFT
        case 67: // C
            if (gameActive) {
                hold();
            }
            break;
        case 27: // ESC
        case 80: // P
            togglePause(true);
            break;
        case 13: // ENTER
            startNewGame();
            break;
    }
});
$('html').keyup(function (event) {
    switch (event.keyCode) {
        case 72: // H
        case 37: // LEFT
            clearInterval(leftInterval);
            leftInterval = 0;
            break;
        case 76: // L
        case 39: // RIGHT
            clearInterval(rightInterval);
            rightInterval = 0;
            break;
        case 74: // J
        case 40: // DOWN
            clearInterval(downInterval);
            downInterval = 0;
            break;
    }
});

});