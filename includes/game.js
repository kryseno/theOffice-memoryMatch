function MemoryMatchGame(){
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
    this.initializeGame = function(){
        var images = this.imageList.concat(this.imageList);
        console.log('take imageList & added itself onto it (doubling it)');
        this.cards = this.createCards(images);
    }
    this.createCards = function(images){
        var cardList = [];
        for(var i=0; i<images.length; i++){
            console.log('making a new card commences');
            var newCard = new Card(images[i], this);
            var cardDomElement = newCard.render();
            $(".game-area").append(cardDomElement);
            cardList.push(newCard);
        }
        return cardList;
    }
    this.handleCardClick = function(){
        
    }
}