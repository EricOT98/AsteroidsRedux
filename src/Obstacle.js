class Obstacle {
  constructor(x = 0, y = 0, width = 0, height = 0, speed = 0, direction = 0, assetManager) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
    this.speed = speed;
    this.direction = direction;
    this.bumped = false;
    this.emissionComplete = false;
    this.img = assetManager.getAsset("assets/images/obstacle.png");
  }

  update() {
    this.wrapAround();
    this.x += this.speed * Math.cos(this.direction);
    this.y += this.speed * Math.sin(this.direction);

    this.centerX = this.x + this.width / 2;
    this.centerY = this.y + this.height / 2;
    if (this.bumped) {
      if(this.emitTimer >= 1 * 60){
        this.emissionComplete=true;
        this.bumped = false;
        this.emitTimer = 0;
      }
    }
  }

  draw(ctx) {

    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
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
