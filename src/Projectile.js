class Projectile{

  constructor(x,y, angle){
    this.positionX = x;
    this.positionY = y;

    this.velocityX = 0;
    this.velocityY = 0;

    this.angle = angle;
    this.radius = 5;
    this.alive = true;

    this.emitter = new Emitter(new Vector(800, 530), Vector.fromAngle(0.10, 1), 10 ,'rgb(255,255,255)');
    this.emitter.setParticlesLifeTime(0.75);
    this.emitter.setEmissionRate(0);
    this.emitter.setMaxParticles(100000);
    this.emitter.updateSize(3,3);
  }
  update(width, height){
    var radians = this.angle;

    this.velocityX = Math.cos(radians)* 15;
    this.velocityY = Math.sin(radians)* 15;

    this.positionX -= this.velocityX;
    this.positionY -= this.velocityY;

    this.emitter.addNewParticles();
    this.emitter.plotParticles(width, height);
    this.emitter.setPos(this.positionX,this.positionY);
    var mag = Math.sqrt((this.velocityX * this.velocityX) + (this.velocityY * this.velocityY));
    var newEmission = (mag / 50) * 15;
    newEmission = newEmission < 1 ? 0 : newEmission;
    this.emitter.setEmissionRate(newEmission);

  }
  draw(ctx){
    if(this.alive){
      this.emitter.draw(ctx);
    }
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.strokeStyle= "white";
    ctx.arc(this.positionX, this.positionY, this.radius, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.fill();


    if(this.positionX < this.radius - 150){
        this.alive = false;
    }
    if(this.positionX > window.innerWidth + 150){
        this.alive = false;
    }
    if(this.positionY < this.radius - 150){
        this.alive = false;
    }
    if(this.positionY > window.innerHeight + 150){
        this.alive = false;
    }
  }

}
