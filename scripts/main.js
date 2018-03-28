$(document).ready(initializeApp);
var game = null;
var handleLoader = null;

function initializeApp() {
    game = new MemoryMatchGame();
    game.initializeGame();
    // loader();
}

$(window).on("load", showContent);

function showContent() {
    $("#loader").css("display", "none");
    $(".container").css("display", "block");
}