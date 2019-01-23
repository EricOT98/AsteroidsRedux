/**
 * Asteroid Class
 */
class Asteroid {
  constructor(x, y, speed, rotation, radius, generation) {
    this.sprite = new Image();
    this.alive = true;
    this.emissionComplete = false;
    this.split = false;
    this.xPos = x;
    this.yPos = y;
    this.speed = speed;
    this.rotation = rotation;
    this.generation = generation;
    this.radius = radius;
    this.centreX = this.xPos + this.radius;
    this.centreY = this.yPos + this.radius;

    this.emitter = new Emitter(new Vector(800, 530), Vector.fromAngle(0.10, 1), 10 ,'rgb(255,255,255)');
    this.emitter.setParticlesLifeTime(2);
    this.emitter.setEmissionRate(10);
    this.emitter.setMaxParticles(30);
    this.emitter.useACircle();
    this.emitter.updateSize(3,3);

    this.emitTimer=0;
  }

  update() {
    if(this.alive) {
      this.xPos += this.speed * Math.cos(this.rotation);
      this.yPos += this.speed * Math.sin(this.rotation);

      // Boundary Check
      if(this.xPos < -(this.radius * 2)){
        this.xPos = window.innerWidth;
      }
      if(this.xPos > window.innerWidth){
          this.xPos = -(this.radius * 2);
      }
      if(this.yPos < -(this.radius * 2)){
          this.yPos = window.innerHeight;
      }
      if(this.yPos > window.innerHeight){
          this.yPos = -(this.radius * 2);
      }

      // Set centre position for collisions
      this.centreX = this.xPos + this.radius;
      this.centreY = this.yPos + this.radius;
    }
    else{
      this.emitTimer+=1;
      this.emitter.addNewParticles();
      this.emitter.plotParticles(window.innerWidth, window.innerHeight);
      //console.log(this.emitTimer)
      if(this.emitTimer >= 1 * 60){
        this.emissionComplete=true;
      }
    }
  }

  draw(ctx) {

    if(this.alive){
      ctx.drawImage(this.sprite, this.xPos, this.yPos, this.radius * 2, this.radius * 2);
    }
    else {
      this.emitter.draw(ctx);
    }
  }

  setSprite(newSprite) {
    this.sprite = newSprite;
  }

  destroy() {
      this.emitter.setPos(this.centreX,this.centreY);
      this.alive = false;
  }
}
