function Card(frontImg, backImg, parentObj) {
    this.frontImg = frontImg;
    this.backImg = backImg;
    this.parentObj = parentObj;
    this.renderedElement = null;

    this.render = function(){
        var cardContainer = $("<div>", {
            class: 'cardContainer'
        });
        cardContainer.click(this.handleClick.bind(this));

        var card = $("<div>", {
            class: 'card flipped',
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
        card.append(front, back);
        cardContainer.append(card);
        this.renderedElement = cardContainer;
        return cardContainer;
    }

    this.handleClick = function(){
        this.parentObj.handleCardClick(this);
        this.parentObj.updateStats();
    }

    this.revealSelf = function(){
        this.renderedElement.find('.card').toggleClass('flipped');
    }

    this.hideSelf = function(){
        this.renderedElement.find('.card').toggleClass('flipped');
        this.renderedElement.find('.back').show();
    }

    this.cardMatch = function(){
        this.renderedElement.fadeTo(400, 0, function(){
            this.renderedElement.addClass("hidden");
        });
    }

    this.getID = function(){
        var findBeforeImgName = this.frontImg.indexOf('/');
        var findAfterImgName = this.frontImg.lastIndexOf('.');
        var cardID = frontImg.slice(findBeforeImgName+1, findAfterImgName);
        return cardID;
    }
}