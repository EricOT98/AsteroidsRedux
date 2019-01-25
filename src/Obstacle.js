/**
 * @Author: Eric O 'Toole
 */

class Obstacle {


  /**
   * Default obstacle constructor
   * @param {number} x - x pos
   * @param {number} y - Y pos
   * @param {number} width - Width of obs
   * @param {number} height - Height of obs
   * @param {number} speed - Speed of the obs
   * @param {number} direction -
   * @param {AssetManager} assetManager
   */
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

  /**
   * Move the obstacle in its direction
   */
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

  /**
   * Render the obstacle image
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Wraparound spawn for the obstacle
   */
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
