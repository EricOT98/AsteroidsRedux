class Projectile{

  constructor(x,y, angle){
    this.positionX = x;
    this.positionY = y;

    this.velocityX = 0;
    this.velocityY = 0;

    this.angle = angle;
    this.radius = 5;
    this.alive = true;
  }
  update(){
    var radians = this.angle;

    this.velocityX = Math.cos(radians)* 15;
    this.velocityY = Math.sin(radians)* 15;

    this.positionX -= this.velocityX;
    this.positionY -= this.velocityY;

  }
  draw(ctx){
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
