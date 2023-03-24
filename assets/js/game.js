// get random integer
const random = (min, max) => (Math.floor(Math.random() * (max - min)) + min);

const getRandomItem = (arr) => {

    // get random index value
    const randomIndex = Math.floor(Math.random() * arr.length);

    // get random item
    const item = arr[randomIndex];

    return item;
}

export class Game {  /* The TicTacToe Game */
    constructor(application = document.body) {

        this.app = application;

        return this;

    }
    start() {  /* Start the Game  */
        try {

            this.app.innerHTML = '';

            const chRemoveSession = session => {

                if (sessionStorage.getItem(session)) sessionStorage.removeItem(session);

            }

            var sessionNames = ["turn", "you", "rival"];

            sessionNames.forEach(sessionName => chRemoveSession(sessionName));

            this.getTypeRival();

            return true;

        } catch (error) {

            console.error(error);

            return false;

        }
    }
    checkUpStart(rival) {

        const first_turn = this.getTurnGame();

        sessionStorage.setItem('turn', first_turn);

        sessionStorage.setItem('you', first_turn);

        sessionStorage.setItem('rival', rival);

        this.ch_it_time = setInterval(() => {

            if (!sessionStorage.getItem('turn')) this.start();
            else {

                let _tmp_turn = sessionStorage.getItem('turn');

                if (!(_tmp_turn == 'X' || _tmp_turn == 'O')) this.start();

            };

            if (!sessionStorage.getItem('you')) this.start();
            else {

                let _tmp_turn = sessionStorage.getItem('you');

                if (!(_tmp_turn == 'X' || _tmp_turn == 'O')) this.start();

            };

            if (!sessionStorage.getItem('rival')) this.start();
            else {

                let _tmp_rival = sessionStorage.getItem('rival');

                if (!(_tmp_rival == 'bot' || _tmp_rival == 'user')) this.start();

            };

        }, 2000);

        this.createGameOpts();

        const game_options = document.querySelectorAll('#game-box input[type="button"][game-option]');

        const setTurn = () => {

            sessionStorage.setItem('turn', (sessionStorage.getItem('turn') == 'X') ? 'O' : 'X');

            const turn = document.querySelector('#turn span');

            turn.innerText = (sessionStorage.getItem('turn') == sessionStorage.getItem('you')) ? 'you' : 'rival';

        }

        const checkGame = (game_all_options, turn) => {

            let values = [];

            for (let i = 0; i < game_all_options.length; i++) {

                const game_option = game_all_options[i];

                values[i + 1] = game_option.value;

            }

            let status = values.join('').length > 8; // or ... >= 9

            const checker_game = turn => {
                return (
                    (values[1] == turn && values[2] == turn && values[3] == turn) // (—) 1 = 2 = 3
                    || (values[4] == turn && values[5] == turn && values[6] == turn) // (—) 4 = 5 = 6
                    || (values[7] == turn && values[8] == turn && values[9] == turn) // (—) 7 = 8 = 9
                    || (values[1] == turn && values[4] == turn && values[7] == turn) // (|) 1 = 4 = 7
                    || (values[2] == turn && values[5] == turn && values[8] == turn) // (|) 2 = 5 = 8
                    || (values[3] == turn && values[6] == turn && values[9] == turn) // (|) 3 = 6 = 9
                    || (values[1] == turn && values[5] == turn && values[9] == turn) // (\) 1 = 5 = 9
                    || (values[3] == turn && values[5] == turn && values[7] == turn) // (/) 3 = 5 = 7
                ) ? true : false;
            }

            let checked_X, checked_O;

            checked_X = checked_O = false;

            if (checker_game('X')) status = checked_X = true;
            else if (checker_game('O')) status = checked_O = true;

            return {
                X: checked_X,
                O: checked_O,
                status: status
            }

        }

        if (rival == 'bot') {

            const gameBox = document.querySelector('#game-box');

            const checker = game_all_options => {

                var res = checkGame(game_all_options);

                if (res.X) this.alert().victory(`${(sessionStorage.getItem('you') == 'X') ? 'You' : 'Bot'} won!`);
                else if (res.O) this.alert().victory(`${(sessionStorage.getItem('you') == 'O') ? 'You' : 'Bot'} won!`);
                else {
                    if (res.status) this.alert().equal('Severe equal.');
                    else setTurn();
                }

            }

            const checker_items_bot = game_items => {

                let values = [];

                for (let index = 0; index < game_items.length; index++) {

                    const game_item = game_items[index];

                    values[index + 1] = game_item.value;

                }

                // .........................................

                const checker_values = values => {

                    const user_char = sessionStorage.getItem('you');

                    const bot_char = (user_char == 'X') ? 'O' : 'X';

                    const ch_val = (values, array_item) => {
                        return (
                            values[1] == array_item[0] && values[2] == array_item[1] && values[3] == array_item[2] &&
                            values[4] == array_item[3] && values[5] == array_item[4] && values[6] == array_item[5] &&
                            values[7] == array_item[6] && values[8] == array_item[7] && values[9] == array_item[8]
                        );
                    };

                    if (false);

                    else if (ch_val(values, [user_char, '', '', '', '', '', '', '', ''])) return getRandomItem([1, 3, 4]);  // 1 => 2, 4, 5
                    else if (ch_val(values, ['', user_char, '', '', '', '', '', '', ''])) return getRandomItem([0, 2, 4]);  // 2 => 1, 3, 5
                    else if (ch_val(values, ['', '', user_char, '', '', '', '', '', ''])) return getRandomItem([1, 4, 5]);  // 3 => 2, 5, 6
                    else if (ch_val(values, ['', '', '', user_char, '', '', '', '', ''])) return getRandomItem([0, 4, 6]);  // 4 => 1, 5, 7
                    else if (ch_val(values, ['', '', '', '', user_char, '', '', '', ''])) return getRandomItem([0, 2, 6, 8]);  // 5 => 1, 3, 7, 9
                    else if (ch_val(values, ['', '', '', '', '', user_char, '', '', ''])) return getRandomItem([2, 4, 8]);  // 6 => 3, 5, 9
                    else if (ch_val(values, ['', '', '', '', '', '', user_char, '', ''])) return getRandomItem([3, 4, 7]);  // 7 => 4, 5, 8
                    else if (ch_val(values, ['', '', '', '', '', '', '', user_char, ''])) return getRandomItem([4, 6, 8]);  // 8 => 5, 7, 9
                    else if (ch_val(values, ['', '', '', '', '', '', '', '', user_char])) return getRandomItem([4, 5, 7]);  // 9 => 5, 6, 8


                    else if (ch_val(values, [user_char, bot_char, user_char, '', '', '', '', '', ''])) return 4;  // 1, 2, 3 => 5
                    else if (ch_val(values, [user_char, bot_char, '', user_char, '', '', '', '', ''])) return 6;  // 1, 2, 4 => 7
                    else if (ch_val(values, [user_char, bot_char, '', '', user_char, '', '', '', ''])) return 8;  // 1, 2, 5 => 9
                    else if (ch_val(values, [user_char, bot_char, '', '', '', user_char, '', '', ''])) return 3;  // 1, 2, 6 => 4
                    else if (ch_val(values, [user_char, bot_char, '', '', '', '', user_char, '', ''])) return 3;  // 1, 2, 7 => 4
                    else if (ch_val(values, [user_char, bot_char, '', '', '', '', '', user_char, ''])) return 6;  // 1, 2, 8 => 7
                    else if (ch_val(values, [user_char, bot_char, '', '', '', '', '', '', user_char])) return 4;  // 1, 2, 9 => 5

                    else if (ch_val(values, [user_char, user_char, '', bot_char, '', '', '', '', ''])) return 2;  // 1, 4, 2 => 3
                    else if (ch_val(values, [user_char, '', user_char, bot_char, '', '', '', '', ''])) return 1;  // 1, 4, 3 => 2
                    else if (ch_val(values, [user_char, '', '', bot_char, user_char, '', '', '', ''])) return 8;  // 1, 4, 5 => 9
                    else if (ch_val(values, [user_char, '', '', bot_char, '', user_char, '', '', ''])) return getRandomItem([2, 8]);  // 1, 4, 6 => 3, 9
                    else if (ch_val(values, [user_char, '', '', bot_char, '', '', user_char, '', ''])) return 4;  // 1, 4, 7 => 5
                    else if (ch_val(values, [user_char, '', '', bot_char, '', '', '', user_char, ''])) return 1;  // 1, 4, 8 => 2
                    else if (ch_val(values, [user_char, '', '', bot_char, '', '', '', '', user_char])) return 4;  // 1, 4, 9 => 5

                    else if (ch_val(values, [user_char, user_char, '', '', bot_char, '', '', '', ''])) return 2;  // 1, 5, 2 => 3
                    else if (ch_val(values, [user_char, '', user_char, '', bot_char, '', '', '', ''])) return 1;  // 1, 5, 3 => 2
                    else if (ch_val(values, [user_char, '', '', user_char, bot_char, '', '', '', ''])) return 6;  // 1, 5, 4 => 7
                    else if (ch_val(values, [user_char, '', '', '', bot_char, user_char, '', '', ''])) return 2;  // 1, 5, 6 => 3
                    else if (ch_val(values, [user_char, '', '', '', bot_char, '', user_char, '', ''])) return 3;  // 1, 5, 7 => 4
                    else if (ch_val(values, [user_char, '', '', '', bot_char, '', '', user_char, ''])) return 6;  // 1, 5, 8 => 7
                    else if (ch_val(values, [user_char, '', '', '', bot_char, '', '', '', user_char])) return getRandomItem([2, 6]);  // 1, 5, 9 => 3, 7


                    else if (ch_val(values, [bot_char, user_char, user_char, '', '', '', '', '', ''])) return 4;  // 2, 1, 3 => 5
                    else if (ch_val(values, [bot_char, user_char, '', user_char, '', '', '', '', ''])) return getRandomItem([4, 8]);  // 2, 1, 4 => 5, 9
                    else if (ch_val(values, [bot_char, user_char, '', '', user_char, '', '', '', ''])) return 7;  // 2, 1, 5 => 8
                    else if (ch_val(values, [bot_char, user_char, '', '', '', user_char, '', '', ''])) return 4;  // 2, 1, 6 => 5
                    else if (ch_val(values, [bot_char, user_char, '', '', '', '', user_char, '', ''])) return 4;  // 2, 1, 7 => 5
                    else if (ch_val(values, [bot_char, user_char, '', '', '', '', '', user_char, ''])) return 4;  // 2, 1, 8 => 5
                    else if (ch_val(values, [bot_char, user_char, '', '', '', '', '', '', user_char])) return getRandomItem([4, 6, 7]);  // 2, 1, 9 => 5, 7, 8

                    else if (ch_val(values, [user_char, user_char, bot_char, '', '', '', '', '', ''])) return 4;  // 2, 3, 1 => 5
                    else if (ch_val(values, ['', user_char, bot_char, user_char, '', '', '', '', ''])) return 4;  // 2, 3, 4 => 5
                    else if (ch_val(values, ['', user_char, bot_char, '', user_char, '', '', '', ''])) return 7;  // 2, 3, 5 => 8
                    else if (ch_val(values, ['', user_char, bot_char, '', '', user_char, '', '', ''])) return 4;  // 2, 3, 6 => 5
                    else if (ch_val(values, ['', user_char, bot_char, '', '', '', user_char, '', ''])) return getRandomItem([4, 7, 8]);  // 2, 3, 7 => 5, 8, 9
                    else if (ch_val(values, ['', user_char, bot_char, '', '', '', '', user_char, ''])) return 8;  // 2, 3, 8 => 9
                    else if (ch_val(values, ['', user_char, bot_char, '', '', '', '', '', user_char])) return getRandomItem([4, 6, 7]);  // 2, 3, 9 => 5, 7, 8

                    else if (ch_val(values, [user_char, user_char, '', '', bot_char, '', '', '', ''])) return 2;  // 2, 5, 1 => 3
                    else if (ch_val(values, ['', user_char, user_char, '', bot_char, '', '', '', ''])) return 0;  // 2, 5, 3 => 1
                    else if (ch_val(values, ['', user_char, '', user_char, bot_char, '', '', '', ''])) return 0;  // 2, 5, 4 => 1
                    else if (ch_val(values, ['', user_char, '', '', bot_char, user_char, '', '', ''])) return 2;  // 2, 5, 6 => 3
                    else if (ch_val(values, ['', user_char, '', '', bot_char, '', user_char, '', ''])) return 0;  // 2, 5, 7 => 1
                    else if (ch_val(values, ['', user_char, '', '', bot_char, '', '', user_char, ''])) return getRandomItem([0, 2, 6, 8]);  // 2, 5, 8 => 1, 3, 7, 9
                    else if (ch_val(values, ['', user_char, '', '', bot_char, '', '', '', user_char])) return 2;  // 2, 5, 9 => 3


                    else if (ch_val(values, [user_char, bot_char, user_char, '', '', '', '', '', ''])) return 4;  // 3, 2, 1 => 5
                    else if (ch_val(values, ['', bot_char, user_char, user_char, '', '', '', '', ''])) return 4;  // 3, 2, 4 => 5
                    else if (ch_val(values, ['', bot_char, user_char, '', user_char, '', '', '', ''])) return 6;  // 3, 2, 5 => 7
                    else if (ch_val(values, ['', bot_char, user_char, '', '', user_char, '', '', ''])) return 8;  // 3, 2, 6 => 9
                    else if (ch_val(values, ['', bot_char, user_char, '', '', '', user_char, '', ''])) return 4;  // 3, 2, 7 => 5
                    else if (ch_val(values, ['', bot_char, user_char, '', '', '', '', user_char, ''])) return getRandomItem([4, 8]);  // 3, 2, 8 => 5, 9
                    else if (ch_val(values, ['', bot_char, user_char, '', '', '', '', '', user_char])) return 5;  // 3, 2, 9 => 6

                    else if (ch_val(values, [user_char, '', user_char, '', bot_char, '', '', '', ''])) return 1;  // 3, 5, 1 => 2
                    else if (ch_val(values, ['', user_char, user_char, '', bot_char, '', '', '', ''])) return 0;  // 3, 5, 2 => 1
                    else if (ch_val(values, ['', '', user_char, user_char, bot_char, '', '', '', ''])) return 0;  // 3, 5, 4 => 1
                    else if (ch_val(values, ['', '', user_char, '', bot_char, user_char, '', '', ''])) return 8;  // 3, 5, 6 => 9
                    else if (ch_val(values, ['', '', user_char, '', bot_char, '', user_char, '', ''])) return getRandomItem([0, 8]);  // 3, 5, 7 => 1, 9
                    else if (ch_val(values, ['', '', user_char, '', bot_char, '', '', user_char, ''])) return 8;  // 3, 5, 8 => 9
                    else if (ch_val(values, ['', '', user_char, '', bot_char, '', '', '', user_char])) return 5;  // 3, 5, 9 => 6

                    else if (ch_val(values, [user_char, '', user_char, '', '', bot_char, '', '', ''])) return 1;  // 3, 6, 1 => 2
                    else if (ch_val(values, ['', user_char, user_char, '', '', bot_char, '', '', ''])) return 0;  // 3, 6, 2 => 1
                    else if (ch_val(values, ['', '', user_char, user_char, '', bot_char, '', '', ''])) return 0;  // 3, 6, 4 => 1
                    else if (ch_val(values, ['', '', user_char, '', user_char, bot_char, '', '', ''])) return 6;  // 3, 6, 5 => 7
                    else if (ch_val(values, ['', '', user_char, '', '', bot_char, user_char, '', ''])) return 4;  // 3, 6, 7 => 5
                    else if (ch_val(values, ['', '', user_char, '', '', bot_char, '', user_char, ''])) return 4;  // 3, 6, 8 => 5
                    else if (ch_val(values, ['', '', user_char, '', '', bot_char, '', '', user_char])) return 4;  // 3, 6, 9 => 5
                        

                    else if (ch_val(values, [bot_char, user_char, '', user_char, '', '', '', '', ''])) return 4;  // 4, 1, 2 => 5
                    else if (ch_val(values, [bot_char, '', user_char, user_char, '', '', '', '', ''])) return 4;  // 4, 1, 3 => 5
                    else if (ch_val(values, [bot_char, '', '', user_char, user_char, '', '', '', ''])) return 5;  // 4, 1, 5 => 6
                    else if (ch_val(values, [bot_char, '', '', user_char, '', user_char, '', '', ''])) return 4;  // 4, 1, 6 => 5
                    else if (ch_val(values, [bot_char, '', '', user_char, '', '', user_char, '', ''])) return getRandomItem([4, 8]);  // 4, 1, 7 => 5, 9
                    else if (ch_val(values, [bot_char, '', '', user_char, '', '', '', user_char, ''])) return 4;  // 4, 1, 8 => 5
                    else if (ch_val(values, [bot_char, '', '', user_char, '', '', '', '', user_char])) return 2;  // 4, 1, 9 => 3

                    else if (ch_val(values, [user_char, '', '', user_char, bot_char, '', '', '', ''])) return 6;  // 4, 5, 1 => 7
                    else if (ch_val(values, ['', user_char, '', user_char, bot_char, '', '', '', ''])) return 0;  // 4, 5, 2 => 1
                    else if (ch_val(values, ['', '', user_char, user_char, bot_char, '', '', '', ''])) return getRandomItem([0, 1]);  // 4, 5, 3 => 1, 2
                    else if (ch_val(values, ['', '', '', user_char, bot_char, user_char, '', '', ''])) return getRandomItem([0, 2, 6, 8]);  // 4, 5, 6 => 1, 3, 7, 9
                    else if (ch_val(values, ['', '', '', user_char, bot_char, '', user_char, '', ''])) return 0;  // 4, 5, 7 => 1
                    else if (ch_val(values, ['', '', '', user_char, bot_char, '', '', user_char, ''])) return 6;  // 4, 5, 8 => 7
                    else if (ch_val(values, ['', '', '', user_char, bot_char, '', '', '', user_char])) return 6;  // 4, 5, 9 => 7

                    else if (ch_val(values, [user_char, '', '', user_char, '', '', bot_char, '', ''])) return getRandomItem([2, 4]);  // 4, 7, 1 => 3, 5
                    else if (ch_val(values, ['', user_char, '', user_char, '', '', bot_char, '', ''])) return 4;  // 4, 7, 2 => 5
                    else if (ch_val(values, ['', '', user_char, user_char, '', '', bot_char, '', ''])) return 4;  // 4, 7, 3 => 5
                    else if (ch_val(values, ['', '', '', user_char, user_char, '', bot_char, '', ''])) return 5;  // 4, 7, 5 => 6
                    else if (ch_val(values, ['', '', '', user_char, '', user_char, bot_char, '', ''])) return 4;  // 4, 7, 6 => 5
                    else if (ch_val(values, ['', '', '', user_char, '', '', bot_char, user_char, ''])) return 4;  // 4, 7, 8 => 5
                    else if (ch_val(values, ['', '', '', user_char, '', '', bot_char, '', user_char])) return 4;  // 4, 7, 9 => 5


                    else if (ch_val(values, [bot_char, user_char, '', '', user_char, '', '', '', ''])) return 7;  // 5, 1, 2 => 8
                    else if (ch_val(values, [bot_char, '', user_char, '', user_char, '', '', '', ''])) return 6;  // 5, 1, 3 => 7
                    else if (ch_val(values, [bot_char, '', '', user_char, user_char, '', '', '', ''])) return 5;  // 5, 1, 4 => 6
                    else if (ch_val(values, [bot_char, '', '', '', user_char, user_char, '', '', ''])) return 3;  // 5, 1, 6 => 4
                    else if (ch_val(values, [bot_char, '', '', '', user_char, '', user_char, '', ''])) return 2;  // 5, 1, 7 => 3
                    else if (ch_val(values, [bot_char, '', '', '', user_char, '', '', user_char, ''])) return 1;  // 5, 1, 8 => 2
                    else if (ch_val(values, [bot_char, '', '', '', user_char, '', '', '', user_char])) return getRandomItem([1, 2, 3, 6]);  // 5, 1, 9 => 2, 3, 4, 7

                    else if (ch_val(values, [user_char, '', bot_char, '', user_char, '', '', '', ''])) return 8;  // 5, 3, 1 => 9
                    else if (ch_val(values, ['', user_char, bot_char, '', user_char, '', '', '', ''])) return 7;  // 5, 3, 2 => 8
                    else if (ch_val(values, ['', '', bot_char, user_char, user_char, '', '', '', ''])) return 5;  // 5, 3, 4 => 6
                    else if (ch_val(values, ['', '', bot_char, '', user_char, user_char, '', '', ''])) return 3;  // 5, 3, 6 => 4
                    else if (ch_val(values, ['', '', bot_char, '', user_char, '', user_char, '', ''])) return getRandomItem([0, 1, 5, 8]);  // 5, 3, 7 => 1, 2, 6, 9
                    else if (ch_val(values, ['', '', bot_char, '', user_char, '', '', user_char, ''])) return 1;  // 5, 3, 8 => 2
                    else if (ch_val(values, ['', '', bot_char, '', user_char, '', '', '', user_char])) return 0;  // 5, 3, 9 => 1

                    else if (ch_val(values, [user_char, '', '', '', user_char, '', bot_char, '', ''])) return 8;  // 5, 7, 1 => 9
                    else if (ch_val(values, ['', user_char, '', '', user_char, '', bot_char, '', ''])) return 7;  // 5, 7, 2 => 8
                    else if (ch_val(values, ['', '', user_char, '', user_char, '', bot_char, '', ''])) return getRandomItem([0, 3, 7, 8]);  // 5, 7, 3 => 
                    else if (ch_val(values, ['', '', '', user_char, user_char, '', bot_char, '', ''])) return 5;  // 5, 7, 4 => 6
                    else if (ch_val(values, ['', '', '', '', user_char, user_char, bot_char, '', ''])) return 3;  // 5, 7, 6 => 4
                    else if (ch_val(values, ['', '', '', '', user_char, '', bot_char, user_char, ''])) return 1;  // 5, 7, 8 => 2
                    else if (ch_val(values, ['', '', '', '', user_char, '', bot_char, '', user_char])) return 0;  // 5, 7, 9 => 1

                    else if (ch_val(values, [user_char, '', '', '', user_char, '', '', '', bot_char])) return getRandomItem([2, 5, 6, 7]);  // 5, 9, 1 => 3, 6, 7, 8
                    else if (ch_val(values, ['', user_char, '', '', user_char, '', '', '', bot_char])) return 7;  // 5, 9, 2 => 8
                    else if (ch_val(values, ['', '', user_char, '', user_char, '', '', '', bot_char])) return 6;  // 5, 9, 3 => 7
                    else if (ch_val(values, ['', '', '', user_char, user_char, '', '', '', bot_char])) return 5;  // 5, 9, 4 => 6
                    else if (ch_val(values, ['', '', '', '', user_char, user_char, '', '', bot_char])) return 3;  // 5, 9, 6 => 4
                    else if (ch_val(values, ['', '', '', '', user_char, '', user_char, '', bot_char])) return 2;  // 5, 9, 7 => 3
                    else if (ch_val(values, ['', '', '', '', user_char, '', '', user_char, bot_char])) return 1;  // 5, 9, 8 => 2
                        
                        
                    else if (ch_val(values, [user_char, '', bot_char, '', '', user_char, '', '', ''])) return 4;  // 6, 3, 1 => 5
                    else if (ch_val(values, ['', user_char, bot_char, '', '', user_char, '', '', ''])) return 4;  // 6, 3, 2 => 5
                    else if (ch_val(values, ['', '', bot_char, user_char, '', user_char, '', '', ''])) return 4;  // 6, 3, 4 => 5
                    else if (ch_val(values, ['', '', bot_char, '', user_char, user_char, '', '', ''])) return 3;  // 6, 3, 5 => 4
                    else if (ch_val(values, ['', '', bot_char, '', '', user_char, user_char, '', ''])) return getRandomItem([0, 3, 4]);  // 6, 3, 7 => 1, 4, 5
                    else if (ch_val(values, ['', '', bot_char, '', '', user_char, '', user_char, ''])) return 4;  // 6, 3, 8 => 5
                    else if (ch_val(values, ['', '', bot_char, '', '', user_char, '', '', user_char])) return getRandomItem([4, 6]);  // 6, 3, 9 => 5, 7
                    
                    else if (ch_val(values, [user_char, '', '', '', bot_char, user_char, '', '', ''])) return 2;  // 6, 5, 1 => 3
                    else if (ch_val(values, ['', user_char, '', '', bot_char, user_char, '', '', ''])) return 2;  // 6, 5, 2 => 3
                    else if (ch_val(values, ['', '', user_char, '', bot_char, user_char, '', '', ''])) return 8;  // 6, 5, 3 => 9
                    else if (ch_val(values, ['', '', '', user_char, bot_char, user_char, '', '', ''])) return getRandomItem([0, 2, 6, 8]);  // 6, 5, 4 => 1, 3, 7, 9
                    else if (ch_val(values, ['', '', '', '', bot_char, user_char, user_char, '', ''])) return 8;  // 6, 5, 7 => 9
                    else if (ch_val(values, ['', '', '', '', bot_char, user_char, '', user_char, ''])) return 8;  // 6, 5, 8 => 9
                    else if (ch_val(values, ['', '', '', '', bot_char, user_char, '', '', user_char])) return 2;  // 6, 5, 9 => 3

                    else if (ch_val(values, [user_char, '', '', '', '', user_char, '', '', bot_char])) return 4;  // 6, 9, 1 => 5
                    else if (ch_val(values, ['', user_char, '', '', '', user_char, '', '', bot_char])) return 4;  // 6, 9, 2 => 5
                    else if (ch_val(values, ['', '', user_char, '', '', user_char, '', '', bot_char])) return getRandomItem([0, 4]);  // 6, 9, 3 => 1, 5
                    else if (ch_val(values, ['', '', '', user_char, '', user_char, '', '', bot_char])) return 4;  // 6, 9, 4 => 5
                    else if (ch_val(values, ['', '', '', '', user_char, user_char, '', '', bot_char])) return 3;  // 6, 9, 5 => 4
                    else if (ch_val(values, ['', '', '', '', '', user_char, user_char, '', bot_char])) return 4;  // 6, 9, 7 => 5
                    else if (ch_val(values, ['', '', '', '', '', user_char, '', user_char, bot_char])) return 4;  // 6, 9, 8 => 5

                        
                    else if (ch_val(values, [user_char, '', '', bot_char, '', '', user_char, '', ''])) return 4;  // 7, 4, 1 => 5
                    else if (ch_val(values, ['', user_char, '', bot_char, '', '', user_char, '', ''])) return 4;  // 7, 4, 2 => 5
                    else if (ch_val(values, ['', '', user_char, bot_char, '', '', user_char, '', ''])) return 4;  // 7, 4, 3 => 5
                    else if (ch_val(values, ['', '', '', bot_char, user_char, '', user_char, '', ''])) return 2;  // 7, 4, 5 => 3
                    else if (ch_val(values, ['', '', '', bot_char, '', user_char, user_char, '', ''])) return 8;  // 7, 4, 6 => 9
                    else if (ch_val(values, ['', '', '', bot_char, '', '', user_char, user_char, ''])) return 8;  // 7, 4, 8 => 9
                    else if (ch_val(values, ['', '', '', bot_char, '', '', user_char, '', user_char])) return 7;  // 7, 4, 9 => 8

                    else if (ch_val(values, [user_char, '', '', '', bot_char, '', user_char, '', ''])) return 3;  // 7, 5, 1 => 4
                    else if (ch_val(values, ['', user_char, '', '', bot_char, '', user_char, '', ''])) return 0;  // 7, 5, 2 => 1
                    else if (ch_val(values, ['', '', user_char, '', bot_char, '', user_char, '', ''])) return getRandomItem([0, 8]);  // 7, 5, 3 => 1, 9
                    else if (ch_val(values, ['', '', '', user_char, bot_char, '', user_char, '', ''])) return 0;  // 7, 5, 4 => 1
                    else if (ch_val(values, ['', '', '', '', bot_char, user_char, user_char, '', ''])) return 8;  // 7, 5, 6 => 9
                    else if (ch_val(values, ['', '', '', '', bot_char, '', user_char, user_char, ''])) return 8;  // 7, 5, 8 => 9
                    else if (ch_val(values, ['', '', '', '', bot_char, '', user_char, '', user_char])) return 7;  // 7, 5, 9 => 8

                    else if (ch_val(values, [user_char, '', '', '', '', '', user_char, bot_char, ''])) return 3;  // 7, 8, 1 => 4
                    else if (ch_val(values, ['', user_char, '', '', '', '', user_char, bot_char, ''])) return 0;  // 7, 8, 2 => 1
                    else if (ch_val(values, ['', '', user_char, '', '', '', user_char, bot_char, ''])) return 4;  // 7, 8, 3 => 5
                    else if (ch_val(values, ['', '', '', user_char, '', '', user_char, bot_char, ''])) return 0;  // 7, 8, 4 => 1
                    else if (ch_val(values, ['', '', '', '', user_char, '', user_char, bot_char, ''])) return 2;  // 7, 8, 5 => 3
                    else if (ch_val(values, ['', '', '', '', '', user_char, user_char, bot_char, ''])) return 4;  // 7, 8, 6 => 5
                    else if (ch_val(values, ['', '', '', '', '', '', user_char, bot_char, user_char])) return 4;  // 7, 8, 9 => 5

                        
                    else if (ch_val(values, [user_char, '', '', '', bot_char, '', '', user_char, ''])) return 6;  // 8, 5, 1 => 7
                    else if (ch_val(values, ['', user_char, '', '', bot_char, '', '', user_char, ''])) return getRandomItem([0, 2, 6, 8]);  // 8, 5, 2 => 1, 3, 7, 9
                    else if (ch_val(values, ['', '', user_char, '', bot_char, '', '', user_char, ''])) return 8;  // 8, 5, 3 => 9
                    else if (ch_val(values, ['', '', '', user_char, bot_char, '', '', user_char, ''])) return 6;  // 8, 5, 4 => 7
                    else if (ch_val(values, ['', '', '', '', bot_char, user_char, '', user_char, ''])) return 8;  // 8, 5, 6 => 9
                    else if (ch_val(values, ['', '', '', '', bot_char, '', user_char, user_char, ''])) return 8;  // 8, 5, 7 => 9
                    else if (ch_val(values, ['', '', '', '', bot_char, '', '', user_char, user_char])) return 6;  // 8, 5, 9 => 7

                    else if (ch_val(values, [user_char, '', '', '', '', '', bot_char, user_char, ''])) return 4;  // 8, 7, 1 => 5
                    else if (ch_val(values, ['', user_char, '', '', '', '', bot_char, user_char, ''])) return 4;  // 8, 7, 2 => 5
                    else if (ch_val(values, ['', '', user_char, '', '', '', bot_char, user_char, ''])) return 4;  // 8, 7, 3 => 5
                    else if (ch_val(values, ['', '', '', user_char, '', '', bot_char, user_char, ''])) return 4;  // 8, 7, 4 => 5
                    else if (ch_val(values, ['', '', '', '', user_char, '', bot_char, user_char, ''])) return 1;  // 8, 7, 5 => 2
                    else if (ch_val(values, ['', '', '', '', '', user_char, bot_char, user_char, ''])) return 4;  // 8, 7, 6 => 5
                    else if (ch_val(values, ['', '', '', '', '', '', bot_char, user_char, user_char])) return getRandomItem([2, 4]);  // 8, 7, 9 => 3, 5
                        
                    else if (ch_val(values, [user_char, '', '', '', '', '', '', user_char, bot_char])) return 1;  // 8, 9, 1 => 2
                    else if (ch_val(values, ['', user_char, '', '', '', '', '', user_char, bot_char])) return 4;  // 8, 9, 2 => 5
                    else if (ch_val(values, ['', '', user_char, '', '', '', '', user_char, bot_char])) return 4;  // 8, 9, 3 => 5
                    else if (ch_val(values, ['', '', '', user_char, '', '', '', user_char, bot_char])) return 4;  // 8, 9, 4 => 5
                    else if (ch_val(values, ['', '', '', '', user_char, '', '', user_char, bot_char])) return 1;  // 8, 9, 5 => 2
                    else if (ch_val(values, ['', '', '', '', '', user_char, '', user_char, bot_char])) return 4;  // 8, 9, 6 => 5
                    else if (ch_val(values, ['', '', '', '', '', '', user_char, user_char, bot_char])) return getRandomItem([0, 4]);  // 8, 9, 7 => 1, 5
                        
                    
                    else if (ch_val(values, [user_char, '', '', '', bot_char, '', '', '', user_char])) return getRandomItem([2, 6]);  // 9, 5, 1 => 3, 7
                    else if (ch_val(values, ['', user_char, '', '', bot_char, '', '', '', user_char])) return 2;  // 9, 5, 2 => 3
                    else if (ch_val(values, ['', '', user_char, '', bot_char, '', '', '', user_char])) return 5;  // 9, 5, 3 => 6
                    else if (ch_val(values, ['', '', '', user_char, bot_char, '', '', '', user_char])) return 6;  // 9, 5, 4 => 7
                    else if (ch_val(values, ['', '', '', '', bot_char, user_char, '', '', user_char])) return 2;  // 9, 5, 6 => 3
                    else if (ch_val(values, ['', '', '', '', bot_char, '', user_char, '', user_char])) return 7;  // 9, 5, 7 => 8
                    else if (ch_val(values, ['', '', '', '', bot_char, '', '', user_char, user_char])) return 6;  // 9, 5, 8 => 7
                    
                    else if (ch_val(values, [user_char, '', '', '', '', bot_char, '', '', user_char])) return 4;  // 9, 6, 1 => 5
                    else if (ch_val(values, ['', user_char, '', '', '', bot_char, '', '', user_char])) return 4;  // 9, 6, 2 => 5
                    else if (ch_val(values, ['', '', user_char, '', '', bot_char, '', '', user_char])) return 4;  // 9, 6, 3 => 5
                    else if (ch_val(values, ['', '', '', user_char, '', bot_char, '', '', user_char])) return getRandomItem([4, 6]);  // 9, 6, 4 => 5, 7
                    else if (ch_val(values, ['', '', '', '', user_char, bot_char, '', '', user_char])) return 7;  // 9, 6, 5 => 8
                    else if (ch_val(values, ['', '', '', '', '', bot_char, user_char, '', user_char])) return 7;  // 9, 6, 7 => 8
                    else if (ch_val(values, ['', '', '', '', '', bot_char, '', user_char, user_char])) return 6;  // 9, 6, 8 => 7
                        
                    else if (ch_val(values, [user_char, '', '', '', '', '', '', bot_char, user_char])) return 4;  // 9, 8, 1 => 5
                    else if (ch_val(values, ['', user_char, '', '', '', '', '', bot_char, user_char])) return 2;  // 9, 8, 2 => 3
                    else if (ch_val(values, ['', '', user_char, '', '', '', '', bot_char, user_char])) return 5;  // 9, 8, 3 => 6
                    else if (ch_val(values, ['', '', '', user_char, '', '', '', bot_char, user_char])) return 5;  // 9, 8, 4 => 6
                    else if (ch_val(values, ['', '', '', '', user_char, '', '', bot_char, user_char])) return 0;  // 9, 8, 5 => 1
                    else if (ch_val(values, ['', '', '', '', '', user_char, '', bot_char, user_char])) return 2;  // 9, 8, 6 => 3
                    else if (ch_val(values, ['', '', '', '', '', '', user_char, bot_char, user_char])) return 4;  // 9, 8, 7 => 5

                    else {

                        let game_null_items = [];

                        for (let index = 0; index < game_items.length; index++) {

                            const game_item = game_items[index];

                            if (game_item.value == '') game_null_items.push(index);

                        }

                        console.log("bot chooses randomly!");

                        return getRandomItem(game_null_items);
                        
                    };

                }

                return checker_values(values);
            }

            for (let i = 0; i < game_options.length; i++) {

                const game_option = game_options[i];

                game_option.addEventListener('click', (event) => {

                    var this_option = event.srcElement;

                    this_option.value = sessionStorage.getItem('turn');

                    this_option.disabled = true;

                    let values = [];

                    for (let i = 0; i < game_options.length; i++) {

                        const game_option = game_options[i];

                        values[i] = game_option.value;

                    }

                    let status = values.join('').length < 8;

                    checker(game_options);

                    if (sessionStorage.getItem('turn') != sessionStorage.getItem('you') && status) {

                        gameBox.classList.add('loading');

                        setTimeout(() => {

                            try {
                                game_options[checker_items_bot(game_options)].click();
                            } catch (error) {}

                            setTimeout(() => gameBox.classList.remove('loading'), 500);

                        }, 250);

                    }
                });
            }

        } else if (rival == 'user') {

            const checker = game_all_options => {

                var res = checkGame(game_all_options);

                if (res.X) this.alert().victory(`User_X won!`);
                else if (res.O) this.alert().victory(`User_O won!`);
                else {
                    if (res.status) this.alert().equal('Severe equal.');
                    else setTurn();
                }

            }

            for (let i = 0; i < game_options.length; i++) {

                const game_option = game_options[i];

                game_option.addEventListener('click', (event) => {

                    var this_option = event.srcElement;

                    this_option.value = sessionStorage.getItem('turn');

                    this_option.disabled = true;

                    checker(game_options);

                });

            }

        } else this.start();

    }
    alert() {

        const show = (status, title) => {

            const alertBox = document.createElement('section');

            alertBox.setAttribute('id', 'alert');

            alertBox.classList.add(status);

            var _alert = document.createElement('div');

            var _alert_title = document.createElement('h2');

            _alert_title.innerText = title;

            _alert.appendChild(_alert_title);

            var _alert_btn_box = document.createElement('div');

            var _alert_btn_reset = document.createElement('button');

            var _alert_btn_reset_img = new Image();
            _alert_btn_reset_img.loading = 'lazy';
            _alert_btn_reset_img.title = "Play from Beginning";
            _alert_btn_reset_img.src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMzMwLjI0MiAzMzAuMjQyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMzAuMjQyIDMzMC4yNDI7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBkPSJNMzI0LjQ0MiwxMjkuODExbC00MS4zMjEtMzMuNjc3VjQyLjI3NWMwLTYuMDY1LTQuOTM1LTExLTExLTExaC0yNmMtNi4wNjUsMC0xMSw0LjkzNS0xMSwxMXYxNC43MzdsLTU1LjIxMy00NC45OTkgYy0zLjk5NC0zLjI1NC05LjI1OC01LjA0Ny0xNC44MjItNS4wNDdjLTUuNTQyLDAtMTAuNzgxLDEuNzgyLTE0Ljc1Myw1LjAxOUw1LjgsMTI5LjgxYy02LjU2Nyw1LjM1MS02LjE3MywxMC4wMTItNS4zNTQsMTIuMzE0IGMwLjgxNywyLjI5NywzLjQ0OCw2LjE1MSwxMS44ODQsNi4xNTFoMTkuNzkxdjE1NC45NDdjMCwxMS4wNTgsOC45NzIsMjAuMDUzLDIwLDIwLjA1M2g2Mi41YzEwLjkzNSwwLDE5LjUtOC44MDksMTkuNS0yMC4wNTMgdi02My41NDFjMC01LjQ0Niw1LjAwNS0xMC40MDUsMTAuNS0xMC40MDVoNDJjNS4yMzgsMCw5LjUsNC42NjgsOS41LDEwLjQwNXY2My41NDFjMCwxMC44Nyw5LjM4OCwyMC4wNTMsMjAuNSwyMC4wNTNoNjEuNSBjMTEuMDI4LDAsMjAtOC45OTYsMjAtMjAuMDUzVjE0OC4yNzVoMTkuNzkxYzguNDM2LDAsMTEuMDY2LTMuODU0LDExLjg4NC02LjE1MUMzMzAuNjE1LDEzOS44MjIsMzMxLjAwOSwxMzUuMTYxLDMyNC40NDIsMTI5LjgxMXoiLz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4=';

            _alert_btn_reset.appendChild(_alert_btn_reset_img);

            _alert_btn_reset.addEventListener('click', event => {
                clearInterval(this.ch_it_time);
                this.start();
            });

            _alert_btn_box.appendChild(_alert_btn_reset);

            var _alert_btn_repeat = document.createElement('button');

            var _alert_btn_repeat_img = new Image();
            _alert_btn_repeat_img.loading = 'lazy';
            _alert_btn_repeat_img.title = "Repeat Game";
            _alert_btn_repeat_img.src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pg0KPHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IiB2aWV3Qm94PSIwIDAgMzI5LjAyOCAzMjkuMDI4IiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCAzMjkuMDI4IDMyOS4wMjg7IiB4bWw6c3BhY2U9InByZXNlcnZlIj48cGF0aCBkPSJNMjQxLjg1Miw3Mi40NTlsMTAuODQ3LTU0LjUzM2MxLjE4NC01Ljk1LTEuMzM0LTEyLjAyOC02LjM3OC0xNS4zOThjLTUuMDQ1LTMuMzctMTEuNjIzLTMuMzctMTYuNjY3LDAgTDE1Ni4xODIsNTEuNjJjLTAuMDA0LDAuMDAzLTAuMDA4LDAuMDA2LTAuMDEyLDAuMDA5Yy0wLjQxNSwwLjI3OC0wLjgxNywwLjU3Ni0xLjIwMSwwLjg5M2MtMC4yMTksMC4xODEtMC40MTgsMC4zNzctMC42MjUsMC41NjggYy0wLjE0OCwwLjEzNy0wLjMwNCwwLjI2NS0wLjQ0NywwLjQwOGMtMC4yNDksMC4yNS0wLjQ3OCwwLjUxNC0wLjcwNywwLjc3OGMtMC4wODgsMC4xMDEtMC4xODMsMC4xOTYtMC4yNjgsMC4yOTkgYy0wLjIwOCwwLjI1My0wLjM5NiwwLjUxOS0wLjU4NiwwLjc4M2MtMC4wOTUsMC4xMzItMC4xOTcsMC4yNTktMC4yODgsMC4zOTRjLTAuMTU1LDAuMjMyLTAuMjkyLDAuNDczLTAuNDMzLDAuNzEyIGMtMC4xMDksMC4xODUtMC4yMjUsMC4zNjUtMC4zMjcsMC41NTRjLTAuMTA0LDAuMTk1LTAuMTkyLDAuMzk3LTAuMjg4LDAuNTk3Yy0wLjExOCwwLjI0NS0wLjI0LDAuNDg3LTAuMzQ0LDAuNzM5IGMtMC4wNjQsMC4xNTYtMC4xMTUsMC4zMTctMC4xNzQsMC40NzVjLTAuMTEyLDAuMjk5LTAuMjI3LDAuNTk4LTAuMzIsMC45MDZjLTAuMDQyLDAuMTM3LTAuMDY5LDAuMjc2LTAuMTA2LDAuNDE0IGMtMC4wOSwwLjMyOS0wLjE4MSwwLjY1OC0wLjI0OCwwLjk5NmMtMC4wNDUsMC4yMjMtMC4wNjgsMC40NS0wLjEwMywwLjY3NWMtMC4wMzgsMC4yNTItMC4wODgsMC41MDEtMC4xMTMsMC43NTggYy0wLjA1MSwwLjQ5OC0wLjA3NSwwLjk5OC0wLjA3NiwxLjVjMCwwLjAwNC0wLjAwMSwwLjAwOS0wLjAwMSwwLjAxM2MwLDAuMDU4LDAuMDA4LDAuMTEzLDAuMDA5LDAuMTcgYzAuMDA0LDAuNDM3LDAuMDIzLDAuODc0LDAuMDY2LDEuMzExYzAuMDE2LDAuMTU2LDAuMDQ1LDAuMzA3LDAuMDY1LDAuNDYxYzAuMDQzLDAuMzMyLDAuMDg2LDAuNjY0LDAuMTUxLDAuOTk0IGMwLjA0MiwwLjIxMiwwLjEwMiwwLjQxOCwwLjE1MiwwLjYyN2MwLjA2NCwwLjI2NCwwLjEyNCwwLjUyOSwwLjIwNCwwLjc5MWMwLjA3NywwLjI1NiwwLjE3MywwLjUwMywwLjI2NCwwLjc1MyBjMC4wNzYsMC4yMDgsMC4xNDMsMC40MTgsMC4yMjksMC42MjRjMC4xMjYsMC4zMDUsMC4yNzIsMC41OTgsMC40MTgsMC44OTJjMC4wNzIsMC4xNDYsMC4xMzQsMC4yOTUsMC4yMTEsMC40MzggYzAuMjAzLDAuMzc5LDAuNDI2LDAuNzQ1LDAuNjYsMS4xMDRjMC4wMzYsMC4wNTUsMC4wNjQsMC4xMTMsMC4xLDAuMTY3bDAuMDE5LDAuMDI4YzAuMDEsMC4wMTUsMC4wMiwwLjAzLDAuMDMsMC4wNDVsNDkuMDQ0LDczLjQwMSBjMi44MTcsNC4yMTcsNy41MjUsNi42NjcsMTIuNDcsNi42NjdjMC45NzEsMCwxLjk1Mi0wLjA5NCwyLjkyOC0wLjI4OGM1Ljk1MS0xLjE4NCwxMC42MDItNS44MzUsMTEuNzg2LTExLjc4Nmw3LjA1Mi0zNS40NTUgYzIzLjkwMSwyMC4xODgsMzkuMTEsNTAuMzYsMzkuMTEsODQuMDIzYzAsNjAuNjM2LTQ5LjMzMSwxMDkuOTY4LTEwOS45NjcsMTA5Ljk2OGMtNjAuNjM3LDAtMTA5Ljk2OS00OS4zMzItMTA5Ljk2OS0xMDkuOTY4IGMwLTQwLjE3OSwyMS45MS03Ny4xNTMsNTcuMTc5LTk2LjQ5NGM3LjI2NC0zLjk4Myw5LjkyMy0xMy4xMDEsNS45NC0yMC4zNjVjLTMuOTgzLTcuMjY0LTEzLjEwMS05LjkyNC0yMC4zNjUtNS45NCBDNTIuNDI0LDkwLjg3MSwyNC41NDYsMTM3LjkyNCwyNC41NDYsMTg5LjA2YzAsNzcuMTc4LDYyLjc5LDEzOS45NjgsMTM5Ljk2OSwxMzkuOTY4Yzc3LjE3OCwwLDEzOS45NjctNjIuNzksMTM5Ljk2Ny0xMzkuOTY4IEMzMDQuNDgyLDE0MC40NTMsMjc5LjU3MSw5Ny41NiwyNDEuODUyLDcyLjQ1OXoiLz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48Zz48L2c+PGc+PC9nPjxnPjwvZz48L3N2Zz4=';

            _alert_btn_repeat.appendChild(_alert_btn_repeat_img);

            _alert_btn_repeat.addEventListener('click', event => {

                clearInterval(this.ch_it_time);

                try {

                    document.querySelector('#game-box').remove();

                    document.querySelector('#turn').remove();

                    event.srcElement.parentNode.parentNode.parentNode.parentNode.remove();

                    this.checkUpStart(sessionStorage.getItem('rival'));

                } catch (error) {
                    console.error(error);
                    _alert_btn_repeat.click();
                }

            });

            _alert_btn_box.appendChild(_alert_btn_repeat);

            _alert.appendChild(_alert_btn_box);

            alertBox.appendChild(_alert);

            this.app.appendChild(alertBox);

        }

        return {
            victory: (text) => show('victory', text),
            equal: (text) => show('equal', text),
            lost: (text) => show('lost', text),
        };

    }
    getTypeRival() {  /* determining type of rival */

        var g3_box = document.createElement('section');

        g3_box.id = 'getTypeRival';

        var title_g3 = document.createElement('h2');

        title_g3.id = 'title_g3';

        title_g3.innerText = title_g3.innerText = "choose your rival";

        var g3_items = document.createElement('div');

        g3_items.id = 'g3_items';

        var label_user = document.createElement('label');

        label_user.setAttribute('for', "user_rival")

        label_user.innerText = "User"

        var rbtn_user = document.createElement('input');
        rbtn_user.id = "user_rival";
        rbtn_user.value = "user";

        var label_bot = document.createElement('label');

        label_bot.setAttribute('for', "bot_rival")

        label_bot.innerText = "Robot"

        var rbtn_bot = document.createElement('input');
        rbtn_bot.id = "bot_rival";
        rbtn_bot.value = "bot";
        // rbtn_bot.checked = true;

        rbtn_user.type = rbtn_bot.type = 'radio';

        rbtn_user.name = rbtn_bot.name = 'rival';

        const next = event => {

            var rival = document.querySelector('input[name="rival"]:checked').value;

            rival = (rival == 'user' ? rival : 'bot');

            document.querySelector('#getTypeRival').remove();

            this.checkUpStart(rival);

        }

        rbtn_user.addEventListener('click', next);

        rbtn_bot.addEventListener('click', next);

        g3_box.appendChild(title_g3);

        g3_items.appendChild(rbtn_user);

        g3_items.appendChild(label_user);

        g3_items.appendChild(rbtn_bot);

        g3_items.appendChild(label_bot);

        g3_box.appendChild(g3_items);

        this.app.appendChild(g3_box);

    }
    getTurnGame() {

        var turns = ['X', 'O'];

        var first_turn = turns[random(0, 2)];

        return first_turn;

    }
    createGameOpts() {

        var turnBox = document.createElement('div');

        turnBox.id = "turn";

        turnBox.innerText = 'Turn‌‌‌: ';

        var turn_text = document.createElement('span');

        turn_text.innerText = 'you';

        turnBox.appendChild(turn_text);

        this.app.appendChild(turnBox);


        var gameBox = document.createElement('section');

        gameBox.id = "game-box";

        for (let index = 0; index < 9; index++) {

            let gameOpt = document.createElement('input');

            gameOpt.type = 'button';

            gameOpt.value = '';

            gameOpt.setAttribute('game-option', '');

            gameBox.appendChild(gameOpt)

        }

        this.app.appendChild(gameBox);

    }
}
