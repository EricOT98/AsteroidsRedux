class ControlsScene extends Scene {
  constructor(menuHandler, assetManager) {
    super("Controls", document.getElementById("main-div"),
        {'x': 0, 'y': 0, 'width': 100, 'height': 100},
        "",
        "%"
    );

    this.controlsMenu = new Menu("Leaderboard",
        {'x': 20, 'y': 20, 'width': 60, 'height': 60}
    );
    this.backBtn = new Button("Back", () => {
        gameNs.game.click.play();
        menuHandler.goToScene("Main Menu");
    },
        {'x': 35, 'y': 80, 'width': 30, 'height': 10},
        "%"
    );
    this.backBtn.makeImageButton("assets/ui/back_btn.png");
    this.backBtn.addHoverImage("assets/ui/back_btn_pressed.png");
    this.controlsMenu.addButton("Back", this.backBtn);

    this.controlsImg = assetManager.getAsset('assets/ui/control.png');
    this.controlsImg.style.left = "20%";
    this.controlsImg.style.top = "10%";
    this.controlsImg.style.width = "60%";
    this.controlsImg.style.height = "50%";
    this.controlsImg.style.position = "absolute";
    this.controlsMenu._containerDiv.appendChild(this.controlsImg);
    this.addMenu(this.controlsMenu);
  }

  draw() {
    let canvas = document.getElementById("canvas");
    let ctx = canvas.getContext("2d");
    ctx.clearRect(0,0, canvas.width, canvas.height);
  }

  swapScheme(path, assetManager) {
    if (this.controlsMenu._containerDiv.contains(this.controlsImg)) {
      this.controlsMenu._containerDiv.removeChild(this.controlsImg);
    }
    this.controlsImg = assetManager.getAsset(path + "control.png");
    this.controlsImg.style.left = "20%";
    this.controlsImg.style.top = "10%";
    this.controlsImg.style.width = "60%";
    this.controlsImg.style.height = "50%";
    this.controlsImg.style.position = "absolute";
    this.controlsMenu._containerDiv.appendChild(this.controlsImg);
  }
}