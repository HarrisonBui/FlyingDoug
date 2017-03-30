const Game = require('./game.js');

width = 500;
height = 500;
keyLeft = false;
keyRight = false;

window.addEventListener("keydown", checkKeyPressed, false);
window.addEventListener("keyup", checkKeyLifted, false);

gameCanvas = document.getElementById("game-canvas");

ctx = gameCanvas.getContext("2d");



let flyingDoug = new Game();
flyingDoug.splash();

function checkKeyPressed (event) {
    switch(event.keyCode) {
        case 37:
            keyLeft = true;
            break;
        case 39:
            keyRight = true;
            break;
        case 13:
            flyingDoug.startGame();
            break;
    }
}

function checkKeyLifted (event) {
  keyLeft = false;
  keyRight = false;
}
