import { TicTacToe } from "./tictactoe.js";

const game = new TicTacToe();
window.addEventListener('DOMContentLoaded', event => {
    document.getElementById('set-rival-ai').onclick = event => game.init("BOT");
    document.getElementById('set-rival-user').onclick = event => game.init("USER");
});
