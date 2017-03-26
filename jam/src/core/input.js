import Vector from './vector';
import Module from './module';
// This is how we get keyboard input for now, and maybe mouse in the future.
// This object is much more like a namespace than a class. There's a lot of
// stuff hidden in closures and self is not used. We just return an object with
// the functions we want to expose.

/*      SAMPLE USAGE:

** Basic movement behavior **
if(jam.Input.buttonDown("LEFT")) { player.x = -1; }

** Fire a weapon  **
if(jam.Input.justPressed("X")) {
var bullet = jam.Sprite(some_x, some_y);
bullet.setImage("image.png");
bullet.velocity.x = 200;
game.add(bullet)
}

** Charge up a jump **
if(jam.Input.buttonDown("Z")) { charge += elapsed; }
if(jam.Input.justReleased("Z")){        velocity.y = -(charge+40); }

** Bindable buttons **
buttonBindings = {attack: "Z", dash: "X"};
if(jam.Input.buttonDown(buttonBindings.attack)) { player.playAnimation(attacking); }

*/
// Keyboard is independent of canvas, but mouse requires a canvas to calculate position. If we want mutiple canvases later on we can modularize the mouse code but for now we are just shoving the first game cancas we make here.
var lib = {};
lib.canvas = undefined;
export default lib;

var KEY_CODE_MAP = {
  192: "~",
  32: "SPACE",
  37: "LEFT",
  38: "UP",
  39: "RIGHT",
  40: "DOWN"
};
var MOUSE_BUTTON_MAP = {
  1: 'MOUSE_LEFT',
  3: 'MOUSE_RIGHT'
};


var _getMouseCoords = function (e) {
  if (lib.canvas === undefined) {
    return;
  }
  var x;
  var y;
  if (e.pageX || e.pageY) {
    // Chrome, Opera
    x = e.pageX;
    y = e.pageY;
  } else {
    // FireFox
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  x -= lib.canvas.offsetLeft;
  y -= lib.canvas.offsetTop;

  // We need to be mindful of how CSS zoom may affect this.
  if (x >= 0 && x < lib.canvas.width && y >= 0 && y < lib.canvas.height) {
    return new Vector(x, y);
  }
};

lib._justPressedButtons = [];
lib._justReleasedButtons = [];
lib._buttons = {};
lib.mouse = new Vector(0, 0);

// Based on a keycode, get a string name for the key.
// Special cases for arrow keys
lib._getName = function (code) {
  if (code >= 65 && code <= 90 || code >= 48 && code <= 57) {
    return String.fromCharCode(code);
  } else if (code >= 97 && code <= 122) {
    return String.fromCharCode(code).toUpperCase();
  }
  if (KEY_CODE_MAP[code] != undefined) {
    return KEY_CODE_MAP[code];
  } else {
    return "UKNOWN";
  }
};

lib._getMouseButton = function (code) {
  if (MOUSE_BUTTON_MAP[code] != undefined) {
    return MOUSE_BUTTON_MAP[code];
  } else {
    return "UNKNOWN";
  }
};

lib._update = function () {
  lib._justPressedButtons = [];
  lib._justReleasedButtons = [];
};

// Now add our update at the end of the game update. We need
// an update function to make sure the justPressed and justReleased
// lists are updated each frame.
/** /
 // moving this into game while we're restructuring, will revisit.
 jam.Game = jam.extend(jam.Game, function(cls){
 cls.update = jam.extend(cls.update, function(){
 self._update();
 });
 return cls;
 }, true, true);
 /**/

lib.justPressed = function (name) {
  return lib._justPressedButtons.indexOf(name) !== -1;
};

lib.justReleased = function (name) {
  return lib._justReleasedButtons.indexOf(name) !== -1;
};

lib.buttonDown = function (name) {
  return lib._buttons[name];
};

// Hook into the js events for key pressing
document.onkeydown = function (e) {
  var code = 'which' in e ? e.which : e.keyCode;
  if (lib._buttons[lib._getName(code)] === false || lib._buttons[lib._getName(code)] === undefined) {
    lib._buttons[lib._getName(code)] = true;
    lib._justPressedButtons.push(lib._getName(code));
  }
};
document.onkeyup = function (e) {
  var code = 'which' in e ? e.which : e.keyCode;
  if (lib._buttons[lib._getName(code)] === true) {
    lib._buttons[lib._getName(code)] = false;
    lib._justReleasedButtons.push(lib._getName(code));
  }
};
document.onmousedown = function(e){
  var button = lib._getMouseButton(e.which);
  if(lib._buttons[button] === false || lib._buttons[button] === undefined){
    lib._buttons[button] = true;
    lib._justPressedButtons.push(button);
  }
};
document.onmouseup = function(e){
  var button = lib._getMouseButton(e.which);
  if(lib._buttons[button] === true){
    lib._buttons[button] = false;
    lib._justReleasedButtons.push(button);
  }
};
document.onmousemove = function(e){
  var mouse = _getMouseCoords(e);
  if(mouse != undefined){
    lib.mouse = mouse;
  }
  // Else mouse is not on the canvas so we don't update the position.
};
