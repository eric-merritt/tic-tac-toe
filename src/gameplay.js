const playerFactory = (name, marker) => {
    return { name, marker };
};

const gameBoard = (() => {
    let board = ['', '', '', '', '', '', '', '', ''];
    const getBoard = () => board;
    const setBoard = (index, marker) => board[index] = marker;
    const resetBoard = () => board = ['', '', '', '', '', '', '', '', ''];
    return { getBoard, setBoard, resetBoard };
});

const checkWinner = (() => {
    const check = (board) => {
        let winner = false;
        const winningCombos = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6] // diagonals
        ];
        winningCombos.forEach(combo => {
            if (board[combo[0]] !== '' && board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
                winner = true;
            }
        });
        return winner;
    };
    return { check };
});


module.exports = { playerFactory, gameBoard, checkWinner };