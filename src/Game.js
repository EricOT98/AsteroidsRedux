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
    this.keyboardManager = new KeyboardManager(["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"]);
  }

  init() {
  }

  /**
   * updates the game
   */
  update() {
    if(this.keyboardManager["KeyW"]){
      console.log("W pressed");
    }
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
    console.log("Draw");
  }
}