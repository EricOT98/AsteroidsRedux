/**
 * Math Utility Functions
 */

 /**
  * Get a random float between a range
  * @param {Minimum value allowable in range (exclusive)} min 
  * @param {Maximum value allowable in range (exclusive)} max 
  */
 function randomRange(min, max) {
    return Math.random() * (max - min) + min;
 }

 /**
  * Get the distance between two points
  * @param {Point one X position} x1 
  * @param {Point one Y position} y1 
  * @param {Point two X position} x2 
  * @param {Point two Y position} y2 
  */
 function getDistance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1));
 }

 function getSqrLength(x, y) {
   return (x*x) + (y*y);
 }

 function dot(a, b) {
   return (a.x * b.x) + (a.y * b.y);
 }

 function degreesToRadians(degrees) {
   return degrees * (Math.PI / 180);
 }

 /**
  * Function checks wheher two circles are collding
  * @param {Circle one centre X} x1 
  * @param {Circle one centre Y} y1 
  * @param {Circle one radius} rad1 
  * @param {Circle two centre X} x2 
  * @param {Circle two centre Y} y2 
  * @param {Circle two radius} rad2 
  */
 function checkCircleCircleCollision(x1, y1, rad1, x2, y2, rad2) {
    return getDistance(x1, y1, x2, y2) < rad1 + rad2;
 }


/**
 * Get the closest point on a triangle from a point
 * @param {Object} p - The point to check
 * @param {Object} a - The 1st vertex of the triangle
 * @param {Object} b - The 2nd vertex of the triangle
 * @param {Object} c - The 3rd vertex of the triangle
 * @returns {Object}
 */
 function closestPointOnTriangle(p, a, b, c) {
   // Check p in region outside A
   let ab = {'x': b.x - a.x, 'y': b.y - a.y};
   let ac = {'x': c.x - a.x, 'y': c.y - a.y};
   let ap = {'x': p.x - a.x, 'y': p.y - a.y};

   let d1 = dot(ab, ap);
   let d2 = dot(ac, ap);

   if (d1 <= 0.0 && d2 <= 0.0)
     return a;

   // Check P in vertex region outside B
   let bp = {'x': p.x - b.x, 'y': p.y - b.y};
   let d3 = dot(ab, bp);
   let d4 = dot(ac, bp);
   if (d3 >= 0.0 && d4 <= d3)
     return b;

   // Check p in edge region ab, yes project P onto AB
   let vc = d1*d4 - d3*d2;
   if (vc <= 0.0 && d1 >= 0.0 && d3 <= 0.0) {
     let v = d1 / (d1-d3);
     return {'x': a.x + (v * ab.x), 'y': a.y + (v * ab.y)};
   }

   // Check if p outside c
   let cp = {'x': p.x - c.x, 'y': p.y - c.y};
   let d5 = dot(ab, cp);
   let d6 = dot(ac, cp);
   if (d6 >= 0.0 && d5 <= d6) {
     return c;
   }

   // Check if P in edge of AC, project onto ac
   let vb = (d5*d2) - (d1 * d6);
   if (vb <= 0.0 && d2 >= 0.0 && d6 <= 0.0) {
     let w = d2 / (d2 - d6);
     return {'x': a.x + (w * ac.x), 'y': a.y + (w * ac.y)};
   }

   //Check if P in edge of BC, project onto BC
   let va = d3*d6 - d5*d4;
   if (va <= 0.0 && (d4 - d3) >= 0.0 && (d5 - d6) >= 0.0) {
     let w = (d4 - d3) / ((d4 - d3) + (d5 - d6));
     return {'x': b.x + (w * (c.x - b.x)), 'y': b.y + (c.y * (c.y - b.y))};
   }
// P inside face region. Compute Q through its barycentric coordinates (u,v,w)
   let denom = 1.0 / (va + vb + vc);
   let v = vb * denom;
   let w = vc * denom;
   return {'x': a.x + (ab.x * v) + (ac.x * w), 'y': a.y + (ab.y * v) + (ac.y * w)};
 }
 function circleTriangle(center, radius, v1, v2, v3) {
   let p = closestPointOnTriangle(center, v1, v2, v3);
   let v = {'x': p.x - center.x, 'y': p.y - center.y};
   return dot(v, v) <= radius * radius;
 }

/**
 * Check for circle AABB collision
 * @param {Object} center - the center of the Object
 * @param {Integer} radius - the radius of the circle
 * @param {Object} aabb - the box bounds to check
 * @returns {boolean}
 */
function circleAABB(center, radius, aabb) {
  let p = {'x': center.x, 'y': center.y};
  // Finds closest point to the possible collision
  if (p.x < aabb.left) {
    // L
    p.x = aabb.left;
  }
  else if (p.x > aabb.left + aabb.width) {
    // R
    p.x = aabb.left + aabb.width;
  }

  if (p.y < aabb.top) {
    // T
    p.y = aabb.top;
  }
  else if (p.y >aabb.top + aabb.height) {
    // B
    p.y = aabb.top + aabb.height;
  }
  let distSqr = getSqrLength(p.x - center.x, p.y - center.y); //Will always be positive
  return distSqr < (radius * radius);
}