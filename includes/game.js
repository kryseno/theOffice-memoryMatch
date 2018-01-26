function MemoryMatchGame(){
    this.cards = [];
    this.revertTime = 3000;
    this.backgroundImg = 'images/dunderMifflin.png';
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
    this.clickedCardsList = [];

    this.initializeGame = function(){
        var images = this.imageList.concat(this.imageList);
        console.log('take imageList & added itself onto it (doubling it)');
        this.cards = this.createCards(images);
    }

    this.createCards = function(images){
        var cardList = [];
        for(var i=0; i<images.length; i++){
            console.log('making a new card commences');
            var newCard = new Card(images[i], this.backgroundImg, this);
            var cardDomElement = newCard.render();
            $(".game-area").append(cardDomElement);
            cardList.push(newCard);
        }
        return cardList;
    }

    this.handleCardClick = function(cardObjClicked){
        console.log('child was clicked',cardObjClicked);

        if(this.clickedCardsList.length < 2){
            this.clickedCardsList.push(cardObjClicked);
            cardObjClicked.revealSelf();

            if(this.clickedCardsList.length === 2){
                if(this.clickedCardsList[0].getID() === this.clickedCardsList[1].getID()){
                    console.log('issa match!!');
                } else {
                    setTimeout(this.revertClickedCards.bind(this), this.revertTime);
                }
            }
        }
    }

    this.revertClickedCards = function(){
        for(var i=0; i<this.clickedCardsList.length; i++){
            this.clickedCardsList[i].hideSelf();
        }
        this.clickedCardsList = [];
    }
}