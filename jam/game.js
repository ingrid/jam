define(["exports", "./vector", "./sprite", "./input", "./util"], function (exports, _vector, _sprite, _input, _util) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _vector2 = _interopRequireDefault(_vector);

    var _sprite2 = _interopRequireDefault(_sprite);

    var _input2 = _interopRequireDefault(_input);

    var _util2 = _interopRequireDefault(_util);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var game;

    exports.default = game = function game(width, height, parentElement, zoom) {
        this._canvas = document.createElement("canvas");
        // Style attributes for doing "pixel-zoom" (nearest neighbor).
        this._canvas.setAttribute("style", "image-rendering: -moz-crisp-edges; image-rendering: -o-crisp-edges; image-rendering:-webkit-optimize-contrast; -ms-interpolation-mode:nearest-neighbor;");
        this._canvas.style.position = "relative";
        this._canvas.style.border = "1px solid black";
        this._context = this._canvas.getContext("2d");
        this.hasFocus = false;

        zoom = zoom || 1;

        this.root = new _sprite2.default(0, 0);
        this.root.scene = new _sprite2.default(0, 0);
        this.root.add(this.root.scene);
        this.root.ui = new _sprite2.default(0, 0);
        this.root.add(this.root.ui);

        if (parentElement === undefined) {
            parentElement = document.body;
        }

        this.width = width;
        this.height = height;
        this._canvas.width = width;
        this._canvas.height = height;
        this._context.width = this.width;
        this._context.height = this.height;
        this.zoom = zoom;

        // Always keep the canvas in the middle of the parent element
        var onresize = function () {
            this._canvas.style.left = parentElement.clientWidth / 2 - this.width * this.zoom / 2 + "px";
            this._canvas.style.top = parentElement.clientHeight / 2 - this.height * this.zoom / 2 + "px";
            this._canvas.style.width = this.width * this.zoom + "px";
            this._canvas.style.height = this.height * this.zoom + "px";
        }.bind(this);
        onresize();
        parentElement.onresize = onresize;

        // Timing
        this.fps = 50;
        this.elapsed = 0; // Time since the last frame in seconds
        this.time = 0;
        this.lastFrameTime = new Date().getTime();

        this.bgColor = "rgb(255,255,255)";

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

        _util2.default.mixinOn(this);
    };

    game.prototype.update = function () {
        var currentTime = new Date().getTime();
        var startTime = this.lastFrameTime;
        this.elapsed = (currentTime - this.lastFrameTime) / 1000.0;
        this.lastFrameTime = currentTime;
        this.time = (currentTime - startTime) / 1000.0;

        if (this.hasFocus) {
            this.root.update(this.elapsed);

            _input2.default.update(this);
        }
    };

    game.prototype.render = function () {
        var ctx = this._context;
        ctx.save();
        ctx.fillStyle = this.bgColor;
        ctx.fillRect(0, 0, this.width, this.height);
        this.root.render(ctx);
        ctx.restore();
    };

    game.prototype.run = function () {
        this._tick();

        _input2.default.registerGame(this);
    };

    game.prototype.gainFocus = function () {
        this._canvas.style.outline = "2px solid #888";
        this.hasFocus = true;
    };

    game.prototype.loseFocus = function () {
        this._canvas.style.outline = "";
        this.hasFocus = false;
    };
});