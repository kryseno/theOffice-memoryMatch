$(document).ready(initializeApp);
var game = null;

function initializeApp() {
    game = new MemoryMatchGame();
    game.initializeGame();
}