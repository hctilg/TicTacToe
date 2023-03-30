import { Game } from "./game.js";

document.addEventListener('DOMContentLoaded', event => {

    const app = document.body;

    app.id = 'app';

    // create a TicTacToe Game
    const game = new Game(app);

    game.start();

});

document.addEventListener('contextmenu', event => event.preventDefault(), false);

document.addEventListener('keydown', event => {
    if (event.code != "F11") event.preventDefault();
}, false);
