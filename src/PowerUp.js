class PowerUp{

  constructor(x, y, type, player)
  {
    this.player = player;
    this.positionX = x;
    this.positionY = y;
    this.type = type;
    this.radius = 18.75;

    this.centreX = this.positionX + this.radius;
    this.centreY = this.positionY + this.radius;

    this.sprite = new Image();
    this.color='';
    if(this.type === "shield"){
      this.sprite.src = "assets/powerups/powerupshield.png";
      this.color = 'rgb(138,43,226)';
    }
    else if(this.type === "shoot"){
      this.sprite.src = "assets/powerups/poweruprof.png";
      this.color = 'rgb(255,215,0)';
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
  update()
  {
    this.emitter.addNewParticles();
    this.emitter.plotParticles(window.innerWidth, window.innerHeight);
    this.angle+=1;
    if(this.angle >=360)
    {
      this.angle=0;
    }
    if(this.alive){
      if(checkCircleCircleCollision(this.centreX, this.centreY, this.radius, this.player.centreX, this.player.centreY, this.player.radius))
      {
        this.alive = false;
        if(this.type === "shield"){
          this.player.shieldTime = 0;
          this.player.shielded=true;
        }
        else if(this.type == "shoot"){
          this.player.autoTime = 0;
          this.player.autoFire=true;
        }
      }
    }

  }
  draw(ctx)
  {
    if(this.alive){
      this.emitter.draw(ctx);

      ctx.save();
      ctx.translate(this.centreX, this.centreY);
      var radians = this.angle/180 * Math.PI;
      ctx.rotate(radians);
      ctx.translate(this.centreX * -1, this.centreY * -1);
      ctx.drawImage(this.sprite, this.positionX, this.positionY, 75/2, 75/2);
      ctx.restore();

      //ctx.drawImage(this.sprite, this.positionX, this.positionY, 75/2,75/2);
    }
  }
}
