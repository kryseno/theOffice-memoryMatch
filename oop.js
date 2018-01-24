$(document).ready(initializeApp);
let game = null;

function initializeApp() {
    game = new MemoryMatchGame();
    game.initializeGame();
}

function MemoryMatchGame() {
    this.cards = [];
    this.imageList = [
        'images/andy.jpg',
        'images/dwight.jpg',
        'images/gabe.jpg',
        'images/jim.jpg',
        'images/kevin.jpg',
        'images/michael.jpg',
        'images/pam.jpg',
        'images/stanley.jpg',
        'images/toby.jpg'
    ];
    this.initializeGame = function() {
        const images = this.imageList.concat(this.imageList);
        console.log('take imageList & added itself onto it (doubling it)');
        this.createCards(images);
    }
    this.createCards = function() {
        
    }
    this.handleCardClick = function() {
        
    }
}