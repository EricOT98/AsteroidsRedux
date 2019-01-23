class MainMenuScene extends Scene {
  constructor(menuHandler) {
    super("Main Menu", document.getElementById("main-div"),
        {'x': 0, 'y': 0, 'width': 100, 'height': 100},
        "",
        "%"
    );
    this.mainMenu = new Menu("Main Menu",
        {'x': 20, 'y': 20, 'width': 60, 'height': 60}
    );
    this.playBtn = new Button("Play",
        menuHandler.goToScene.bind(menuHandler, "Game"),
        {'x': 35, 'y': 50, 'width': 30, 'height': 10},
        "%"
    );

    this.playBtn.makeImageButton("assets/ui/play_btn.png");
    this.playBtn.addHoverImage("assets/ui/play_btn_pressed.png");
    this.mainMenu.addButton("Play", this.playBtn);

    this.leaderboardBtn = new Button("Leaderboard",
        menuHandler.goToScene.bind(menuHandler, "Leaderboard"),
        {'x': 35, 'y': 65, 'width': 30, 'height': 10},
        "%"
    );

    this.leaderboardBtn.makeImageButton("assets/ui/leaderboard_btn.png");
    this.leaderboardBtn.addHoverImage("assets/ui/leaderboard_btn_prssed.png");
    this.mainMenu.addButton("Leaderboard", this.leaderboardBtn);

    this.controlsBtn = new Button("Controls",
        menuHandler.goToScene.bind(menuHandler, "Controls"),
        {'x': 35, 'y': 80, 'width': 30, 'height': 10},
        "%"
    );

    this.controlsBtn.makeImageButton("assets/ui/control_btn.png");
    this.controlsBtn.addHoverImage("assets/ui/control_btn_pressed.png");
    this.mainMenu.addButton("Controls", this.controlsBtn);

    this.addMenu(this.mainMenu);
    this._containerDiv.style.backgroundImage = "url('assets/tempBackground.jpg')";
  }
}