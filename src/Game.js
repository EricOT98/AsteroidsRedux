/**
 * Game class
 * @class
 * @classdesc This game class initialises and runs the game.
 */
class Game {

  /**
   * @constructor
   * @desc simple game constructor
   */
  constructor() {
    this.keyboardManager = new KeyboardManager();
  }

  init() {
  }

  /**
   * updates the game
   */
  update() {
    this.draw();
    window.requestAnimationFrame(gameNs.game.update.bind(gameNs.game));
  }

  /**
   * draws the game
   */
  draw() {
    var canv = document.getElementById("canvas");
    var ctx = canv.getContext("2d");
    ctx.clearRect(0, 0, canv.width, canv.height);
    if(this.keyboardManager.keyStatusDict["KeyW"]){
      console.log("W pressed");
    }
    console.log("Draw");
  }
}