class Player{

  constructor(x, y, radius) {
    // Player Attributes
    this.sprite = new Image();
    this.positionX = x;
    this.positionY = y;
    this.radius = radius || 100;
    this.centreX = this.positionX + this.radius;
    this.centreY = this.positionY + this.radius;
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
    this.shielded = false;
    this.autoFire = false;
    this.shieldTime=0;
    this.autoTime=0;

    // Particles
    this.emitter = new Emitter(new Vector(800, 530), Vector.fromAngle(0.10, 1), 10 ,'rgb(255,255,255)');
    this.emitter.setParticlesLifeTime(0.75);
    this.emitter.setEmissionRate(0);
    this.emitter.setMaxParticles(100000);
    this.emitter.useACircle();
    this.emitter.updateSize(3,3);

    // Collision Triangle
    this.triangle = [];
    for(let i = 0; i < 3; ++i) {
      this.triangle.push({'x': 0, 'y': 0});
    }
  }

  setSprite(newsprite){
    this.sprite = newsprite;
  }

  fire() {
    this.bullets.push(new Projectile(this.px + (this.width / 2), this.py + (this.height / 2), this.angle));
  }

  turn(dir) {
    this.angle += this.turnSpeed * dir;
  }

  update(width, height)
  {
    // Player Position Update
    var radians = this.angle;
    if(this.isThrusting) {
      this.velocityX += Math.cos(radians)* this.thrust;
      this.velocityY += Math.sin(radians)* this.thrust;
    }

    // Bounds Check
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

    this.velocityX *=0.985;
    this.velocityY *=0.985; // Friction
    this.positionX -= this.velocityX;
    this.positionY -= this.velocityY;
    this.px = this.positionX - this.pointLength * Math.cos(radians);
    this.py = this.positionY - this.pointLength * Math.sin(radians);
    this.centreX = this.positionX + this.radius;
    this.centreY = this.positionY + this.radius;

    // Bullets Update
    for(var x=0; x < this.bullets.length; x++) {
      this.bullets[x].update(width, height);
      if(this.bullets[x].alive === false) {
        this.bullets.splice(x, 1); // Remove dead bullet
      }
    }

    // Emitter Update
    this.emitter.addNewParticles();
    this.emitter.plotParticles(width, height);
    this.emitter.setPos((this.positionX + (this.width / 2.0) + 40.0 * Math.cos(radians)), (this.positionY + (this.height / 2.0)) + 40.0 * Math.sin(radians));
    var mag = Math.sqrt((this.velocityX * this.velocityX) + (this.velocityY * this.velocityY));
    var newEmission = (mag / 50) * 10;
    newEmission = newEmission < 0.5 ? 0 : newEmission;
    this.emitter.setEmissionRate(newEmission);

    // Collision Triangle Update
    this.triangle[0].x = this.px + (this.width / 2);
    this.triangle[0].y = this.py + (this.height / 2);
    this.triangle[1].x = this.positionX + (this.width / 2.0) + 60.0 * Math.cos(radians + degreesToRadians(30));
    this.triangle[1].y = this.positionY + (this.height / 2.0) + 60.0 * Math.sin(radians + degreesToRadians(30));
    this.triangle[2].x = this.positionX + (this.width / 2.0) + 60.0 * Math.cos(radians - degreesToRadians(30));
    this.triangle[2].y = this.positionY + (this.height / 2.0) + 60.0 * Math.sin(radians - degreesToRadians(30));

    // Powerups
    if(this.shielded){
      this.shieldTime+=1;
      if(this.shieldTime > 15 * 60){
        this.shielded=false;
      }
    }
    if(this.autoFire){
      this.autoTime+=1;
      if(this.autoTime > 2 * 60){
        this.autoFire=false;
      }
    }
  }

  draw(ctx) {

    // Main Sprite
    this.emitter.draw(ctx);
    ctx.save();
    ctx.translate(this.positionX + (this.width / 2.0), this.positionY + (this.height / 2.0));
    ctx.rotate(this.angle);
    ctx.translate((this.positionX + (this.width / 2)) * -1, (this.positionY + (this.height / 2)) * -1);
    ctx.drawImage(this.sprite, this.positionX, this.positionY, this.width, this.height);
    ctx.restore();

    // Collision Triangle
<<<<<<< HEAD
    /*ctx.beginPath();
=======
    ctx.beginPath();
>>>>>>> 5d1ce9e272c34abfad8a93f349b64dcda09e60be
    ctx.lineTo(this.triangle[0].x, this.triangle[0].y);
    ctx.lineTo(this.triangle[1].x, this.triangle[1].y);
    ctx.lineTo(this.triangle[2].x, this.triangle[2].y);
    ctx.lineWidth = 3;
    ctx.closePath();
    ctx.strokeStyle = "Red";
    ctx.stroke();
    ctx.fillStyle = "#FF000034";
    ctx.fill();*/

    // Draw Shield
    if(this.shielded){
      ctx.save();
      ctx.beginPath();
      ctx.strokeStyle = 'rgb(138,43,226)';
      ctx.fillStyle = 'rgb(138,43,226,125)';
      ctx.globalAlpha = 0.5;
      ctx.arc(this.centreX, this.centreY, this.radius *1.2, 0, 2 * Math.PI);
      ctx.stroke();
      ctx.fill();
      ctx.restore();
    }

    // Draw Bullets
    for(var x=0; x < this.bullets.length; x++)
    {
      this.bullets[x].draw(ctx);
    }
<<<<<<< HEAD
  }

  reset() {
    this.positionX = window.innerWidth / 2;
    this.positionY = window.innerHeight / 2;
    this.isThrusting = false;
    this.velocityX = 0;
    this.velocityY = 0;
=======
>>>>>>> 5d1ce9e272c34abfad8a93f349b64dcda09e60be
  }
}
