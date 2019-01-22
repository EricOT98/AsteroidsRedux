class Projectile{

  constructor(x,y, angle){
    this.positionX = x;
    this.positionY = y;

    this.velocityX = 0;
    this.velocityY = 0;

    this.angle = angle;
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
    ctx.arc(this.positionX, this.positionY, 5, 0, 2 * Math.PI);
    ctx.stroke();


    
  }

}
