/*jshint esversion: 6 */

/**
 * HUD class
 * @class
 * @classdesc This class updates and draws the players HUD on the canvas.
 */
class HUD {

    /**
 * function to create a HUD.
 * @constructor HUD Consructor function
 */
    constructor (livesImage, shieldImage, rateOfFireImage)
    {
        this.score = 0;
        this.UIX = 50;
        this.UIY = 100;
        this.lives = 3;
        this.width = 100;
        this.height = 100;

        this.life1 = new Image();
        this.life1X = 50;
        this.life1Y = 125;

        this.life2 = new Image();
        this.life2X = 175;
        this.life2Y = 125;

        this.life3 = new Image();
        this.life3X = 300;
        this.life3Y = 125;

        this.shield = new Image();
        this.shieldX = window.innerWidth - ((this.width * 2 + 50) + 50);
        this.shieldY = 100;

        this.fire = new Image();
        this.fireX = window.innerWidth - ((this.width * 1) + 50);
        this.fireY = 100;


        this.life1 = livesImage;
        this.life2 = livesImage;
        this.life3 = livesImage;

        this.shield = shieldImage;
        this.fire = rateOfFireImage;

        this.pickUpShield = false;
        this.pickupFire = false;
    }

    /**
     * Draw all aspects on HUD.
     */
    draw(ctx) {
        ctx.font = "100px Hyperspace";
        ctx.fillStyle = "white";
        ctx.textAlign = "left";
        ctx.fillText("Score: " + this.score, this.UIX, this.UIY); 
    
        if(this.lives > 0){
            ctx.save();
            ctx.translate(this.life1X + (this.width / 2), this.life1Y + (this.height / 2));
            ctx.rotate((90 * Math.PI) / 180);
            ctx.translate((this.life1X +  (this.width / 2)) * -1, (this.life1Y + (this.height / 2)) * -1);
            ctx.drawImage(this.life1, this.life1X, this.life1Y, this.width, this.height);
            ctx.restore();
        }

        if(this.lives > 1){
            ctx.save();
            ctx.translate(this.life2X + (this.width / 2), this.life2Y + (this.height / 2));
            ctx.rotate((90 * Math.PI) / 180);
            ctx.translate((this.life2X +  (this.width / 2)) * -1, (this.life2Y + (this.height / 2)) * -1);
            ctx.drawImage(this.life2, this.life2X, this.life2Y, this.width, this.height);
            ctx.restore();
        }
        
        if(this.lives > 2){
            ctx.save();
            ctx.translate(this.life3X + (this.width / 2), this.life3Y + (this.height / 2));
            ctx.rotate((90 * Math.PI) / 180);
            ctx.translate((this.life3X +  (this.width / 2)) * -1, (this.life3Y + (this.height / 2)) * -1);
            ctx.drawImage(this.life3, this.life3X, this.life3Y, this.width, this.height);
            ctx.restore();
        }

        if(this.pickUpShield){
            ctx.drawImage(this.shield, this.shieldX, this.shieldY, this.width, this.height);
        }

        if(this.pickUpFire){
            ctx.drawImage(this.fire, this.fireX, this.fireY, this.width, this.height);
        }
    }

    /**
     * update Hud informaion.
     */
    update() {
        
    }

    /**
     * update Score variable for HUD.
     * @param {Integer} score, Score to be shown in the HUD.
     */
    updateScore(score){
        this.score = score;
    }
}

