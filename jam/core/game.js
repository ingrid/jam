import State from './state';

import DebugSystem from './debug';
import InputSystem from './input';
import PhysicsSystem from './physics';
import RenderSystem from './render';
import ScriptSystem from './script';
import TextSystem from './text';

var defaults = { parent : document.body,
               debug : false,
               zoom : 1,
               fps : 60,
               prefabs : false,
               mixins : false };

export default class Game{
  constructor(width, height, config){
    var conf = {};
    Object.assign(conf, defaults, config);

    this.width = width || 500;
    this.height = height || 300;

    this.state = new State();

    this._canvas = document.createElement("canvas");
    this._canvas.style.position = "relative";
    this._canvas.style.border = "1px solid black";
    this._canvas.width = this.width;
    this._canvas.height = this.height;
    this._context = this._canvas.getContext("2d");

    this.fps = 50; // Frequency
    this.elapsed = 0; // Period
    this.time = 0;

    conf.parent.appendChild(this._canvas);
    var onresize = function () {
      this._canvas.style.left = conf.parent.clientWidth / 2 - width / 2 + "px";
      this._canvas.style.top = conf.parent.clientHeight / 2 - height / 2 + "px";
    }.bind(this);
    onresize();
    conf.parent.onresize = onresize;

    this._tick = this._tick.bind(this);
    this.run = this.run.bind(this);
    this.loop = this.loop.bind(this);
  }

  run() {
    this._tick();
  }

  _tick(){
    this.loop();
    window.setTimeout(this._tick, 1000.0 / this.fps);
  }

  loop(){
    // Filter out entities on the remove list.
    this.state._children = this.state._children.filter(function (e, i, a) {
      var keep = this.state._remove.indexOf(e) === -1;
      // Stuff to deactivate entity.
      return keep;
    }.bind(this));
    this.state._remove = [];

    this.elapsed = 1.0 / this.fps;
    this.time += this.elapsed;
    var key;
    for (key in this.state.systems) {
      if (this.state.systems[key].lib.update != undefined){
        this.state.systems[key].lib.update(this.state.systems[key].list, this);
      }
    }
  }

  register(systems){
    systems = systems || [];
    if (systems.length == undefined){
      systems = [systems];
    }

    var i;
    for (i = 0; i < systems.length; i++){
      if (tmp[systems[i]] != undefined){
        Game.systems[systems[i]] = new tmp[systems[i]](this);
      }else{
        console.log('Could not register system: ' + systems[i]);
      }
    }
  }

  set_state(s){
    if (this.state != null){
      this.state.deactivate();
    }
    this.state = s;
    this.state.activate(this);
  }
}

var tmp = {
  debug : DebugSystem,
  input : InputSystem,
  physics : PhysicsSystem,
  render : RenderSystem,
  script : ScriptSystem,
  text : TextSystem
};

// Bookmark systems once loaded so they can be shared across multiple states.
Game.systems = {};
