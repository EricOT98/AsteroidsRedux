/*jshint esversion: 6 */

/**
 * Logo class
 * @class
 * @classdesc This logo class will animate the logo on loading screen.
 */
class Logo {

    /**
 * function to create an image object given the co-ordinates and size
 * @constructor Image Consructor function
 * @param {Integer} x x position.
 * @param {Integer} y y position.
 * @param {Integer} width width of the image.
 * @param {Integer} height height of the Image.
 * @param {String} canvasName name of canvas to be drawn on.
 */
    constructor (ani1Image, ani2Image, ani3Image, ani4Image)
    {
        this.width = 1600;
        this.height = 100;
        this.ani1 = new Image();
        this.ani2 = new Image();
        this.ani3 = new Image();
        this.ani4 = new Image();

        this.ani1 = ani1Image;
        this.ani2 = ani2Image;
        this.ani3 = ani3Image;
        this.ani4 = ani4Image;

        this.x = 150;
        this.y = 150;



        this.currentImage = this.ani1;
        this.ticksPerFrame = 5;
        this.tickCount = 0;
        this.counter = 0;

    }

    /**
     * Draw function for the Image.
     */
    draw(ctx) {
        ctx.drawImage(this.currentImage, this.x, this.y, this.width, this.height);
    }

    /**
     * update Animation.
     */
    update() {

        this.tickCount += 1;

        if(this.tickCount > this.ticksPerFrame)
        {
            this.tickCount = 0;

            if( this.currentImage === this.ani1){
                this.currentImage = this.ani2;
            }
            else if( this.currentImage === this.ani2){
                this.currentImage = this.ani3;
            }
            else if( this.currentImage === this.ani3){
                this.currentImage = this.ani4;
            }
            else if( this.currentImage === this.ani4){
                this.currentImage = this.ani1;
            }
        }
    }
}

