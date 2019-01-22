class Player{

  constructor(x, y, radius)
  {
    this.sprite = new Image();
    this.sprite.src = "assets/images/PlayerShip.png";

    this.positionX = x;
    this.positionY = y;
    this.radius = radius || 100;

    this.isThrusting = false;
    this.thrust = 0.1;
    this.turnSpeed = 0.001;
    this.angle = 0;

    this.velocityX = 0;
    this.velocityY = 0;
  }

  turn(dir)
  {
    this.angle += this.turnSpeed * dir;
  }

  update()
  {
    var radians = this.angle/Math.PI*180;

    if(this.isThrusting){
      this.velocityX += Math.cos(radians)* this.thrust;
      this.velocityY += Math.sin(radians)* this.thrust;
    }

    this.velocityX *=0.98;
    this.velocityY *=0.98; //friction

    this.positionX -= this.velocityX;
    this.positionY -= this.velocityY;
  }

  draw(ctx)
  {
    ctx.drawImage(this.sprite, this.positionX, this.positionY, 100, 100);
  }
}
