/**
 * Asteroid Manager Class
 */
class AsteroidManager {

  constructor(initialAsteroidCount, minSpeed, maxSpeed, assetManager) {
      this.initialAsteroidCount = initialAsteroidCount;
      this.minSpeed = minSpeed;
      this.maxSpeed = maxSpeed;
      this.assetManager = assetManager;
      this.asteroids = [];
      this.maxGeneration = 3;
      this.useNewAssets = false;
      this.initialiseAsteroids();
  }

  updateAssets(useNewAssets){
    this.useNewAssets = useNewAssets;
    this.asteroids = [];
  }

  createAsteroid(x, y, rotation, gen) {
    var prepend = "";
    if(this.useNewAssets){
      var randNum = Math.floor(randomRange(1, 4)); // 4 is exclusive in this calculation, only 1, 2 or 3 can be returned
      if(1 === randNum) {
        prepend = "/Grey";
      }
      else if(2 === randNum) {
        prepend = "/Red";
      }
      else {
        prepend = "/Blue";
      }
    }
    var spriteNo = Math.floor(randomRange(1, 4));
    var pathStart = "assets/images" + prepend + "/Asteroid-";
    var pathEnd = "-" + spriteNo.toString() + ".png";
    var size;
    var rad;
    if(1 === gen) {
      size = "Large";
      rad = 200;
    }
    else if(2 === gen) {
      size = "Medium";
      rad = 100;
    }
    else {
      size = "Small";
      rad = 50;
    }
    var speed = randomRange(this.minSpeed, this.maxSpeed);
    var asteroid = new Asteroid(x, y, speed, rotation, rad, gen);
    asteroid.updateAssets(this.useNewAssets);
    asteroid.setSprite(this.assetManager.getAsset(pathStart + size + pathEnd));
    this.asteroids.push(asteroid);
  }

  initialiseAsteroids() {
    for(var i = 0; i < this.initialAsteroidCount; i++) {
        var x = randomRange(100, window.innerWidth - 100);
        var y = randomRange(100, window.innerHeight - 100);
        var rotation = randomRange(0, Math.PI * 2);
        this.createAsteroid(x, y, rotation, 1);
    }
  }

  createSplit(x, y, rotation, generation) {
    var x = randomRange(0, 50) + x - 25;
    var y = randomRange(0, 50) + y - 25;
    var rotationVariation = randomRange(Math.PI / 6, Math.PI - 1);
    var leftRotation = rotation - rotationVariation;
    var rightRotation = rotation + rotationVariation;
    generation;
    this.createAsteroid(x, y, leftRotation, generation);
    this.createAsteroid(x, y, rightRotation, generation);
  }

  update() {
    if(this.asteroids.length === 0) {
      this.initialiseAsteroids();
    }
    else {
      for(var i = 0; i < this.asteroids.length; i++) {

        if(!this.asteroids[i].alive) {
          if(!this.asteroids[i].split){
            var asteroidGeneration = this.asteroids[i].generation;
            if(this.maxGeneration !== asteroidGeneration) {
              this.createSplit(this.asteroids[i].xPos, this.asteroids[i].yPos, this.asteroids[i].rotation, asteroidGeneration + 1)
            }
            this.asteroids[i].split = true;
          //  this.asteroids[i].emissionComplete = true
          }
          if(this.asteroids[i].emissionComplete) {
            this.asteroids.splice(i, 1); // Remove dead asteroids
          }
        }
        if(undefined !== this.asteroids[i] && !this.asteroids[i].emissionComplete){
          this.asteroids[i].update();
        }
      }
    }
  }

  draw(ctx) {
      for(var i = 0; i < this.asteroids.length; i++) {
        this.asteroids[i].draw(ctx);
      }
  }
}
