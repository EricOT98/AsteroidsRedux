var gameNs = {};

/**
 * Initialise and create game
 */
function main() {
    init();
    const game = new Game ();
    gameNs.game = game;
    game.init();
    game.update();
}

/**
* Initialise the canvas
*/
function init() {
    var canv = document.createElement('canvas');
    canv.id = "canvas";
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;
    document.body.appendChild(canv);
}
