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
    this.turnSpeed = 0.1;
    this.angle = Math.PI;

    this.velocityX = 0;
    this.velocityY = 0;


    this.width = 100;
    this.height = 100;

    this.pointLength = 50;
    this.px = 0;
    this.py = 0;
  }

  turn(dir)
  {
    this.angle += this.turnSpeed * dir;
  }

  update()
  {
    var radians = this.angle;

    if(this.isThrusting){
      this.velocityX += Math.cos(radians)* this.thrust;
      this.velocityY += Math.sin(radians)* this.thrust;
    }

    this.velocityX *=0.985;
    this.velocityY *=0.985; //friction

    this.positionX -= this.velocityX;
    this.positionY -= this.velocityY;

    this.px = this.positionX - this.pointLength * Math.cos(radians);
    this.py = this.positionY - this.pointLength * Math.sin(radians);
  }

  draw(ctx)
  {
   ctx.save();
   ctx.translate(this.positionX + (this.width / 2), this.positionY + (this.height / 2));
   ctx.rotate(this.angle);
   ctx.translate((this.positionX + (this.width / 2)) * -1, (this.positionY + (this.height / 2)) * -1);
   ctx.drawImage(this.sprite, this.positionX, this.positionY, this.width, this.height);
   ctx.restore();

  }
}
