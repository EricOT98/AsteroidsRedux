/*jshint esversion: 6 */

 /**
 * Alien AI class
 * @class
 * @classdesc This class manages the alien Ai which moves at a random velocity, and shoots at the player,
 * The aliens become harder in difficulty the longer they are alive.
 */
class Alien {

    /**
     * Alien Ai Default Constructor function
     * @constructor Default Constructor, No parameters
     */
    constructor () {
            this.alive = true;
            this.image= new Image();
            this.position = {"x" : 0, "y" : 0};
            this.position.x = 0;
            this.position.y = 0;
            this.width = 100;
            this.height = 100;
            this.velocity = {"x" : 0, "y" : 0};
            this.velocity.x = 0;
            this.velocity.y = 0;
            this.speed = 6;
            this.fireRate = 240;
            this.difficulty = 0;
            this.clock = 0;
            this.spawn();
            this.bullets = [];
            this.angle = 0;
            this.centreX = 0;
            this.centreY = 0;

            this.deathTimer = 0;
            this.respawnTime = 480;

            this.useNewAssets = false;
       }

    /**
     * Alien Ai Update Assets Function
     * @function updateAssets , pass in assetmanager and new Assets
     */
    updateAssets(assetManager, useNewAssets){
      this.useNewAssets = useNewAssets;
      if(this.useNewAssets === true){
        this.setImage(assetManager.getAsset('assets/images/enemy.png'));
      }
      else{
        this.setImage(assetManager.getAsset('assets/images/Alien-1.png'));
      }
    }

    /**
     * Alien Ai Update Spawn Function
     * @function spawn , Spawns in Ai in random position off screen and sets its velocity randomly.
     */
    spawn() {
        this.alive = true;
        this.deathTimer = 0;
        var side = Math.floor(Math.random() * Math.floor(4));
        if(side === 0){
            this.position.x = -this.width;
            this.position.y = Math.floor(Math.random() * Math.floor(window.innerHeight));
        }
        else if(side === 1){
            this.position.x = window.innerWidth;
            this.position.y = Math.floor(Math.random() * Math.floor(window.innerHeight));
        }
        else if(side === 2){
            this.position.y = -this.height;
            this.position.x = Math.floor(Math.random() * Math.floor(window.innerWidth));
        }
        else if(side === 3){
            this.position.y = window.innerHeight;
            this.position.x = Math.floor(Math.random() * Math.floor(window.innerWidth));
        }

        this.velocity.x = ((Math.random() * 2) - 1) * Math.floor(Math.random() * Math.floor(this.speed) + 1);
        this.velocity.y = ((Math.random() * 2) - 1) * Math.floor(Math.random() * Math.floor(this.speed) + 1);
    }

    /**
     * Alien Ai Set Image Function
     * @function setImage , Sets the image to be drawn.
     * @param {Image} newImage, new image to be drawn
     */
    setImage(newImage) {
        this.image = newImage;
    }

    /**
     * Alien Ai Update Function
     * @function update , Updates Ai.
     * @param {Integer} playerPosx, players x position.
     * @param {Integer} playerPosy, players y position.
     */
    update(playerPosx, playerPosy) {
        if(this.alive) {
            this.position.x += this.velocity.x;
            this.position.y += this.velocity.y;
            this.centreX = this.position.x + this.width / 2;
            this.centreY = this.position.y + this.height / 2;
            this.checkWrap();

            if(this.clock > this.fireRate) {
                this.fire(playerPosx, playerPosy);
                this.clock = 0;
            }

        for(var x=0; x < this.bullets.length; x++) {
          this.bullets[x].update();

          if(this.bullets[x].alive === false) {
            this.bullets.splice(x, 1); //remove dead bullet
          }
        }

            this.clock +=1;
        }
        else{
            this.deathTimer += 1;
            if(this.deathTimer > this.respawnTime){
                this.spawn();
            }
        }
    }

     /**
     * Alien Ai Draw Function
     * @function draw , Draws Ai.
     * @param {ctx} ctx, Canvas context to be drawn on.
     */
    draw(ctx) {
        if(this.alive) {
            ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);

            for(var x=0; x < this.bullets.length; x++) {
                this.bullets[x].draw(ctx);
            }
        }
     }

     /**
     * Alien Ai Fire Function
     * @function fire , Fires a bullet at the players direction.
     * @param {Integer} playerPosx, players x position.
     * @param {Integer} playerPosy, players y position.
     */
     fire(playerPosx, playerPosy) {
        this.angle = Math.atan2(this.position.y - playerPosy, this.position.x - playerPosx);

        if(this.useNewAssets){
          var bullet = new Projectile(this.position.x + (this.width / 2), this.position.y + (this.height / 2), this.angle);
          bullet.updateAssets(this.useNewAssets);
          this.bullets.push(bullet);
        }
        else {
          this.bullets.push(new Projectile(this.position.x + (this.width / 2), this.position.y + (this.height / 2), this.angle));
        }

     }

      /**
     * Alien Ai Check Wrap Function
     * @function checkWrap , checks which side of the screen the Ai flys off and wraps its position.
     */
     checkWrap() {
         if(this.position.x + this.width < 0){
            this.position.x = window.innerWidth;
         }
         else if(this.position.x > window.innerWidth){
             this.position.x = -this.width;
         }
         else if(this.position.y + this.image.height < 0){
            this.position.y = window.innerHeight;
         }
         else if(this.position.y > window.innerHeight){
             this.position.y = -this.height;
         }
     }

      /**
     * Alien Ai Die Function
     * @function die , Kills the Alien Ai and clears its bullets list.
     */
     die() {
         this.alive = false;
         this.bullets = [];
     }
}
