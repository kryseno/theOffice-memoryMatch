/*
<div class="card">
    <div class="front">
        <img src="images/michael.jpg">
    </div>
    <div class="back">
        <img src="images/dunderMifflin.png">
    </div>
</div>
*/

function Card(frontImg, parentObj) {
    this.frontImg = frontImg;
    this.parentObj = parentObj;
    this.revealed = false;
    this.renderedElement = null;

    this.render = function(){
        var card = $("<div>", {
            class: 'card'
        });
        var front = $("<div>", {
            class: 'front'
        });
        var imgSrc = $("<img>", {
            src: this.frontImg
        });
        var back = $("<div>", {
            class: 'back'
        });
        front.append(imgSrc);
        card.append(front, back);
        this.renderedElement = card;
        return card;
    }
}