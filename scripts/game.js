function MemoryMatchGame() {
    this.attempts = 0;
    this.backgroundImg = 'images/dunderMifflin.png';
    this.cards = [];
    this.clickedCardsList = [];
    this.gamesPlayed = 0;
    this.imageList = [
        'andy',
        'dwight',
        'gabe',
        'jim',
        'kevin',
        'michael',
        'pam',
        'stanley',
        'toby'
    ].map(image => "images/"+image+".jpg");
    this.matchCount = 0;
    this.revertTime = 2000;

    this.initializeGame = function () {
        this.setupCardImgs();
        this.handleAudio();
        this.handleReset();
        this.handleCloseX();
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
            if (this.clickedCardsList[0] == cardObjClicked){
                return;
            }
            this.clickedCardsList.push(cardObjClicked);
            cardObjClicked.revealSelf();

            if (this.clickedCardsList.length === 2) {
                if (this.clickedCardsList[0].getID() === this.clickedCardsList[1].getID()) {
                    this.matchCount++;
                    this.attempts++
                        this.accuracy();
                    setTimeout(this.hideCardMatch.bind(this), this.revertTime);
                    if (this.matchCount === this.cards.length / 2) {
                        this.playerWins();
                    }
                } else {
                    this.attempts++;
                    this.accuracy();
                    setTimeout(this.revertClickedCards.bind(this), this.revertTime);
                }
            }
        }
    }

    this.playerWins = function () {
        this.showVictoryModal();
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
    this.updateStats = function () {
        this.displayStats();
    };

    this.displayStats = function () {
        $(".attempts .value").text(this.attempts);
        $(".accuracy .value").text(this.accuracy());
    }

    this.accuracy = function () {
        var calculatedAccuracy = Math.round((this.matchCount / this.attempts) * 100);
        if(this.attempts !== 0){
            return calculatedAccuracy
        } else {
            return 0
        }
    }

    this.clearGameArea = function () {
        $(".gameArea").empty();
    }

    this.handleReset = function () {
        $(".statsButtons").on("click", "#reset", this.resetGame.bind(this));
    }

    this.resetStats = function () {
        this.gamesPlayed++;
        this.attempts = 0;
        this.matchCount = 0;
        $(".games-played .value").text(this.gamesPlayed);
        this.displayStats();
    }

    this.resetGame = function () {
        this.resetStats();
        this.clearGameArea();
        this.setupCardImgs();
    }

    /*=================================================================

                            Victory Modal

    =================================================================*/
    this.handleCloseX = function () {
        $(".close").click(this.closeModalX.bind(this));
    }

    this.showVictoryModal = function () {
        $(".modal").show();
    }

    this.closeModalX = function () {
        $(".modal").hide();
        this.resetGame();
    }

    /*=================================================================

                            Handle Audio

    =================================================================*/

    this.handleAudio = function () {
        $(".audio").on("click", "#audioBtn", this.controlSound.bind(this));
    }
    this.controlSound = function () {
        var audio = $("audio");
        if (audio[0].paused) {
            $("#audioBtn").removeClass('fa-volume-off');
            $("#audioBtn").addClass('fa-volume-up');
            audio[0].play();
        } else {
            $("#audioBtn").removeClass('fa-volume-up');
            $("#audioBtn").addClass('fa-volume-off');
            audio[0].pause();
        }
    }
}