class PickUp {
  constructor(x, y, type,player, hud) {
    this.player = player;
    this.x = x;
    this.y = y;
    this.type = type;
    this.radius = 18.75;
    this.hud = hud;

    this.centreX = this.x + this.radius;
    this.centreY = this.y + this.radius;

    this.sprite = new Image();
    if(this.type === "Life") {
      this.sprite.src = "assets/pickups/pickuphealth.png";
      this.color = 'rgb(255,0,0)';
    }
    else if (this.type === "Score") {
      this.sprite.src = "assets/pickups/pickupscore.png";
      this.color = 'rgb(66,206, 240)';
    }
    this.alive = true;

    this.emitter = new Emitter(new Vector(800, 530), Vector.fromAngle(0.10, 1), 10 ,this.color);
    this.emitter.setParticlesLifeTime(0.75);
    this.emitter.setEmissionRate(1);
    this.emitter.setMaxParticles(100);
    this.emitter.useACircle();
    this.emitter.updateSize(3,3);
    this.emitter.setPos(this.centreX,this.centreY);
    this.angle=0;
  }

  update() {
    this.emitter.addNewParticles();
    this.emitter.plotParticles(window.innerWidth, window.innerHeight);
    this.angle += 1;
    if (this.angle >= 360) {
      this.angle = 0;
    }

    if (this.alive) {
      if (checkCircleCircleCollision(this.centreX, this.centreY, this.radius, this.player.centreX, this.player.centreY, this.player.radius)) {
        this.alive = false;
        if (this.type === "Life") {
          if (this.hud.lives < 3) {
            this.hud.lives++;
          }
        } else if (this.type === "Score") {
          this.hud.score += 100;
        }
      }
    }
  }

  draw(ctx) {
    if (this.alive) {
      this.emitter.draw(ctx);

      ctx.save();
      ctx.translate(this.centreX, this.centreY);
      let radians = this.angle/180 * Math.PI;
      ctx.rotate(radians);
      ctx.translate(this.centreX * -1, this.centreY * -1);
      ctx.drawImage(this.sprite, this.x, this.y, 75/2, 75/2);
      ctx.restore();
    }
  }
}