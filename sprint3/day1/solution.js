function isSolved(board) {
    for (let i = 0; i < board.length; i++) {

        // Check rows
        if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][0] === board[i][2]) {
            if(board[i][0]==1){
                return 'X'
            } else return 'O'// Return the player number (1 or 2) who won
        }

        // Check columns
        if (board[0][i] !== 0 && board[0][i] === board[1][i] && board[0][i] === board[2][i]) {
             board[0][i] // Return the player number (1 or 2) who won
        }

    }

    // Check diagonals
    if (board[0][0] !== 0 && board[0][0] === board[1][1] && board[0][0] === board[2][2]) {
        return board[0][0]; // Return the player number (1 or 2) who won
    }

    if (board[0][2] !== 0 && board[0][2] === board[1][1] && board[0][2] === board[2][0]) {
        return board[0][2]; // Return the player number (1 or 2) who won
    }

    for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
            if (board[i][j] === 0) {
                return -1;
            }
        }
    }
    return 0;
}

console.log(isSolved(

    [[1, 1, 1],
    [2, 1, 2],
    [1, 1,2]]

))