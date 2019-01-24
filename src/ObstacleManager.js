class ObstacleManager {
  constructor() {
    this.obstacles = [];
    this.maxObstacles = 10;
    this.minSpeed = 1;
    this.maxSpeed = 3;

    this.collisionEmitters = [];
  }

  createCollisionEmitter(posX, posY){
    var emitter = new Emitter(new Vector(800, 530), Vector.fromAngle(0.10, 1), 10 ,'rgb(255,255,255)');
    emitter.setParticlesLifeTime(0.75);
    emitter.setEmissionRate(1);
    emitter.setMaxParticles(15);
    emitter.useATriangle();
    emitter.updateSize(5,5);
    emitter.setPos(posX,posY);
    if(this.collisionEmitters.length < 5)
    {
      this.collisionEmitters.push(emitter);
    }

  }
  initilaiseObstacles() {
    for (let i = 0; i < this.maxObstacles; ++i) {
      let x = randomRange(100, window.innerWidth + 100);
      let y = randomRange(100, window.innerHeight + 100);
      let width = randomRange(25, 200);
      let height = randomRange(25, 200);
      let rotation = randomRange(0, Math.PI * 2);
      let speed = randomRange(this.minSpeed, this.maxSpeed);
      this.createObstacle(x,y,width, height,speed, rotation)
    }
  }

  createObstacle(x, y, width, height, speed, direction) {
    this.obstacles.push(new Obstacle(x, y, width, height, speed, direction));
  }

  update() {
    for (let i = 0; i < this.maxObstacles; ++i) {
      this.obstacles[i].update();
    }

    for(var i = 0; i< this.collisionEmitters.length; i++){
      this.collisionEmitters[i].addNewParticles();
      this.collisionEmitters[i].plotParticles(window.innerWidth, window.innerHeight);
      if(this.collisionEmitters[i].emitterLifeTime/60 > 0.2 )
      {
        this.collisionEmitters.splice(i,1);
      }
    }
  }

  draw(ctx) {
    for (let i = 0; i < this.maxObstacles; ++i) {
      this.obstacles[i].draw(ctx);
    }
    for(var i = 0; i< this.collisionEmitters.length; i++){
      this.collisionEmitters[i].draw(ctx);
    }
  }


  checkCollisions(cx, cy, radius, obs) {
    // P will be the point on the tile that's closest to the collision.
    let p = {'x': cx, 'y': cy};
    // Centre of the cicle, cached for later
    let cen = {'x': cx, 'y': cy};

    let pos = {'x': obs.x, 'y': obs.y};
    let size = {'width': obs.width, 'height': obs.height};

    // Finds closest point to the possible collision
    if (p.x < pos.x) {
      // L
      p.x = pos.x;
    }
    else if (p.x > pos.x + size.width) {
      // R
      p.x = pos.x + size.width;
    }

    if (p.y < pos.y) {
      // T
      p.y = pos.y;
    }
    else if (p.y > pos.y + size.height) {
      // B
      p.y = pos.y + size.height;
    }

    // Distance between the circle's centre and the point of collision.
    let distSqr =getSqrLength(p.x - cen.x, p.y - cen.y); //Will always be positive
    if (distSqr < radius * radius)
    {
      //obs.emitter.setEmissionRate(10);

      obs.bumped = true;
      this.createCollisionEmitter(p.x, p.y);
    //  obs.emitter.setPos(p.x, p.y);
      let penDist = radius - Math.sqrt(distSqr);
      let penAngle = Math.atan2(p.y - cen.y, p.x - cen.x);

      let edge = {'x': 0, 'y': 0};
      edge.x = cen.x + radius * Math.cos(penAngle);
      edge.y = cen.y + radius * Math.sin(penAngle);

      let penVec = {'x': 0, 'y': 0};
      penVec.x = edge.x + penDist * Math.cos(penAngle);
      penVec.y = edge.y + penDist * Math.sin(penAngle);

      let respX = penVec.x - edge.x;
      let respY = penVec.y - edge.y;
      return {'x': cx - respX, 'y': cy - respY};
    }
    return cen;
  }
}
