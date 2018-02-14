$(document).ready(initializeApp);
var game = null;

function initializeApp() {
    game = new MemoryMatchGame();
    game.initializeGame();
    loader();
}

function loader() {
    var handleLoader;
    handleloader = setTimeout(showContent, 3000);
}

function showContent() {
    $("#loader").css("display", "none");
    $(".container").css("display", "block");
}