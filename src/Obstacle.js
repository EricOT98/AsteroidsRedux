class Obstacle {
  constructor(x = 0, y = 0, width = 0, height = 0, speed = 0, direction = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
    this.speed = speed;
    this.direction = direction;

    //this.emitter = new Emitter(new Vector(800, 530), Vector.fromAngle(0.10, 1), 10 ,'rgb(255,255,255)');
    //this.emitter.setParticlesLifeTime(2);
    //this.emitter.setEmissionRate(10);
    //this.emitter.setMaxParticles(30);
    //this.emitter.useACircle();
  //  this.emitter.updateSize(3,3);

    //this.emitTimer=0;
    this.bumped = false;
    this.emissionComplete = false;
  }

  update() {
    this.wrapAround();
    this.x += this.speed * Math.cos(this.direction);
    this.y += this.speed * Math.sin(this.direction);

    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
    if (this.bumped) {
      //this.emitTimer+=1;
      //this.emitter.addNewParticles();
    //  this.emitter.plotParticles(window.innerWidth, window.innerHeight);
      //console.log(this.emitTimer)
      if(this.emitTimer >= 1 * 60){
        this.emissionComplete=true;
        //this.emitter.setEmissionRate(0);
        this.bumped = false;
        this.emitTimer = 0;
      }
    }
  }

  draw(ctx) {
    ctx.fillStyle = "rgba(128,128,128,1)";
    ctx.strokeStyle = "rgba(45,45,45,1)";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    if (this.bumped) {
    //  this.emitter.draw(ctx);
    }
  }

  wrapAround() {
    if (this.x < -this.width) {
      this.x = window.innerWidth;
    } else if (this.x > window.innerWidth) {
      this.x = -this.width;
    }

    if (this.y < -this.height) {
      this.y = window.innerHeight;
    } else if (this.y > window.innerHeight) {
      this.y = -this.height;
    }
  }
}
