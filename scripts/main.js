$(document).ready(initializeApp);
var game = null;
var handleLoader = null;

function initializeApp() {
    game = new MemoryMatchGame();
    game.initializeGame();
    loader();
}

function loader() {
    handleloader = setTimeout(showContent, 2000);
}

function showContent() {
    $("#loader").css("display", "none");
    $(".container").css("display", "block");
}