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
    this.menuHandler = new MenuHandler();
    this.initMenus();
    this.gameLoaded = false; // Bool for checking when game is fully loaded.
    this.AssetManager = new AssetManager("assets/jsonAssets.json"); // Creates asset manager

    // Asset List
    this.AssetManager.queueDownloadImage('assets/images/PlayerShip.png'); // Adds path to download queue
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

    this.AssetManager.downloadAllImages(() => {
      this.player = new Player(100,100,50);
      this.player.setSprite(this.AssetManager.getAsset('assets/images/Ship-1.png'));
      this.asteroidManager = new AsteroidManager(3, 1, 3, this.AssetManager);
      console.log("Loaded complete");
      this.gameLoaded = true;
    }); // Downloads all Images, when complete inside of function executes
    
    this.keyboardManager = new KeyboardManager(["KeyW", "KeyA", "KeyS", "KeyD", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", "Space"]);
    this.wasUp = true;
  }

  init() {
  }

  /**
   * Updates the game
   */
  update() {

    if(this.gameLoaded && this.menuHandler.currentScene === "Game"){
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
      this.asteroidManager.update();
      this.draw();
    }
    window.requestAnimationFrame(gameNs.game.update.bind(gameNs.game));
  }

  /**
   * Draws the game
   */
  draw() {
    var canv = document.getElementById("canvas");
    var ctx = canv.getContext("2d");
    ctx.clearRect(0, 0, canv.width, canv.height);
    this.player.draw(ctx);
    this.asteroidManager.draw(ctx);
  }

  initMenus() {
    let canvas = document.getElementById("canvas");
    let mainDiv = document.createElement('div');
    mainDiv.style.position = "relative";
    mainDiv.style.width = canvas.width + "px";
    mainDiv.style.height = canvas.height + "px";
    mainDiv.appendChild(canvas);
    document.body.appendChild(mainDiv);

    let mainMenuScene = new Scene("Main Menu", mainDiv,
        {'x': 0,'y': 0, 'width': 100, 'height': 100}
        );
    let mainMenu = new Menu("Main Menu",
        {'x': 20, 'y': 20, 'width': 60, 'height': 60}
        );
    let playBtn = new Button("Play",
        this.menuHandler.goToScene.bind(this.menuHandler, "Game"),
        {'x': 35, 'y': 50, 'width': 30, 'height': 10},
        "%"
    );

    playBtn.makeImageButton("assets/ui/play_btn.png");
    playBtn.addHoverImage("assets/ui/play_btn_pressed.png");
    mainMenu.addButton("Play", playBtn);

    let leaderboardBtn = new Button("Leaderboard",
        this.menuHandler.goToScene.bind(this.menuHandler, "Leaderboard"),
        {'x': 35, 'y': 65, 'width': 30, 'height': 10},
        "%"
    );

    leaderboardBtn.makeImageButton("assets/ui/leaderboard_btn.png");
    leaderboardBtn.addHoverImage("assets/ui/leaderboard_btn_prssed.png");
    mainMenu.addButton("Leaderboard", leaderboardBtn);

    let controlsBtn = new Button("Controls",
        this.menuHandler.goToScene.bind(this.menuHandler, "Controls"),
        {'x': 35, 'y': 80, 'width': 30, 'height': 10},
        "%"
    );

    controlsBtn.makeImageButton("assets/ui/control_btn.png");
    controlsBtn.addHoverImage("assets/ui/control_btn_pressed.png");
    mainMenu.addButton("Controls", controlsBtn);

    mainMenuScene.addMenu(mainMenu);
    mainMenuScene._containerDiv.style.backgroundImage = "url('assets/tempBackground.jpg')";
    this.menuHandler.addScene("Main Menu", mainMenuScene);


    let leaderboardScene = new Scene("Leaderboard", mainDiv,
        {'x': 0,'y': 0, 'width': 100, 'height': 100}
    );
    let leaderboardMenu = new Menu("Leaderboard",
        {'x': 20, 'y': 20, 'width': 60, 'height': 60}
    );
    let backBtn = new Button("Back",
        this.menuHandler.goToScene.bind(this.menuHandler, "Main Menu"),
        {'x': 35, 'y': 80, 'width': 30, 'height': 10},
        "%"
    );
    backBtn.makeImageButton("assets/ui/back_btn.png");
    backBtn.addHoverImage("assets/ui/back_btn_pressed.png");
    leaderboardMenu.addButton("Back", backBtn);
    leaderboardScene.addMenu(leaderboardMenu);
    this.menuHandler.addScene("Leaderboard",leaderboardScene);

    let controlScene = new Scene("Controls", mainDiv,
        {'x': 0,'y': 0, 'width': 100, 'height': 100}
    );

    let controlsMenu = new Menu("Leaderboard",
        {'x': 20, 'y': 20, 'width': 60, 'height': 60}
    );
    let backBtn2 = new Button("Back",
        this.menuHandler.goToScene.bind(this.menuHandler, "Main Menu"),
        {'x': 35, 'y': 80, 'width': 30, 'height': 10},
        "%"
    );
    backBtn2.makeImageButton("assets/ui/back_btn.png");
    backBtn2.addHoverImage("assets/ui/back_btn_pressed.png");
    controlsMenu.addButton("Back", backBtn);
    controlScene.addMenu(controlsMenu);
    this.menuHandler.addScene("Controls", controlScene);

    let gameScene = new Scene("Game", mainDiv,
        {'x': 0,'y': 0, 'width': 100, 'height': 100}
    );

    this.menuHandler.addScene("Game", gameScene);
    this.menuHandler._theme.setPrimary(0,0,0,1);
    this.menuHandler._theme.setSecondary(49, 49, 49, 0.5);
    this.menuHandler._theme.setTertiary(255,190,61, 0);
    this.menuHandler.applyTheme();
    gameScene.colour = "rgba(0,0,0,0)";
    this.menuHandler.showOnlyCurrentScene();
  }
}
