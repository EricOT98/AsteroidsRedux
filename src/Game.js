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
    this.gameLoaded = false; //Bool for checking when game is fully loaded.

    this.AssetManager = new AssetManager("assets/jsonAssets.json");           //Creates asset manager.
    this.AssetManager.queueDownloadImage('assets/images/PlayerShip.png');     //Adds path to download Queue
    this.AssetManager.downloadAllImages(() => {
      this.player = new Player(100,100,50);
      this.player.setSprite(this.AssetManager.getAsset('assets/images/PlayerShip.png'));
      console.log("Loaded complete");
      this.gameLoaded = true;
    });                                                                       //Downloads all Images, When complete inside of function executes.


    this.keyboardManager = new KeyboardManager(["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"]);
    this.wasUp = true;

  }

  init() {
  }

  /**
   * updates the game
   */
  update() {

    if(this.gameLoaded){
      this.player.update();
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
  }
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
