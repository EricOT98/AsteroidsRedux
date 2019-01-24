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
    var elem = document.getElementById("myLoadingText");
    elem.innerHTML = "Loading";
    this.menuHandler = new MenuHandler();
    this.initMenus();

    this.gameLoaded = false; // Bool for checking when game is fully loaded.
    this.AssetManager = new AssetManager("assets/jsonAssets.json"); // Creates asset manager
    this.AssetManager.LoadingBar();

    // Asset List
    this.AssetManager.queueDownloadImage('assets/images/PlayerShip.png'); // Adds path to download queue
    this.AssetManager.queueDownloadImage('assets/images/player.png');
    this.AssetManager.queueDownloadImage('assets/images/spark.png');
    this.AssetManager.queueDownloadImage('assets/images/Asteroid-Large-1.png');
    this.AssetManager.queueDownloadImage('assets/images/Asteroid-Large-2.png');
    this.AssetManager.queueDownloadImage('assets/images/Asteroid-Large-3.png');
    this.AssetManager.queueDownloadImage('assets/images/Asteroid-Medium-1.png');
    this.AssetManager.queueDownloadImage('assets/images/Asteroid-Medium-2.png');
    this.AssetManager.queueDownloadImage('assets/images/Asteroid-Medium-3.png');
    this.AssetManager.queueDownloadImage('assets/images/Asteroid-Small-1.png');
    this.AssetManager.queueDownloadImage('assets/images/Asteroid-Small-2.png');
    this.AssetManager.queueDownloadImage('assets/images/Asteroid-Small-3.png');
    this.AssetManager.queueDownloadImage('assets/images/Ship-1.png');
    this.AssetManager.queueDownloadImage('assets/images/Alien-1.png');
    this.AssetManager.queueDownloadImage('assets/images/asteroid_logo.png');
    this.AssetManager.queueDownloadImage('assets/images/asteroid_logo_1.png');
    this.AssetManager.queueDownloadImage('assets/images/asteroid_logo_2.png');
    this.AssetManager.queueDownloadImage('assets/images/asteroid_logo_3.png');
    this.AssetManager.queueDownloadImage('assets/powerups/powerupshield.png');
    this.AssetManager.queueDownloadImage('assets/powerups/poweruprof.png');

    this.AssetManager.queueDownloadImage('assets/images/enemy.png');

    this.AssetManager.queueDownloadImage('assets/images/Red/Asteroid-Large-1.png');
    this.AssetManager.queueDownloadImage('assets/images/Red/Asteroid-Large-2.png');
    this.AssetManager.queueDownloadImage('assets/images/Red/Asteroid-Large-3.png');
    this.AssetManager.queueDownloadImage('assets/images/Red/Asteroid-Medium-1.png');
    this.AssetManager.queueDownloadImage('assets/images/Red/Asteroid-Medium-2.png');
    this.AssetManager.queueDownloadImage('assets/images/Red/Asteroid-Medium-3.png');
    this.AssetManager.queueDownloadImage('assets/images/Red/Asteroid-Small-1.png');
    this.AssetManager.queueDownloadImage('assets/images/Red/Asteroid-Small-2.png');
    this.AssetManager.queueDownloadImage('assets/images/Red/Asteroid-Small-3.png');

    this.AssetManager.queueDownloadImage('assets/images/Blue/Asteroid-Large-1.png');
    this.AssetManager.queueDownloadImage('assets/images/Blue/Asteroid-Large-2.png');
    this.AssetManager.queueDownloadImage('assets/images/Blue/Asteroid-Large-3.png');
    this.AssetManager.queueDownloadImage('assets/images/Blue/Asteroid-Medium-1.png');
    this.AssetManager.queueDownloadImage('assets/images/Blue/Asteroid-Medium-2.png');
    this.AssetManager.queueDownloadImage('assets/images/Blue/Asteroid-Medium-3.png');
    this.AssetManager.queueDownloadImage('assets/images/Blue/Asteroid-Small-1.png');
    this.AssetManager.queueDownloadImage('assets/images/Blue/Asteroid-Small-2.png');
    this.AssetManager.queueDownloadImage('assets/images/Blue/Asteroid-Small-3.png');

    this.AssetManager.queueDownloadImage('assets/images/Grey/Asteroid-Large-1.png');
    this.AssetManager.queueDownloadImage('assets/images/Grey/Asteroid-Large-2.png');
    this.AssetManager.queueDownloadImage('assets/images/Grey/Asteroid-Large-3.png');
    this.AssetManager.queueDownloadImage('assets/images/Grey/Asteroid-Medium-1.png');
    this.AssetManager.queueDownloadImage('assets/images/Grey/Asteroid-Medium-2.png');
    this.AssetManager.queueDownloadImage('assets/images/Grey/Asteroid-Medium-3.png');
    this.AssetManager.queueDownloadImage('assets/images/Grey/Asteroid-Small-1.png');
    this.AssetManager.queueDownloadImage('assets/images/Grey/Asteroid-Small-2.png');
    this.AssetManager.queueDownloadImage('assets/images/Grey/Asteroid-Small-3.png');

    this.AssetManager.queueDownloadImage('assets/Stars-Background-01.png');
    this.AssetManager.downloadAllImages(() => {

      // Player
      this.player = new Player(100,100,50);
      this.player.setSprite(this.AssetManager.getAsset('assets/images/Ship-1.png'));
      this.powerups = [];
      // Asteroid Manager
      this.asteroidManager = new AsteroidManager(3, 1, 3, this.AssetManager);

      // AI Alien
      this.Ai = new Alien();
      this.Ai.setImage(this.AssetManager.getAsset('assets/images/Alien-1.png'));

      // Animated Logo
      this.logoTest = new Logo(this.AssetManager.getAsset('assets/images/asteroid_logo.png'),
                        this.AssetManager.getAsset('assets/images/asteroid_logo_1.png'),
                        this.AssetManager.getAsset('assets/images/asteroid_logo_2.png'),
                        this.AssetManager.getAsset('assets/images/asteroid_logo_3.png'));


     // HUD
      this.hud = new HUD(this.AssetManager.getAsset('assets/images/Ship-1.png'));
      this.gameLoaded = true;
      console.log("Loading Complete");
      this.background = this.AssetManager.getAsset('assets/Stars-Background-01.png');
    }); // Downloads all Images, when complete inside of function executes

    this.scoreboard = new ScoreboardManager();

    this.keyboardManager = new KeyboardManager(["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"]);
    this.wasUp = true;
    this.wasUp2 = true;

    this.useNewAssets = false;

  }

  init() {
  }

  /**
   * Updates the game
   */
  update() {

    if (!this.AssetManager.loadComplete && this.menuHandler.currentScene === "Main Menu") {

      this.menuHandler.getCurrentSceneObject().transitionOut();

    }
    else if(this.menuHandler.currentScene === "Leaderboard"){
      var canv = document.getElementById("canvas");
      var ctx = canv.getContext("2d");
      ctx.clearRect(0, 0, canv.width, canv.height);
      this.menuHandler.getCurrentSceneObject().drawLeaderboard(ctx);
    }
    else if (this.AssetManager.loadComplete && this.menuHandler.currentScene === "Main Menu") {

      var elem = document.getElementById("myProgress");
      elem.hidden = true;

      this.menuHandler.getCurrentSceneObject().transitionIn();
      this.logoTest.update();

      var canv = document.getElementById("canvas");
      var ctx = canv.getContext("2d");
      ctx.clearRect(0, 0, canv.width, canv.height);
      this.logoTest.draw(ctx);

      this.scoreboard.initBoard("local");

    }

    if (this.gameLoaded && this.menuHandler.currentScene === "Game") {
      this.player.update(window.innerWidth, window.innerHeight);

      this.Ai.update(this.player.positionX, this.player.positionY);
      this.player.isThrusting = this.keyboardManager["KeyW"];
      if (this.keyboardManager["ArrowUp"] && this.wasUp2) {
        this.wasUp2 = false;
        this.useNewAssets = !this.useNewAssets;
        this.player.updateAssets(this.AssetManager, this.useNewAssets);
        this.Ai.updateAssets(this.AssetManager, this.useNewAssets);
        this.asteroidManager.updateAssets(this.useNewAssets);
      }else if (!this.keyboardManager["ArrowUp"]) {
        this.wasUp2 = true;
      }

      if (this.keyboardManager["KeyD"]) {
        this.player.turn(1);
      }
      if (this.keyboardManager["KeyA"]) {
        this.player.turn(-1);
      }
      if((this.keyboardManager["Space"] && this.wasUp) || (this.keyboardManager["Space"] && this.player.autoFire)) {
        this.wasUp = false;
        this.player.fire();
      } else if (!this.keyboardManager["Space"]) {
        this.wasUp = true;
      }

      this.asteroidManager.update();

      this.handleCollisions()
      for(var i =0; i< this.powerups.length; i++)
      {
        this.powerups[i].update();
        if(!this.powerups[i].alive){
          this.powerups.splice(i,1);
        }
      }
      this.draw();

    }
    window.requestAnimationFrame(gameNs.game.update.bind(gameNs.game));
  }

  /**
   * Handle any collisions that occur in the game
   */
  handleCollisions(){
    var playerBullets = this.player.bullets;
    var alienBullets = this.Ai.bullets;
    var asteroids = this.asteroidManager.asteroids;

    // Check collisions between player, bullets and asteroids
    for(var i = 0; i < asteroids.length; i++) {
      var asteroidX = asteroids[i].centreX;
      var asteroidY = asteroids[i].centreY;
      var asteroidRad = asteroids[i].radius;
      if(!this.player.shielded && asteroids[i].alive && circleTriangle({"x": asteroidX, "y": asteroidY}, asteroidRad, this.player.triangle[0], this.player.triangle[1], this.player.triangle[2])) {
        this.player.reset();
        this.hud.lives -= 1;
      }
      if(checkCircleCircleCollision(this.Ai.centreX, this.Ai.centreY, this.Ai.width / 2, asteroidX, asteroidY, asteroidRad) && asteroids[i].alive) {
        this.Ai.die();
      }
      for(var j = 0; j < playerBullets.length; j++) {
        var bulletX = playerBullets[j].positionX;
        var bulletY = playerBullets[j].positionY;
        var bulletRad = playerBullets[j].radius;
        if(checkCircleCircleCollision(bulletX, bulletY, bulletRad, asteroidX, asteroidY, asteroidRad) && asteroids[i].alive){
          playerBullets[j].alive = false;
          asteroids[i].destroy(this.powerups, this.player, true);
          this.hud.updateScore(this.hud.score + 50);
        }
      }
      for(var j = 0; j < alienBullets.length; j++) {
        var bulletX = alienBullets[j].positionX;
        var bulletY = alienBullets[j].positionY;
        var bulletRad = alienBullets[j].radius;
        if(checkCircleCircleCollision(bulletX, bulletY, bulletRad, asteroidX, asteroidY, asteroidRad) && asteroids[i].alive){
          alienBullets[j].alive = false;
          asteroids[i].destroy(this.powerups, this.player, true);
        }
      }
    }
    for(var i = 0; i < playerBullets.length; i++) {
      var bulletX = playerBullets[i].positionX;
      var bulletY = playerBullets[i].positionY;
      var bulletRad = playerBullets[i].radius;
      if(checkCircleCircleCollision(bulletX, bulletY, bulletRad, this.Ai.centreX, this.Ai.centreY, this.Ai.width / 2)) {
        playerBullets[i].alive = false;
        this.Ai.die();
      }
    }
    for(var i = 0; i < alienBullets.length; i++) {
      var bulletX = alienBullets[i].positionX;
      var bulletY = alienBullets[i].positionY;
      var bulletRad = alienBullets[i].radius;
      if(circleTriangle({"x": bulletX, "y": bulletY}, bulletRad, this.player.triangle[0], this.player.triangle[1], this.player.triangle[2])) {
        alienBullets[i].alive = false;
        this.hud.lives -= 1;
        this.player.reset();
      }
    }
    if(circleTriangle({"x": this.Ai.centreX, "y": this.Ai.centreY}, this.Ai.width / 2, this.player.triangle[0], this.player.triangle[1], this.player.triangle[2]) && this.Ai.isAlive) {
      this.hud.lives -= 1;
      this.player.reset();
    }
  }

  /**
   * Draws the game
   */
  draw() {
    var canv = document.getElementById("canvas");
    var ctx = canv.getContext("2d");
    ctx.clearRect(0, 0, canv.width, canv.height);
    if(this.useNewAssets)
    {
      ctx.drawImage(this.background,0, 0, window.innerWidth, window.innerHeight);
    }

    this.player.draw(ctx);
    this.Ai.draw(ctx);
    this.asteroidManager.draw(ctx);

   //Draw HUD
   this.hud.draw(ctx);

    for(var i =0; i< this.powerups.length; i++)
    {
      this.powerups[i].draw(ctx);
    }
  }

  /**
   * Initialises the game menus
   */
  initMenus() {
    let canvas = document.getElementById("canvas");
    let mainDiv = document.createElement('div');
    mainDiv.style.position = "relative";
    mainDiv.style.width = canvas.width + "px";
    mainDiv.style.height = canvas.height + "px";
    mainDiv.id = "main-div";
    mainDiv.appendChild(canvas);
    document.body.appendChild(mainDiv);

    let mainMenuScene = new MainMenuScene(this.menuHandler, this);
    this.menuHandler.addScene("Main Menu", mainMenuScene);

    let leaderboardScene = new LeaderboardScene(this.menuHandler);
    this.menuHandler.addScene("Leaderboard",leaderboardScene);

    let controlScene = new ControlsScene(this.menuHandler);
    this.menuHandler.addScene("Controls", controlScene);

    let gameScene = new GameScene(this.menuHandler);
    this.menuHandler.addScene("Game", gameScene);
    this.menuHandler._theme.setPrimary(0,0,0,0);
    this.menuHandler._theme.setSecondary(49, 49, 49, 0.5);
    this.menuHandler._theme.setTertiary(255,190,61, 0);
    this.menuHandler.applyTheme();
    gameScene.colour = "rgba(0,0,0,0)";
    this.menuHandler.showOnlyCurrentScene();
  }

  redux() {
    let retroPath = "assets/Retro/ui/";
    let modernPath = "assets/ui/";
    let pathToUse = "";
    if (this.useNewAssets) {
      this.useNewAssets = false;
      pathToUse = modernPath;
    } else {
      this.useNewAssets = true;
      pathToUse = retroPath;
    }
    this.menuHandler.scenes.forEach((scene, scenekey) => {
      scene.menus.forEach((menu, menukey) => {
        menu.buttons.forEach((button, buttonkey) => {
          let fileName = button._img.src;
          let hoverFileName = button._hoverImage.src;
          var cleanup = /["')]/g;
          fileName = fileName.split('/').pop().replace(cleanup, '');
          hoverFileName = hoverFileName.split('/').pop().replace(cleanup, '');
          console.log(fileName);
          button.makeImageButton(pathToUse + fileName);
          button.addHoverImage(pathToUse + hoverFileName);
        })
      })
    })
  }
}
