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
    this.mobObj = {};
    var elem = document.getElementById("myLoadingText");
    elem.innerHTML = "Loading";
    this.menuHandler = new MenuHandler();

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

    this.AssetManager.queueDownloadImage('assets/Retro/ui/asteroid_logo.png');
    this.AssetManager.queueDownloadImage('assets/Retro/ui/asteroid_logo_1.png');
    this.AssetManager.queueDownloadImage('assets/Retro/ui/asteroid_logo_2.png');
    this.AssetManager.queueDownloadImage('assets/Retro/ui/asteroid_logo_3.png');

    this.AssetManager.queueDownloadImage('assets/Stars-Background-01.png');
    this.AssetManager.queueDownloadImage('assets/ui/control.png');
    this.AssetManager.queueDownloadImage('assets/Retro/ui/control.png');
    this.AssetManager.queueDownloadImage('assets/Retro/ui/redux_btn.png');
    this.AssetManager.queueDownloadImage('assets/Retro/ui/redux_btn_pressed.png');
    this.AssetManager.queueDownloadImage('assets/Retro/ui/redux_btn.png');
    this.AssetManager.queueDownloadImage('assets/Retro/ui/redux_btn_pressed.png');

    // Sounds List
    this.AssetManager.queueDownloadSound('assets/sounds/fire.wav');
    this.AssetManager.queueDownloadSound('assets/sounds/bang.wav');
    this.AssetManager.queueDownloadSound('assets/sounds/kill.wav');
    this.AssetManager.queueDownloadSound('assets/sounds/music.wav');

    this.AssetManager.downloadAllSounds(() => {
      console.log("Sounds Loaded");
    });

    this.AssetManager.downloadAllImages(() => {

      // Player
      this.player = new Player(window.innerWidth / 2, window.innerHeight / 2, 50);
      this.player.setSprite(this.AssetManager.getAsset('assets/images/Ship-1.png'));
      this.powerups = [];
      // Asteroid Manager
      this.asteroidManager = new AsteroidManager(3, 1, 3, this.AssetManager);
      this.obstacleManager = new ObstacleManager();
      this.obstacleManager.initilaiseObstacles();

      // AI Alien
      this.Ai = new Alien();
      this.Ai.setImage(this.AssetManager.getAsset('assets/images/Alien-1.png'));

      // Animated Logo
      this.logoTest = new Logo(this.AssetManager.getAsset('assets/images/asteroid_logo.png'),
                        this.AssetManager.getAsset('assets/images/asteroid_logo_1.png'),
                        this.AssetManager.getAsset('assets/images/asteroid_logo_2.png'),
                        this.AssetManager.getAsset('assets/images/asteroid_logo_3.png'));


     // HUD
      this.hud = new HUD(this.AssetManager.getAsset('assets/images/Ship-1.png'),  this.AssetManager.getAsset('assets/powerups/powerupshield.png'), this.AssetManager.getAsset('assets/powerups/poweruprof.png'));
      console.log("Images Loaded");
      this.background = this.AssetManager.getAsset('assets/Stars-Background-01.png');
      this.player.setSound(this.AssetManager.getAsset('assets/sounds/fire.wav'));
      this.bang = this.AssetManager.getAsset('assets/sounds/bang.wav');
      this.kill = this.AssetManager.getAsset('assets/sounds/kill.wav');
      this.click = this.AssetManager.getAsset('assets/sounds/music.wav');
      this.initMenus();
      this.redux();
    }); // Downloads all Images, when complete inside of function executes

    this.scoreboard = new ScoreboardManager();
    this.scoreboard.startTimer();
    this.scoreboard.clearSessionStorage();
    this.scoreboard.initBoard("local");
    this.keyboardManager = new KeyboardManager(["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"]);
    this.wasUp = true;
    this.useNewAssets = true;
    var ws = new WebSocket("ws://149.153.106.151:8080/wstest");

    //called when the websocket is opened
    ws.onopen = function() {
      var message = {};
      message.type = "connect";
      message.data = "game";
      var mString = JSON.stringify(message);
      ws.send(mString);
    };

    //called when the client receives a message
    ws.onmessage = function (evt) {
      var obj = JSON.parse(evt.data);
      gameNs.game.mobObj = obj;
    };
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
    else if (this.menuHandler.currentScene === "Controls") {
      this.menuHandler.getCurrentSceneObject().draw();
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
    }

    if (this.AssetManager.loadComplete && this.menuHandler.currentScene === "Game") {
      if(this.hud.lives === 0) {
        this.scoreboard.addToBoard(this.hud.score);
        this.menuHandler.goToScene("Leaderboard");
      }

      this.player.update(window.innerWidth, window.innerHeight);

      this.Ai.update(this.player.positionX, this.player.positionY);
      this.player.isThrusting = this.keyboardManager["KeyW"] || this.mobObj.td;
      if (this.keyboardManager["ArrowUp"] && this.wasUp2) {
        this.wasUp2 = false;
        this.useNewAssets = !this.useNewAssets;
        this.player.updateAssets(this.AssetManager, this.useNewAssets);
        this.Ai.updateAssets(this.AssetManager, this.useNewAssets);
        this.asteroidManager.updateAssets(this.useNewAssets);
      }else if (!this.keyboardManager["ArrowUp"]) {
        this.wasUp2 = true;
      }

      var right = this.keyboardManager["KeyD"] || this.mobObj.rd;
      var left = this.keyboardManager["KeyA"] || this.mobObj.ld;
      var fire = this.keyboardManager["Space"] || this.mobObj.fd;

      if (right) {
        this.player.turn(1);
      }
      if (left) {
        this.player.turn(-1);
      }
      if ((this.keyboardManager["Space"] && this.wasUp) || (this.keyboardManager["Space"] && this.player.autoFire)) {
        this.wasUp = false;
        this.player.fire();
      } else if (!fire) {
        this.wasUp = true;
      }

      this.asteroidManager.update();

      this.handleCollisions();
      for(var i =0; i< this.powerups.length; i++)
      {
        this.powerups[i].update();
        if(!this.powerups[i].alive){
          this.powerups.splice(i,1);
        }
      }
      if(this.useNewAssets) {
        this.obstacleManager.update();
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
      if(!this.player.shielded && !this.player.respawnInvincibility && asteroids[i].alive && circleTriangle({"x": asteroidX, "y": asteroidY}, asteroidRad, this.player.triangle[0], this.player.triangle[1], this.player.triangle[2])) {
        this.bang.play();
        this.player.reset();
        this.hud.lives -= 1;
      }
      if(checkCircleCircleCollision(this.Ai.centreX, this.Ai.centreY, this.Ai.width / 2, asteroidX, asteroidY, asteroidRad) && asteroids[i].alive) {
        this.kill.play();
        this.Ai.die();
      }
      for(var j = 0; j < playerBullets.length; j++) {
        var bulletX = playerBullets[j].positionX;
        var bulletY = playerBullets[j].positionY;
        var bulletRad = playerBullets[j].radius;
        if(checkCircleCircleCollision(bulletX, bulletY, bulletRad, asteroidX, asteroidY, asteroidRad) && asteroids[i].alive){
          this.bang.play();
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
          this.bang.play();
          alienBullets[j].alive = false;
          asteroids[i].destroy(this.powerups, this.player, true);
        }
      }
    }
    for(var i = 0; i < playerBullets.length; i++) {
      var bulletX = playerBullets[i].positionX;
      var bulletY = playerBullets[i].positionY;
      var bulletRad = playerBullets[i].radius;
      
      if(checkCircleCircleCollision(bulletX, bulletY, bulletRad, this.Ai.centreX, this.Ai.centreY, this.Ai.width / 2) && this.Ai.alive === true) {
        this.kill.play();
        playerBullets[i].alive = false;
        this.Ai.die();
      }
    }
    for(var i = 0; i < alienBullets.length; i++) {
      var bulletX = alienBullets[i].positionX;
      var bulletY = alienBullets[i].positionY;
      var bulletRad = alienBullets[i].radius;

      if(circleTriangle({"x": bulletX, "y": bulletY}, bulletRad, this.player.triangle[0], this.player.triangle[1], this.player.triangle[2]) && !this.player.shielded && !this.player.respawnInvincibility) {
        this.kill.play();
        alienBullets[i].alive = false;
        this.hud.lives -= 1;
        this.player.reset();
      }
    }

    if(circleTriangle({"x": this.Ai.centreX, "y": this.Ai.centreY}, this.Ai.width / 2, this.player.triangle[0], this.player.triangle[1], this.player.triangle[2]) 
    && this.Ai.alive === true 
    && !this.player.shielded 
    && !this.player.respawnInvincibility) {
      this.kill.play();
      this.hud.lives -= 1;
      this.player.reset();
    }

    if (this.useNewAssets) {
      for (let i = 0; i < this.obstacleManager.obstacles.length; ++i) {
        let respValue = this.obstacleManager.checkCollisions(this.player.centreX,
            this.player.centreY,
            this.player.radius,
            this.obstacleManager.obstacles[i]
        );
        // if (!(respValue.x !== this.player.centreX && respValue.y !== this.player.centreY)) {
        // }
        this.player.centreX = respValue.x;
        this.player.centreY = respValue.y;

        this.player.positionX = this.player.centreX - this.player.radius;
        this.player.positionY = this.player.centreY - this.player.radius;

        let obsBounds = {
          'left': this.obstacleManager.obstacles[i].x,
          'top': this.obstacleManager.obstacles[i].y,
          'width': this.obstacleManager.obstacles[i].width,
          'height': this.obstacleManager.obstacles[i].height
        };

        for (let j = 0; j < playerBullets.length; j++) {
          if (playerBullets[j].alive) {
            let bulletX = playerBullets[j].positionX;
            let bulletY = playerBullets[j].positionY;
            let bulletRad = playerBullets[j].radius;
            if (circleAABB({
              'x': bulletX,
              'y': bulletY
            }, bulletRad, obsBounds)) {
              playerBullets[j].alive = false;
            }
          }
        }
        for (let j = 0; j < alienBullets.length; j++) {
          if (alienBullets[j].alive) {
            let bulletX = alienBullets[j].positionX;
            let bulletY = alienBullets[j].positionY;
            let bulletRad = alienBullets[j].radius;
            if (circleAABB({
              'x': bulletX,
              'y': bulletY
            }, bulletRad, obsBounds)) {
              alienBullets[j].alive = false;
            }
          }
        }
      }
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
    if (this.useNewAssets) {
      this.obstacleManager.draw(ctx);
    }
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

    let controlScene = new ControlsScene(this.menuHandler, this.AssetManager);
    this.controlScene = controlScene;
    this.menuHandler.addScene("Controls", this.controlScene);

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

    let logoPath = "assets/images/";
    let logoPathToUse = "";
    let pathToUse = "";

    this.useNewAssets = !this.useNewAssets;
    if (this.useNewAssets) {
      this.menuHandler._theme.setSecondary(49, 49, 49, 0.5);
    } else {
      this.menuHandler._theme.setSecondary(210, 210, 210, 0.75);
    }
    this.menuHandler.applyTheme();

    pathToUse = this.useNewAssets ? modernPath : retroPath;
    logoPathToUse = this.useNewAssets ? logoPath : retroPath;
    this.player.updateAssets(this.AssetManager, this.useNewAssets);
    this.Ai.updateAssets(this.AssetManager, this.useNewAssets);
    this.asteroidManager.updateAssets(this.useNewAssets);

    this.logoTest.ani1 = this.AssetManager.getAsset(logoPathToUse + 'asteroid_logo.png');
    this.logoTest.ani2 = this.AssetManager.getAsset(logoPathToUse + 'asteroid_logo_1.png');
    this.logoTest.ani3 = this.AssetManager.getAsset(logoPathToUse + 'asteroid_logo_2.png');
    this.logoTest.ani4 = this.AssetManager.getAsset(logoPathToUse + 'asteroid_logo_3.png');
    this.logoTest.currentImage = this.logoTest.ani1;

    this.controlScene.swapScheme(pathToUse, this.AssetManager);
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

  reset() {
    //debugger;
    if(this.AssetManager.loadComplete) {
      console.log("reset");
      this.hud.score = 0;
      this.hud.lives = 3;
      this.asteroidManager.asteroids = [];
      this.player.reset();
      this.Ai.alive = false;
      this.scoreboard = new ScoreboardManager();
      this.scoreboard.startTimer();
      this.scoreboard.clearSessionStorage();
      this.scoreboard.initBoard("local");
    }
  }
}
