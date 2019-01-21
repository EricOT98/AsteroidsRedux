var gameNs = {};

function main() {
  init();
}

/**
* Initialise the canvas
*/
function init() {
    console.log('initialising Game');

    var canv = document.createElement('canvas');
    canv.id = "canvas";
    canv.width = window.innerWidth;
    canv.height = window.innerHeight;

    document.body.appendChild(canv);
}
