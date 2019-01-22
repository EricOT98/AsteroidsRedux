class Player{

  constructor(x, y, radius)
  {
    this.sprite = new Image();

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

    this.bullets = [];
  }

  setSprite(newsprite){
    this.sprite = newsprite;
  }

  fire()
  {
    this.bullets.push(new Projectile(this.px + (this.width / 2), this.py + (this.height / 2), this.angle));
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
    //console.log(this.positionX, this.positionY);

    for(var x=0; x < this.bullets.length; x++)
    {
      this.bullets[x].update();

      if(this.bullets[x].alive === false)
      {
        this.bullets.splice(x, 1); //remove dead bullet
      }
    }
  }

  draw(ctx)
  {
   ctx.save();
   ctx.translate(this.positionX + (this.width / 2), this.positionY + (this.height / 2));
   ctx.rotate(this.angle);
   ctx.translate((this.positionX + (this.width / 2)) * -1, (this.positionY + (this.height / 2)) * -1);
   ctx.drawImage(this.sprite, this.positionX, this.positionY, this.width, this.height);
   ctx.restore();

   for(var x=0; x < this.bullets.length; x++)
   {
     this.bullets[x].draw(ctx);
   }

   // bounds check

   if(this.positionX < this.radius - 150){
       this.positionX = window.innerWidth + 150;
   }
   if(this.positionX > window.innerWidth + 150){
       this.positionX = this.radius - 150;
   }
   if(this.positionY < this.radius - 150){
       this.positionY = window.innerHeight + 150;
   }
   if(this.positionY > window.innerHeight + 150){
       this.positionY = this.radius - 150;
   }
  }
}
