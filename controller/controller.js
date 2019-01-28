// Controller Source

var startX = 0;
var startY = 0;
var endX = 0;
var endY = 0;
var validStart = false;
var vectorReady = false;
var socket;

var gestureManager = new GestureManager(false);

var thrustDown = false;
var leftDown = false;
var rightDown = false;
var fireDown = false;

var buffer = 20;

var width;
var height;
var halfWidth;
var quarterWidth;
var eighthWidth;
var halfHeight;
var quarterHeight;
var thirdHeight;

function main()
{

  var ws = new WebSocket("ws://192.168.0.178:8080/wstest");

  //called when the websocket is opened
  ws.onopen = function() {
    var message = {};
    message.type = "connect";
    message.data = "controller";
    var mString = JSON.stringify(message);
    ws.send(mString);
  };

  //called when the client receives a message
  ws.onmessage = function (evt) {
    console.log("Message Received, Discarded");
 };
 socket = ws;
 init(ws);
}


function init(ws) {
  // Canvas Setup
  var canvas = document.createElement("canvas");
  canvas.id = "canvas";

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  var ctx = canvas.getContext('2d');
  document.body.appendChild(canvas);
  width = window.innerWidth;
  height = window.innerHeight;
  halfWidth = window.innerWidth / 2;
  quarterWidth = halfWidth / 2;
  eighthWidth = quarterWidth / 2;
  halfHeight = window.innerHeight / 2;
  quarterHeight = halfHeight / 2;
  eighthHeight = quarterHeight / 2;
  thirdHeight = window.innerHeight / 3;
  loop();
}

function loop() {
  var touches = gestureManager.getAllTouches();

  var ld = false;
  var rd = false;
  var td = false;;
  var fd = false;
  var send = false;
  for(var i = 0; i < touches.length; i++) 
  {
    if(checkRectCollision(touches[i].x, touches[i].y, buffer, halfHeight, eighthWidth, thirdHeight))
    {
      ld = true;
    }
    else if(checkRectCollision(touches[i].x, touches[i].y, buffer + eighthWidth, halfHeight - quarterHeight, eighthWidth, thirdHeight))
    {
      td = true;
    }
    else if(checkRectCollision(touches[i].x, touches[i].y, buffer + quarterWidth, halfHeight, eighthWidth, thirdHeight))
    {
      rd = true
    }
    else if(checkRectCollision(touches[i].x, touches[i].y, halfWidth, 0, width - buffer, height - buffer))
    {
      fd = true;
    }
  }
  send = (thrustDown !== td) || (leftDown !== ld) || (rightDown !== rd) || (fireDown !== fd);

  render();
  if(send)
  {
    thrustDown = td;
    leftDown = ld;
    rightDown = rd;
    fireDown = fd;
    var object = {};
    object.type = "ctrldata";
    object.data = {rd: rightDown, td: thrustDown, ld: leftDown, fd: fireDown};
    sendUpdate(socket, object);
  }
  window.requestAnimationFrame(loop);
}

function render()
{
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  ctx.strokeStyle="#000000";
  ctx.font = "30px Arial";
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var grey = 'rgb(125,125,125)';
  var yellow = 'rgb(255,205,0)';

  var buffer = 20;

  // Draw Left
  ctx.rect(buffer, halfHeight, eighthWidth, thirdHeight);
  ctx.fillStyle = leftDown ? yellow : grey;
  ctx.fillRect(buffer, halfHeight, eighthWidth, thirdHeight);
  ctx.stroke();
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillText("Left", buffer + 30, halfHeight + eighthHeight);

  // Draw Thrust
  ctx.rect(buffer + eighthWidth, halfHeight - quarterHeight, eighthWidth, thirdHeight);
  ctx.fillStyle = thrustDown ? yellow : grey;
  ctx.fillRect(buffer + eighthWidth, halfHeight - quarterHeight, eighthWidth, thirdHeight);
  ctx.stroke();
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillText("Thrust", buffer + eighthWidth + 30, halfHeight - quarterHeight + eighthHeight);

  // Draw Right
  ctx.rect(buffer + quarterWidth, halfHeight, eighthWidth, thirdHeight);
  ctx.fillStyle = rightDown ? yellow : grey;
  ctx.fillRect(buffer + quarterWidth, halfHeight, eighthWidth, thirdHeight);
  ctx.stroke();
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillText("Right", buffer + quarterWidth + 30, halfHeight + eighthHeight);

  // Draw Fire
  ctx.rect(halfWidth, 0, width - buffer, height - buffer);
  ctx.fillStyle = fireDown ? yellow : grey;
  ctx.fillRect(halfWidth, 0, width - buffer, height - buffer);
  ctx.stroke();
  ctx.fillStyle = 'rgb(0,0,0)';
  ctx.fillText("Fire", halfWidth + quarterWidth, halfHeight);

}

function getDistance(x1, y1, x2, y2)
{
  return Math.sqrt((x2 -x1) * (x2 -x1) + (y2 - y1) * (y2 - y1));
}

function sendUpdate(ws, obj)
{
  var messageString = JSON.stringify(obj);
  if(ws.readyState === ws.OPEN)
  {
    console.log("Sending Message")
    ws.send(messageString);
  }
}

function checkRectCollision(x, y, rx, ry, rw, rh)
{
  if((x > rx) && (x < rx + rw) && (y > ry) && (y < ry + rh)) 
  {
    return true;
  }
  return false;
}
