function MemoryMatchGame(){
    this.accuracy = 0;
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
        this.setupCardImgs();
        $(".reset").click(this.resetGame.bind(this));
    }

    this.setupCardImgs = function(){
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
                    this.matchCount++;
                    this.updateAttemptsAccuracy();
                    setTimeout(this.hideCardMatch.bind(this), this.revertTime);
                    if(this.matchCount === this.cards.length/2){
                        this.playerWins();
                    }
                } else {
                    console.log('issa not a match!!');
                    this.updateAttemptsAccuracy();
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

    this.updateAttemptsAccuracy = function(){
        this.attempts++;
        this.accuracy = Math.round((this.matchCount / this.attempts) * 100);

        $(".attempts .value").text(this.attempts);
        $(".accuracy .value").text(this.accuracy);
    }

    this.clearGameArea = function(){
        $(".game-area").empty();
    }

    this.resetStats = function(){
        console.log('reset stats called');
        this.gamesPlayed++;
        this.attempts = 0;
        this.accuracy = 0;
        this.matchCount = 0;
        $(".games-played .value").text(this.gamesPlayed);
        $(".attempts .value").text(this.attempts);
        $(".accuracy .value").text(this.accuracy);
    }

    this.resetGame = function(){
        this.resetStats();
        this.clearGameArea();
        this.setupCardImgs();
    }
}