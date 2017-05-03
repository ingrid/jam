import v from './vector';
import System from "./system";

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

// This is a special case system because no entities should be added to it but all other systems should have acess to it, perhaps it shouldn't be go through the normal 'system' system.
export default class Input extends System{
  constructor(game){
    super(game);

    // Only one game and one canvas per jam instance, for now at least.
    Input.canvas = game._canvas;

    this.update_entity = undefined; // Should never be called.
    this.init = undefined;
  }

  update(e_list, game){
    Input._justPressedButtons = Input._justPressedButtonsBuffer;
    Input._justReleasedButtons = Input._justReleasedButtonsBuffer;
    Input._justPressedButtonsBuffer = [];
    Input._justReleasedButtonsBuffer = [];
  }
}

Input._justPressedButtons = [];
Input._justReleasedButtons = [];
Input._justPressedButtonsBuffer = [];
Input._justReleasedButtonsBuffer = [];
Input._buttons = {};
Input.mouse = new v(0, 0);

// Based on a keycode, get a string name for the key.
// Special cases for arrow keys
Input._getName = function(code){
  if (code >= 65 && code <= 90 || code >= 48 && code <= 57){
    return String.fromCharCode(code);
  }else if (code >= 97 && code <= 122){
    return String.fromCharCode(code).toUpperCase();
  }
  if (KEY_CODE_MAP[code] != undefined){
    return KEY_CODE_MAP[code];
  }else{
    return "UKNOWN";
    // Maybe log this.
  }
};

Input.justPressed = function(name){
  return Input._justPressedButtons.indexOf(name) !== -1;
};

Input.justReleased = function(name){
  return Input._justReleasedButtons.indexOf(name) !== -1;
};

Input.buttonDown = function(name){
  return Input._buttons[name];
};

var _getMouseCoords = function (e) {
  if (Input.canvas === undefined) {
    return;
  }
  var x, y;
  if (e.pageX || e.pageY) {
    // Chrome, Opera
    x = e.pageX;
    y = e.pageY;
  } else {
    // FireFox
    x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
    y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
  }
  x -= Input.canvas.offsetLeft;
  y -= Input.canvas.offsetTop;

  // We need to be mindful of how CSS zoom may affect this.
  if (x >= 0 && x < Input.canvas.width && y >= 0 && y < Input.canvas.height) {
    return new v(x, y);
  }
};

Input._getMouseButton = function (code) {
  if (MOUSE_BUTTON_MAP[code] != undefined) {
    return MOUSE_BUTTON_MAP[code];
  } else {
    return "UNKNOWN";
  }
};

// Hook into the js events for key pressing
document.onkeydown = function(e){
  var code = 'which' in e ? e.which : e.keyCode;
  if (Input._buttons[Input._getName(code)] === false || Input._buttons[Input._getName(code)] === undefined) {
    Input._buttons[Input._getName(code)] = true;
    Input._justPressedButtonsBuffer.push(Input._getName(code));
  }
};
document.onkeyup = function(e){
  var code = 'which' in e ? e.which : e.keyCode;
  if (Input._buttons[Input._getName(code)] === true) {
    Input._buttons[Input._getName(code)] = false;
    Input._justReleasedButtonsBuffer.push(Input._getName(code));
  }
};
document.onmousedown = function(e){
  var button = Input._getMouseButton(e.which);
  if(Input._buttons[button] === false || Input._buttons[button] === undefined){
    Input._buttons[button] = true;
    Input._justPressedButtonsBuffer.push(button);
  }
};
document.onmouseup = function(e){
  var button = Input._getMouseButton(e.which);
  if(Input._buttons[button] === true){
    Input._buttons[button] = false;
    Input._justReleasedButtonsBuffer.push(button);
  }
};
document.onmousemove = function(e){
  var mouse = _getMouseCoords(e);
  if(mouse != undefined){
    Input.mouse = mouse;
  }
  // Else mouse is not on the canvas so we don't update the position.
};
