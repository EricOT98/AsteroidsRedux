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
    this.player = new Player(100,100,50);
    this.wasUp = true;

  }

  init() {
  }

  /**
   * updates the game
   */
  update() {

    this.player.update(window.innerWidth, window.innerHeight);
    this.player.isThrusting = this.keyboardManager["KeyW"];
    if(this.keyboardManager["KeyD"]){
      this.player.turn(1);
    }
    if(this.keyboardManager["KeyA"]){
      this.player.turn(-1);
    }
    if(this.keyboardManager["Space"] && this.wasUp) {
      this.wasUp = false;
      this.player.fire();
    }
    else if(!this.keyboardManager["Space"]) {
      this.wasUp = true;
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
    this.player.draw(ctx);

  }
}
