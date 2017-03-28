import Vector from './vector';
import Input from './input';
import Camera from './camera';

export default class Game {
  constructor(width, height, parentElement) {
    this.camera = {};
    this.camera.default = new Camera(width, height);
    this._canvas = document.createElement("canvas");
    this._canvas.style.position = "relative";
    this._context = this._canvas.getContext("2d");
    this.width = width;
    this.height = height;
    this._canvas.width = this.width;
    this._canvas.height = this.height;

    this.state = null; // This should never be null while the game is actually running.

    // Eventually we want input to hook in via the module system.
    Input.canvas = this._canvas;

    // Always keep the canvas in the middle of the parent element
    var onresize = function () {
      this._canvas.style.left = parentElement.clientWidth / 2 - width / 2 + "px";
      this._canvas.style.top = parentElement.clientHeight / 2 - height / 2 + "px";
    }.bind(this);
    onresize();
    parentElement.onresize = onresize;

    this.fps = 50; // Frequency
    this.elapsed = 0; // Period
    // Should time go in state?
    this.time = 0;

    // If they didn't supply this argument, assume the doc body
    // as the parent element for the canvas
    if (parentElement === undefined || parentElement === null) {
      parentElement = document.body;
    }
    parentElement.appendChild(this._canvas);

    this._tick = function () {
      this.update();
      this.render();
      window.setTimeout(this._tick, 1000.0 / this.fps);
    }.bind(this);
    this.run = this.run.bind(this);
    this.update = this.update.bind(this);
    this.render = this.render.bind(this);
  }

  update() {
    Input._update();

    // This filter just says "only leave me if I'm not in the remove list"
    this.state._children = this.state._children.filter(function (x, i, a) {
      return this.state._remove.indexOf(x) === -1;
    }.bind(this));
    this.state._remove = [];

    this.elapsed = 1.0 / this.fps;
    this.time += this.elapsed;

    // Simplest possible follow code
    // Eventually we should modulatrize cameras to give options for folllow types, filters, and effects.
    this.state.camera.update();

    // Call update on each child and pass it the elapsed time
    for (var i = this.state._children.length - 1; i >= 0; --i) {
      this.state._children[i].update(this.elapsed);
    }
  }

  render() {
    var ctx = this._context;
    ctx.fillStyle = this.state.bgColor;
    ctx.fillRect(0, 0, this.width, this.height);
    for (var i = this.state._children.length - 1; i >= 0; --i) {
      this.state._children[i].render(ctx, this.state.camera);
    }
  }

  set_state(s){
    this.state = s;
    this.state.camera.size = new Vector(this.width, this.height),
    s.enter();
  }

  run() {
    this._tick();
  }
}
