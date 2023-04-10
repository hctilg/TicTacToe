
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
    init(rival='BOT') {

        this.rivalType = rival.trim().toUpperCase() == "BOT" ? "BOT" : "USER";

        this.options = document.querySelectorAll('.option input');

        this.options.forEach( option => option.onclick = event => this.render(event, option) );

        this.currentPlayer = this.player = random_item(['X', 'O']);

        document.body.classList.add('active');
        document.body.classList.remove('get-rival', 'message', 'you-win', 'bot-win', 'x-win', 'o-win', 'equal');
        
    }

    /**
     * render game board
     */
    render(event, element) {
        element.disabled = true;
        element.setAttribute('value', this.currentPlayer);
        element.classList.add(this.currentPlayer.toLowerCase());
        this.switchPlayer();
        if (this.rivalType == "BOT" && this.player != this.currentPlayer) {
            var _options = [];
            this.options.forEach(option => {
                if (option.value == '') _options.push(option);
            });
            if (_options.length > 1) setTimeout(() => {
                random_item(_options).click();
            }, 200);
        }
        this.checkGame();
    }

    /**
     * check game
     */
    checkGame() {
        let values = [];
        this.options.forEach(option => values.push(option.value));

        const checkValues = player => {
            return (
                // winCombinations :
                /* 1 (—) */ (values[0] == player && values[1] == player && values[2] == player) ||
                /* 2 (—) */ (values[3] == player && values[4] == player && values[5] == player) ||
                /* 3 (—) */ (values[6] == player && values[7] == player && values[8] == player) ||
                /* 1 (|) */ (values[0] == player && values[3] == player && values[6] == player) ||
                /* 2 (|) */ (values[1] == player && values[4] == player && values[7] == player) ||
                /* 3 (|) */ (values[2] == player && values[5] == player && values[8] == player) ||
                /* 1 (\) */ (values[0] == player && values[4] == player && values[8] == player) ||
                /* 2 (/) */ (values[2] == player && values[4] == player && values[6] == player)
            ) ? true : false;
        }

        var res_X = checkValues('X');
        var res_O = checkValues('O');

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
        } else {
            if (values.join('').length > 8) this.down('equal');
        }

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
        document.body.classList.add('get-rival');
    }

    /**
     * switch player
     */
    switchPlayer() {
        this.currentPlayer = (this.currentPlayer == "X") ? "O" : "X";
    }

}