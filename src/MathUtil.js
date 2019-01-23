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
 