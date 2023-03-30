import { Game } from "./game.js";

window.addEventListener('DOMContentLoaded', event => {
    const app = document.body;
    app.setAttribute('id', 'app');
    
    const game = new Game(app);
    game.start();
});
