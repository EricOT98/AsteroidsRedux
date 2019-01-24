class GameScene extends Scene {
  constructor(menuHandler) {
    super("Game", document.getElementById("main-div"),
        {'x': 0, 'y': 0, 'width': 100, 'height': 100},
        "",
        "%"
    );
  }
}