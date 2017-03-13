import Vector from './vector';
import Input from './input';

export default class Game {
  constructor(width, height, parentElement) {
    this._canvas = document.createElement("canvas");
    this._canvas.style.position = "relative";
    this._context = this._canvas.getContext("2d");
    this._children = [];
    //jam.Game._canvas = this._canvas;
    Input.canvas = this._canvas;

    // List of objects to be removed
    this._remove = [];

    // Always keep the canvas in the middle of the parent element
    var onresize = function () {
      this._canvas.style.left = parentElement.clientWidth / 2 - width / 2 + "px";
      this._canvas.style.top = parentElement.clientHeight / 2 - height / 2 + "px";
    }.bind(this);
    onresize();
    parentElement.onresize = onresize;

    this.width = width;
    this.height = height;
    this.fps = 50; // Frequency
    this.elapsed = 0; // Period
    this.time = 0;
    this.camera = {
      scroll: new Vector(0, 0),
      size: new Vector(this.width, this.height),
      follow: null
    };
    this.bgColor = "rgb(255,255,255)";

    // If they didn't supply this argument, assume the doc body
    // as the parent element for the canvas
    if (parentElement === undefined || parentElement === null) {
      parentElement = document.body;
    }
    parentElement.appendChild(this._canvas);

    this._canvas.width = this.width;
    this._canvas.height = this.height;

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
    // This filter just says "only leave me if i'm not in the remove list"
    this._children = this._children.filter(function (x, i, a) {
      return this._remove.indexOf(x) === -1;
    }.bind(this));
    this._remove = [];

    this.elapsed = 1.0 / this.fps;
    this.time += this.elapsed;

    // Simplest possible follow code
    if (this.camera.follow !== null) {
      this.camera.scroll.x = this.camera.follow.x - this.width / 2;
      this.camera.scroll.y = this.camera.follow.y - this.height / 2;
    }

    // Call update on each child and pass it the elapsed time
    for (var i = this._children.length - 1; i >= 0; --i) {
      this._children[i].update(this.elapsed);
    }
    // bmac is did I decompile this correctly?
    // temporarily sticking this here while restructuring.
    Input._update();
  }


  render() {
    var ctx = this._context;
    ctx.fillStyle = this.bgColor;
    ctx.fillRect(0, 0, this.width, this.height);
    for (var i = this._children.length - 1; i >= 0; --i) {
      this._children[i].render(ctx, this.camera);
    }
  }

  add(sprite) {
    this._children.push(sprite);
    sprite._game = this;
    this.sortSprites(); // Sort to figure out layering
  }

  remove(sprite) {
    if (this._remove.indexOf(sprite) === -1) {
      this._remove.push(sprite);
      sprite._game = null;
    }
  }

  run() {
    this._tick();
  }

  sortSprites() {
    this._children.sort(function (a, b) {
      return b._layer - a._layer;
    });
  }
}
