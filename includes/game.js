function MemoryMatchGame(){
    this.accuracy = null;
    this.attempts = 0;
    this.backgroundImg = 'images/dunderMifflin.png';
    this.cards = [];
    this.clickedCardsList = [];
    this.gamesPlayed = 0;
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
    this.matchCount = 0;
    this.revertTime = 2000;

    this.initializeGame = function(){
        var images = this.imageList.concat(this.imageList);
        this.cards = this.createCards(images);
    }

    this.createCards = function(images){
        var cardList = [];
        for(var i=0; i<images.length; i++){
            var newCard = new Card(images[i], this.backgroundImg, this);
            var cardDomElement = newCard.render();
            $(".game-area").append(cardDomElement);
            cardList.push(newCard);
        }
        return cardList;
    }

    this.handleCardClick = function(cardObjClicked){
        if(this.clickedCardsList.length < 2){
            this.clickedCardsList.push(cardObjClicked);
            cardObjClicked.revealSelf();

            if(this.clickedCardsList.length === 2){
                if(this.clickedCardsList[0].getID() === this.clickedCardsList[1].getID()){
                    console.log('issa match!!');
                    this.matchCount += 1;
                    this.attempts += 1;
                    this.accuracy = (this.matchCount / this.attempts) * 100;
                    setTimeout(this.hideCardMatch.bind(this), this.revertTime);
                    if(this.matchCount === this.cards.length/2){
                        this.playerWins();
                    }
                } else {
                    console.log('issa not a match!!');
                    this.attempts += 1;
                    this.accuracy = (this.matchCount / this.attempts) * 100;
                    setTimeout(this.revertClickedCards.bind(this), this.revertTime);
                }
            }
        }
    }

    this.playerWins = function(){
        console.log('player wins!');
    }

    this.revertClickedCards = function(){
        for(var i=0; i<this.clickedCardsList.length; i++){
            this.clickedCardsList[i].hideSelf();
        }
        this.clearClickedCardsList();
    }

    this.clearClickedCardsList = function(){
        this.clickedCardsList = [];
    }

    this.hideCardMatch = function(){
        for(var i=0; i<this.clickedCardsList.length; i++){
            this.clickedCardsList[i].cardMatch();
        }
        this.clearClickedCardsList();
    }

    this.updateAttempts = function(){
        
    }
}