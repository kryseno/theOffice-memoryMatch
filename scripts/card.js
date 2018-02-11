function Card(frontImg, backImg, parentObj) {
    this.frontImg = frontImg;
    this.backImg = backImg;
    this.parentObj = parentObj;
    this.renderedElement = null;

    this.render = function(){
        var card = $("<div>", {
            class: 'card'
        });
        card.click(this.handleClick.bind(this));
        
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
        this.renderedElement = card;
        return card;
    }

    this.handleClick = function(){
        this.parentObj.handleCardClick(this);
        this.parentObj.updateStats();
    }

    this.revealSelf = function(){
        this.renderedElement.find('.back').hide();
    }

    this.hideSelf = function(){
        this.renderedElement.find('.back').show();
    }

    this.cardMatch = function(){
        this.renderedElement.addClass("hidden");
    }

    this.getID = function(){
        return this.frontImg;
    }
}