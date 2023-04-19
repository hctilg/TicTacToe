import { TicTacToe } from "./tictactoe.js";

const game = new TicTacToe();
window.onoffline = ev => ev.preventDefault();
window.addEventListener("DOMContentLoaded", ev => {
    document.getElementById("easy").onclick = ev => game.init('easy');
    document.getElementById("medium").onclick = ev => game.init('medium');
    document.getElementById("hard").onclick = ev => game.init('hard');
    document.getElementById("pvp").onclick = ev => game.init('pvp');
});