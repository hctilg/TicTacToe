
// taking care of forEach object problem in FireFox, Internet Explorer, WaterFox
if (typeof NodeList.prototype.forEach !== 'function') NodeList.prototype.forEach = Array.prototype.forEach;

// get random integer
const random = (min, max) => (Math.floor(Math.random() * (max - min)) + min);

const random_item = (arr) => {
    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // return random item
    return arr[randomIndex];
}

/**
 * The TicTacToe Game
 */
export class TicTacToe {

    /**
     * initialize game
     */
    init(type="medium") {

        this.board = Array.from(Array(9).keys());

        this.type = type;
        
        this.rivalType = type !== 'pvp' ? "BOT" : "USER";

        this.options = document.querySelectorAll('.option input');

        this.options.forEach((option, index) => option.onclick = () => this.render(index, option));

        this.currentPlayer = this.player = random_item(['X', 'O']);

        document.body.classList.add('active');
        document.body.classList.remove('start', 'message', 'welcome', 'you-win', 'bot-win', 'x-win', 'o-win', 'equal');
        
    }

    /**
     * fill target Square
     * @param {HTMLElement} element 
     */
    fillSquare (id, element) {
        element.disabled = true;
        this.board[id] = this.currentPlayer;
        element.setAttribute('value', this.currentPlayer);
        element.classList.add(this.currentPlayer.toLowerCase());
    }

    /**
     * @returns 
     */
    getAvailableMoves(board) {
        return board.filter(e => typeof e == 'number');
    }

    /**
     * Minimax algorithm
     * @param {Array} board 
     * @param {Number} depth 
     * @param {boolean} isMaximizingPlayer 
     * @returns 
     */
    minimax(board, depth, isMaximizingPlayer) {
        const aiPlayer = this.player == 'X' ? 'O' : 'X';
        
        if (this.checkBoard(board, aiPlayer)) return 10 - depth;
        else if (this.checkBoard(board, this.player)) return -10 + depth;
        else if (this.isBoardFull()) return 0;
      
        if (isMaximizingPlayer) {
            let bestScore = -Infinity;
            const availableMoves = this.getAvailableMoves(board);
      
            for (let i = 0; i < availableMoves.length; i++) {
                const squareId = availableMoves[i];
                board[squareId] = aiPlayer;
                const score = this.minimax(board, depth + 1, false);
                board[squareId] = squareId;
                bestScore = Math.max(bestScore, score);
            }
      
            return bestScore;
        } else {
            let bestScore = Infinity;
            const availableMoves = this.getAvailableMoves(board);
            
            for (let i = 0; i < availableMoves.length; i++) {
                const squareId = availableMoves[i];
                board[squareId] = this.player;
                const score = this.minimax(board, depth + 1, true);
                board[squareId] = squareId;
                bestScore = Math.min(bestScore, score);
            }
          
            return bestScore;
        }
    }

    /**
     * ai moves
     */
    aiMove() {
        var board = this.board;
        const availableMoves = this.getAvailableMoves(board);
        const aiPlayer = this.player == 'X' ? 'O' : 'X';
        let bestScore = -Infinity;
        let move;

        for (let i = 0; i < availableMoves.length; i++) {
            const squareId = availableMoves[i];
            board[squareId] = aiPlayer;
            const score = this.minimax(this.board, 0, false);
            board[squareId] = squareId;
            
            if (score > bestScore) {
               bestScore = score;
               move = squareId;
            }
        }

        if (this.type == 'easy') move = random_item(availableMoves);
        if (this.type == 'medium') move = random_item([move, random_item(availableMoves)]);

        if (availableMoves.length !== 0) setTimeout(() => this.options[move].click(), 200);
    }

    /**
     * render game board
     * @param {*} event 
     * @param {HTMLElement} element 
     */
    render(id, element) {
        this.fillSquare(id, element);
        this.switchPlayer();
        if (
            this.rivalType == "BOT" &&
            this.player != this.currentPlayer
        ) this.aiMove();
        this.checkGame();
    }

    /**
     * check the board is full
     * @returns 
     */
    isBoardFull() {
        return this.board.filter(e => typeof e == 'number').length == 0;
    }

    checkBoard(board, player) {
        return (
            // winCombinations :
            /* 1-2-3 [—] */ (board[0] == player && board[1] == player && board[2] == player) ||
            /* 4-5-6 [—] */ (board[3] == player && board[4] == player && board[5] == player) ||
            /* 7-8-9 [—] */ (board[6] == player && board[7] == player && board[8] == player) ||
            /* 1-4-7 [|] */ (board[0] == player && board[3] == player && board[6] == player) ||
            /* 2-5-8 [|] */ (board[1] == player && board[4] == player && board[7] == player) ||
            /* 3-6-9 [|] */ (board[2] == player && board[5] == player && board[8] == player) ||
            /* 1-5-9 [\] */ (board[0] == player && board[4] == player && board[8] == player) ||
            /* 3-5-7 [/] */ (board[2] == player && board[4] == player && board[6] == player)
        );
    }

    /**
     * check game
     */
    checkGame() {
        let values = [];
        this.options.forEach(option => values.push(option.value));

        var res_X = this.checkBoard(values, 'X');
        var res_O = this.checkBoard(values, 'O');

        if (res_X) {
            if (this.rivalType == "BOT") {
                if (this.player == 'X') this.down('you-win');
                else this.down('bot-win');
            } else this.down('x-win');
        } else if (res_O) {
            this.down();
            if (this.rivalType == "BOT") {
                if (this.player == 'O') this.down('you-win');
                else this.down('bot-win');
            } else this.down('o-win');
        } else if (this.isBoardFull()) this.down('equal');

    }

    down(_type) {
        document.body.classList.remove('active');
        document.body.classList.add('message');
        this.reset();
        document.body.classList.add(_type);
    }

    /**
     * reset game
     */
    reset() {
        this.options.forEach(option => {
            option.classList.remove('x', 'o');
            option.setAttribute('value', '');
            option.onclick = () => {};
            option.disabled = false;
        });
        document.body.classList.add('start');
    }

    /**
     * switch player
     */
    switchPlayer() {
        this.currentPlayer = (this.currentPlayer == "X") ? "O" : "X";
    }

}
