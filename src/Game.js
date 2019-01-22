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
    this.player = new Player(100,100,100);
    this.keyboardManager = new KeyboardManager(["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"]);
    this.player = new Player(100,100,100);


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
    this.player.update();
    window.requestAnimationFrame(gameNs.game.update.bind(gameNs.game));

    this.player.isThrusting = (this.keyboardManager["KeyW"]);

    if(this.keyboardManager["KeyD"])
    {
      this.player.turn(1);
    }
    if(this.keyboardManager["KeyA"])
    {
      this.player.turn(-1);
    }
  }

  /**
   * draws the game
   */
  draw() {
    var canv = document.getElementById("canvas");
    var ctx = canv.getContext("2d");


    ctx.clearRect(0, 0, canv.width, canv.height);
<<<<<<< HEAD
<<<<<<< HEAD
    console.log("Draw");
    this.player.draw(ctx);
=======
=======

>>>>>>> Added movement
    this.player.draw(ctx);

>>>>>>> solved conflicts
  }
}
