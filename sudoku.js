var arr = [[], [], [], [], [], [], [], [], []]

for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
        arr[i][j] = document.getElementById(i * 9 + j);

    }
}


var board = [[], [], [], [], [], [], [], [], []]

function FillBoard(board) {
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                arr[i][j].innerText = board[i][j]
            }

            else
                arr[i][j].innerText = ''
        }
    }
}

let GetPuzzle = document.getElementById('GetPuzzle')
let SolvePuzzle = document.getElementById('SolvePuzzle')

GetPuzzle.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        board = response.board
        FillBoard(board)
    }
    xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy')
    xhrRequest.send()
}

SolvePuzzle.onclick = () => {
    SudokuSolver(board, 0, 0, 9);
};
function isValid(board, i, j, num, n) {
    // row and col check
    for (let x = 0; x < n; x++) {
        if (board[i][x] == num || board[x][j] == num) {
            return false;
        }
    }

    // Subgrid Check
    //rn is root of n
    //si is the starting index of i for the grid
    //sj is the starting index of j for the grid
    let rn = Math.sqrt(n);
    let si = i - i % rn;
    let sj = j - j % rn;
    for (let x = si; x < si + rn; x++) {
        for (let y = sj; y < sj + rn; y++) {
            if (board[x][y] == num) {
                return false;
            }
        }
    }
    return true;
}

function SudokuSolver(board, i, j, n) {
    if (i == n) {
        FillBoard(board)
        return true;
    }
    // redirect to next row
    if (j == n) {
        return SudokuSolver(board, i + 1, 0, n);
    }
    // if cell is already filled move to next location
    if (board[i][j] != 0) {
        return SudokuSolver(board, i, j + 1, n);
    }
    // fill the board
    for (let num = 1; num <= 9; num++) {
        // check if num can be filled
        if (isValid(board, i, j, num, n)) {
            board[i][j] = num;
            let subAns = SudokuSolver(board, i, j + 1, n);
            if (subAns) {
                return true;
            }
            // Backtrack
            board[i][j] = 0;
        }
    }
    return false;
}