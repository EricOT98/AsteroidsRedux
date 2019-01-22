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

    this.bullets = [];


    this.emitter = new Emitter(new Vector(800, 530), Vector.fromAngle(0.10, 1), 10 ,'rgb(255,120,0)');
    this.emitter.setParticlesLifeTime(0.75);
    this.emitter.setEmissionRate(0);
    this.emitter.setMaxParticles(100000);
    this.emitter.useImage("assets/images/spark.png", 5,5);
  }

  fire()
  {
    this.bullets.push(new Projectile(this.px + (this.width / 2), this.py + (this.height / 2), this.angle));
  }

  turn(dir)
  {
    this.angle += this.turnSpeed * dir;
  }

  update(width, height)
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
    this.emitter.addNewParticles();
    this.emitter.plotParticles(width, height);
    this.emitter.setPos((this.positionX + (this.width / 2.0) + 40.0 * Math.cos(radians)), (this.positionY + (this.height / 2.0)) + 40.0 * Math.sin(radians));
    var mag = Math.sqrt((this.velocityX * this.velocityX) + (this.velocityY * this.velocityY));
    var newEmission = (mag / 50) * 25;
    newEmission = newEmission < 1 ? 0 : newEmission;
    this.emitter.setEmissionRate(newEmission);
  }

  draw(ctx)
  {


   this.emitter.draw(ctx);
   ctx.save();
   ctx.translate(this.positionX + (this.width / 2.0), this.positionY + (this.height / 2.0));
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
