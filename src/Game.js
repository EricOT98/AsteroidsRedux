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
    console.log("Draw");
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

    this.menuHandler._theme.setPrimary(0,0,0,1);
    this.menuHandler._theme.setSecondary(49, 49, 49, 0.5);
    this.menuHandler._theme.setTertiary(255,190,61, 0);
    this.menuHandler.applyTheme();
    this.menuHandler.showOnlyCurrentScene();
  }
}