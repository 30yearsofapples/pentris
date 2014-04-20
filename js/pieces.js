/*

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

var PIECE_PREVIEW_POS = [
    null,
    [0, -1],    //  1:I
    [0, -1],    //  2:J
    [0, -1],    //  3:L
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
    [0, -1],    // 14:O
    [0, -1],    // 15:A
    [0, -1],    // 16:Q
    [0, -1],    // 17:P
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

var PIECE_TYPE = [
    null,
    PIECE_I, PIECE_J, PIECE_L, PIECE_C, PIECE_B,
    PIECE_D, PIECE_S, PIECE_Z, PIECE_X, PIECE_E,
    PIECE_F, PIECE_T, PIECE_N, PIECE_O, PIECE_A,
    PIECE_Q, PIECE_P, PIECE_K
];