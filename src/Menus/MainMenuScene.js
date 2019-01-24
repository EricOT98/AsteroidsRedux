class MainMenuScene extends Scene {
  constructor(menuHandler, game) {
    super("Main Menu", document.getElementById("main-div"),
        {'x': 0, 'y': 0, 'width': 100, 'height': 100},
        "",
        "%"
    );
    this.mainMenu = new Menu("Main Menu",
        {'x': 1120, 'y': 600, 'width': 1600, 'height': 1000},
        "px"
    );

    this.playBtn = new Button("Play", () => {
        game.click.play();
        game.reset();
        menuHandler.goToScene("Game");
    },
        {'x': 35, 'y': 10, 'width': 35, 'height': 15},
        "%"
    );

    this.playBtn.makeImageButton("assets/ui/play_btn.png");
    this.playBtn.addHoverImage("assets/ui/play_btn_pressed.png");
    this.mainMenu.addButton("Play", this.playBtn);

    this.leaderboardBtn = new Button("Leaderboard",() => {
        game.click.play();
        menuHandler.goToScene("Leaderboard");
    },
        {'x': 35, 'y': 45, 'width': 35, 'height': 15},
        "%"
    );

    this.leaderboardBtn.makeImageButton("assets/ui/leaderboard_btn.png");
    this.leaderboardBtn.addHoverImage("assets/ui/leaderboard_btn_prssed.png");
    this.mainMenu.addButton("Leaderboard", this.leaderboardBtn);

    this.controlsBtn = new Button("Controls",() => {
        game.click.play();
        menuHandler.goToScene("Controls");
    },
        {'x': 35, 'y': 80, 'width': 35, 'height': 15},
        "%"
    );

    this.controlsBtn.makeImageButton("assets/ui/control_btn.png");
    this.controlsBtn.addHoverImage("assets/ui/control_btn_pressed.png");
    this.mainMenu.addButton("Controls", this.controlsBtn);

    this.reduxBtn = new Button("Redux",() => {
          game.click.play();
          game.redux();
        },
        {'x': 35, 'y': 80, 'width': 30, 'height': 10},
        "%"
    );
    this.reduxBtn.makeImageButton("assets/ui/back_btn.png");
    this.reduxBtn.addHoverImage("assets/ui/back_btn_pressed.png");
    this.mainMenu.addButton("Redux", this.reduxBtn);
    this.addMenu(this.mainMenu);
    //this._containerDiv.style.backgroundImage = "url('assets/tempBackground.jpg')";
  }
}