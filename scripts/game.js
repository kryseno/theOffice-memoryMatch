function MemoryMatchGame() {
    // this.accuracy = 0;
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
    this.audioList = [
        'audio/office.mp3'
    ]
    this.matchCount = 0;
    this.revertTime = 2000;

    this.initializeGame = function () {
        this.setupCardImgs();
        this.handleAudio();
        this.handleReset();
        this.handleCloseX();
        // this.handleInstructionsModal();
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
                    console.log('issa match!!');
                    this.matchCount++;
                    this.attempts++
                        this.accuracy();
                    setTimeout(this.hideCardMatch.bind(this), this.revertTime);
                    if (this.matchCount === this.cards.length / 2) {
                        this.playerWins();
                    }
                } else {
                    console.log('issa not a match!!');
                    this.attempts++;
                    this.accuracy();
                    setTimeout(this.revertClickedCards.bind(this), this.revertTime);
                }
            }
        }
    }

    this.playerWins = function () {
        console.log('player wins!');
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

    this.resetStats = function () {
        console.log('reset stats called');
        this.gamesPlayed++;
        this.attempts = 0;
        // this.accuracy = 0;
        this.matchCount = 0;
        $(".games-played .value").text(this.gamesPlayed);
        this.displayStats();
    }

    this.resetGame = function () {
        console.log('reset clicked');
        this.resetStats();
        this.clearGameArea();
        this.setupCardImgs();
    }

    this.handleReset = function () {
        $(".statsButtons").on("click", "#reset", this.resetGame.bind(this));
    }

    /*=================================================================

                            Victory Modal

    =================================================================*/
    this.showVictoryModal = function () {
        console.log('victory modal shown');
        $(".modal").show();
        // this.handleCloseX();
    }

    this.handleCloseX = function () {
        $(".close").click(this.closeModalX.bind(this));
        console.log('setting click on span');
    }

    this.closeModalX = function () {
        $(".modal").hide();
        this.resetGame();
    }

    // When the user clicks anywhere outside of the modal, close it
    // window.onclick = function (event) {
    //     if (event.target == modal) {
    //         modal.style.display = "none";
    //     }
    // }

    /*=================================================================

                            Instructions Modal

    =================================================================*/
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

    /*=================================================================

                            Handle Audio

    =================================================================*/

    this.handleAudio = function () {
        $(".audio").on("click", "#audioBtn", this.controlSound.bind(this));
        // var play = $("#playAudio");
        // var pause = $("#pauseAudio");
        // play.click(this.controlSound.bind(this));
        // pause.click(this.controlSound.bind(this));
    }
    this.controlSound = function () {
        console.log('vol clicked');
        var audio = $("audio");
        if (audio[0].paused) {
            $("#audioBtn").removeClass('fa-volume-off');
            $("#audioBtn").addClass('fa-volume-up');
            audio[0].play();
        } else {
            console.log('paused music');
            $("#audioBtn").removeClass('fa-volume-up');
            $("#audioBtn").addClass('fa-volume-off');
            audio[0].pause();
        }
    }

    // this.handleAudioPlay = function () {
    //     $('#audio').on('click', '.fa-volume-up', () => {
    //         console.log('volume clicked');
    //         $('.fa-volume-up').attr('class', 'fa fa-volume-down');
    //         this.soundList[0].play();
    //     });
    // };

    // this.handleAudioStop = function () {
    //     $('#audio').on('click', '.fa-volume-down', () => {
    //         $('.fa-volume-down').attr('class', 'fa fa-volume-up');
    //         this.soundList[0].pause();
    //     });
    // };
}