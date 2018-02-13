function Card(frontImg, backImg, parentObj) {
    this.frontImg = frontImg;
    this.backImg = backImg;
    this.parentObj = parentObj;
    this.renderedElement = null;
    this.cardContainer = null;

    this.render = function(){
        var card = $("<div>", {
            class: 'card'
        });

        var cardContainer = $('<div>',{
            class: 'cardContainer'
        });
        
        var front = $("<div>", {
            class: 'front'
        });
        var imgSrcFront = $("<img>", {
            src: this.frontImg
        });
        var back = $("<div>", {
            class: 'back'
        });
        var imgSrcBack = $("<img>", {
            src: this.backImg
        });
        
        front.append(imgSrcFront);
        back.append(imgSrcBack)
        card.append(cardContainer);
        cardContainer.append(front, back);
        this.cardContainer = cardContainer;
        card.click(this.handleClick.bind(this));
        card.append(front, back);
        this.renderedElement = card;
        return card;
    }

    this.flip = function(){
        $(this).addClass('flipped');
    }

    this.handleClick = function(){
        this.flip.bind(this);
        this.parentObj.handleCardClick(this);
        this.parentObj.updateStats();
    }

    this.revealSelf = function(){
        this.cardContainer.addClass('flipped');
        this.renderedElement.find('.back').hide();
    }

    this.hideSelf = function(){
        this.cardContainer.removeClass('flipped');
        this.renderedElement.find('.back').show();
    }

    this.cardMatch = function(){
        this.renderedElement.addClass("hidden");
    }

    this.getID = function(){
        return this.frontImg;
    }
}