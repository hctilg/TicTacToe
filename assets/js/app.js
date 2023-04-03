import { Game } from "./game.js";

window.addEventListener('DOMContentLoaded', event => {
    const game = new Game(document.body);
    game.start();
});
