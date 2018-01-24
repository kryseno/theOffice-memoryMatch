$(document).ready(initializeApp);
let game = null;

function initializeApp() {
    game = new MemoryMatchGame();
    game.initializeGame();
}