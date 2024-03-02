document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const winnerPopup = document.getElementById('winner-popup');
    const winnerText = document.getElementById('winner-text');
    const playAgainBtn = document.getElementById('play-again-btn');
    const restartBtn = document.getElementById('restart-btn');
    const backgroundText = document.getElementById('background-text');

    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
    let gameEnded = false;

    const checkWinner = () => {
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];

        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }

        if (board.every(cell => cell !== '')) {
            return 'tie';
        }

        return null;
    };

    const handleCellClick = (index) => {
        if (gameEnded || board[index] !== '') return;

        board[index] = currentPlayer;
        cells[index].innerText = currentPlayer;
        cells[index].classList.add(currentPlayer);

        const winner = checkWinner();
        if (winner) {
            if (winner === 'tie') {
                winnerText.textContent = "It's a tie!";
            } else {
                winnerText.textContent = `Player ${winner} wins!`;
            }
            winnerPopup.style.display = 'block';
            gameEnded = true;
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            backgroundText.textContent = `Player ${currentPlayer}'s Turn`;
        }
    };

    const restartGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => {
            cell.innerText = '';
            cell.classList.remove('X', 'O');
        });
        gameEnded = false;
        winnerPopup.style.display = 'none';
        currentPlayer = 'X';
        backgroundText.textContent = `Player ${currentPlayer}'s Turn`;
    };

    cells.forEach((cell, index) => {
        cell.addEventListener('click', () => handleCellClick(index));
    });

    playAgainBtn.addEventListener('click', restartGame);
    restartBtn.addEventListener('click', restartGame);
});