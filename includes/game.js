function MemoryMatchGame() {
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

    this.initializeGame = function () {
        this.setupCardImgs();
        // this.handleReset();
        this.handleInstructionsModal();
    }

    /*=================================================================

                    Set Up & Randomization of Cards

    =================================================================*/
    this.setupCardImgs = function () {
        var doubleImages = this.imageList.concat(this.imageList);
        var images = this.randomizeCards(doubleImages);
        this.cards = this.createCards(images);
    }

    this.randomizeCards = function (array) {
        for (var i = array.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var hold = array[i];
            array[i] = array[j];
            array[j] = hold;
        }
        return array;
    }

    /*=================================================================

                    Create Card Deck & Append to DOM

    =================================================================*/
    this.createCards = function (images) {
        var cardList = [];
        for (var i = 0; i < images.length; i++) {
            var newCard = new Card(images[i], this.backgroundImg, this);
            var cardDomElement = newCard.render();
            $(".gameArea").append(cardDomElement);
            cardList.push(newCard);
        }
        return cardList;
    }

    /*=================================================================

                        Handle Card Click Logic

    =================================================================*/
    this.handleCardClick = function (cardObjClicked) {
        if (this.clickedCardsList.length < 2) {
            this.clickedCardsList.push(cardObjClicked);
            cardObjClicked.revealSelf();

            if (this.clickedCardsList.length === 2) {
                if (this.clickedCardsList[0].getID() === this.clickedCardsList[1].getID()) {
                    console.log('issa match!!');
                    this.matchCount++;
                    this.updateAttemptsAccuracy();
                    setTimeout(this.hideCardMatch.bind(this), this.revertTime);
                    if (this.matchCount === this.cards.length / 2) {
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

    this.playerWins = function () {
        console.log('player wins!');
    }

    this.revertClickedCards = function () {
        for (var i = 0; i < this.clickedCardsList.length; i++) {
            this.clickedCardsList[i].hideSelf();
        }
        this.clearClickedCardsList();
    }

    this.clearClickedCardsList = function () {
        this.clickedCardsList = [];
    }

    this.hideCardMatch = function () {
        for (var i = 0; i < this.clickedCardsList.length; i++) {
            this.clickedCardsList[i].cardMatch();
        }
        this.clearClickedCardsList();
    }

    /*=================================================================

                    Calculate & Display Statistics

    =================================================================*/
    this.updateAttemptsAccuracy = function () {
        this.attempts++;
        this.accuracy = Math.round((this.matchCount / this.attempts) * 100);

        $(".attempts .value").text(this.attempts);
        $(".accuracy .value").text(this.accuracy);
    }

    this.clearGameArea = function () {
        $(".game-area").empty();
    }

    this.resetStats = function () {
        console.log('reset stats called');
        this.gamesPlayed++;
        this.attempts = 0;
        this.accuracy = 0;
        this.matchCount = 0;
        $(".games-played .value").text(this.gamesPlayed);
        $(".attempts .value").text(this.attempts);
        $(".accuracy .value").text(this.accuracy);
    }

    this.resetGame = function () {
        this.resetStats();
        this.clearGameArea();
        this.setupCardImgs();
    }

    this.handleReset = function () {
        $('.fa-sync').click(this.resetGame.bind(this));
        console.log('reset clicked');
    }

    /*=================================================================

                            Instructions

    =================================================================*/
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks on the button, open the modal 
    this.handleInstructionsModal = function () {
        // Get the modal
        var modal = $('.modal');
        // Get the button that opens the modal
        var btn = $("#directions");

        $(btn).click(function () {
            $(modal).css("display", "block");
            console.log('modal displayed');
        })
    }

    // When the user clicks on <span> (x), close the modal
    // span.onclick = function () {
    //     modal.style.display = "none";
    // }

    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function (event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // }
}