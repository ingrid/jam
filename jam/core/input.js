import Vector from './vector';
import System from "./system";

// This is a special case system because no entities should be added to it but all other systems should have acess to it, perhaps it shouldn't be go through the normal 'system' system.
export default class Input extends System{
  constructor(game){
    super(game);
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

var KEY_CODE_MAP = {
  192: "~",
  32: "SPACE",
  37: "LEFT",
  38: "UP",
  39: "RIGHT",
  40: "DOWN"
};

Input._justPressedButtons = [];
Input._justReleasedButtons = [];
Input._justPressedButtonsBuffer = [];
Input._justReleasedButtonsBuffer = [];
Input._buttons = {};

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
