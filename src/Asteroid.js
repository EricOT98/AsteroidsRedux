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
  }

  draw(ctx) {
    if(this.alive){
      ctx.drawImage(this.sprite, this.xPos, this.yPos, this.radius * 2, this.radius * 2);
    }
  }

  setSprite(newSprite) {
    this.sprite = newSprite;
  }

  destroy() {
      this.alive = false;
  }
}