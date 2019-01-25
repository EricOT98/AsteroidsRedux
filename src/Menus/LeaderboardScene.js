class LeaderboardScene extends Scene {
  constructor(menuHandler) {
    super("Leaderboard", document.getElementById("main-div"),
        {'x': 0, 'y': 0, 'width': 100, 'height': 100},
        "",
        "%"
    );
    this.leaderboardMenu = new Menu("Leaderboard",
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
    this.leaderboardMenu.addButton("Back", this.backBtn);
    this.addMenu(this.leaderboardMenu);
    }

     /**
     * Leaderboard scene.
     * @function drawLeaderboard, Loops through top players and displays them in order.
     * @param {ctx} ctx, canvas context to draw on.
     */
  drawLeaderboard(ctx) {
    var canv2 =  document.getElementById("canvas");
    var ctx2 = canv2.getContext("2d");
    canv2.style.visibility = "visible";
    var xpos = (window.innerWidth / 2) - 170;
    var ypos = window.innerHeight / 5.5;
    var gap = 80;

    ctx2.fillStyle = "black";
    ctx2.fillRect(0,0, canv2.width, canv2.height);

    gameNs.game.scoreboard.filterScore(-1);
    for (var i = 0; i < gameNs.game.scoreboard.scoreboard.length && i < 5; i++) {
      var place = i + 1;
      var player = gameNs.game.scoreboard.scoreboard[i];
      var name = player.name;
      var score = player.score;
      var id = player.playerID;

      ctx2.fillStyle = "white";
      ctx2.font="50px Verdana";
      ctx2.fillText(place +") " +  name + ": " + score, xpos, ypos + ((i + 1) * gap));
      console.log(place +") " +  name + ": " + score + " : " + xpos + (ypos + ((i + 1) * gap)));

      this.y += 50;
      this.count += 1;
      if(this.count === 10){
        break;
        }
    }

  this.count = 0;
  this.y = 30;
}
}