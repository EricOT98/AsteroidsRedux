/**
 * @author Eric O' toole
 */
class GameScene extends Scene {
  /**
   * Default Constructor for Game Scene
   * @param {MenuHandler} menuHandler
   */
  constructor(menuHandler) {
    super("Game", document.getElementById("main-div"),
        {'x': 0, 'y': 0, 'width': 100, 'height': 100},
        "",
        "%"
    );
  }
}