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
      this.initialiseAsteroids();
  }

  initialiseAsteroids() {
      for(var i = 0; i < this.initialAsteroidCount; i++) {
          var spriteNo = Math.floor(randomRange(1, 4));
          var xPos = randomRange(100, window.innerWidth - 100);
          var yPos = randomRange(100, window.innerHeight - 100);
          var speed = randomRange(this.minSpeed, this.maxSpeed);
          var rotation = randomRange(0, Math.PI * 2);
          this.asteroids[i] = new Asteroid(xPos, yPos, speed, rotation, 200, 1);
          var path = "assets/images/Asteroid-Large-" + spriteNo.toString() + ".png";
          this.asteroids[i].setSprite(this.assetManager.getAsset(path));
      }
  }

  createSplit(x, y, rotation, generation) {
    var size = "Medium";
    var radius = 100;
    if(3 === generation) {
      size = "Small";
      radius = 50;
    }
    var rotationVariation = randomRange(Math.PI / 6, Math.PI - 1);
    var spriteNo = Math.floor(randomRange(1, 4));
    var xPos = randomRange(100, window.innerWidth - 100);
    var yPos = randomRange(100, window.innerHeight - 100);
    var speed = randomRange(this.minSpeed, this.maxSpeed);
    var rotation = randomRange(0, Math.PI * 2);
    var leftRotation = rotation - rotationVariation;
    var rightRotation = rotation + rotationVariation;
    var leftAsteroid = new Asteroid(xPos, yPos, speed, leftRotation, radius, generation);
    var rightAsteroid = new Asteroid(xPos, yPos, speed, rightRotation, radius, generation);
    leftAsteroid.setSprite(this.assetManager.getAsset("assets/images/Asteroid-" + size + "-" + spriteNo.toString() + ".png"));
    rightAsteroid.setSprite(this.assetManager.getAsset("assets/images/Asteroid-" + size + "-" + spriteNo.toString() + ".png"));
    this.asteroids.push(leftAsteroid);
    this.asteroids.push(rightAsteroid);
  }

  update() {
      for(var i = 0; i < this.asteroids.length; i++) {
        if(!this.asteroids[i].alive ) {
          var asteroidGeneration =  this.asteroids[i].generation;
          if(this.maxGeneration !== asteroidGeneration) {
            this.createSplit(this.asteroids[i].xPos, this.asteroids[i].yPos, this.asteroids[i].rotation, asteroidGeneration + 1)
          }
          this.asteroids.splice(i, 1); // remove dead asteroids
        }
        else {
          this.asteroids[i].update();
        }
      }
  }

  draw(ctx) {
      for(var i = 0; i < this.asteroids.length; i++) {
        console.log(i)
        this.asteroids[i].draw(ctx);
      }
  }
}