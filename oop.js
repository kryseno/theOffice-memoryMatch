$(document).ready(initializeApp);
let game = null;

function initializeApp() {
    game = new MemoryMatchGame();
    game.initializeGame();
}

function MemoryMatchGame() {
    this.cards = [];
    this.imageList = [];
    this.initializeGame = function() {

    }
    this.createCards = function() {

    }
    this.handleCardClick = function() {
        
    }
}