var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

define(["exports", "./Util", "./Vector", "./Entity"], function (exports, _Util, _Vector, _Entity2) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Util2 = _interopRequireDefault(_Util);

	var _Vector2 = _interopRequireDefault(_Vector);

	var _Entity3 = _interopRequireDefault(_Entity2);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	function _possibleConstructorReturn(self, call) {
		if (!self) {
			throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
		}

		return call && ((typeof call === "undefined" ? "undefined" : _typeof(call)) === "object" || typeof call === "function") ? call : self;
	}

	var _get = function get(object, property, receiver) {
		if (object === null) object = Function.prototype;
		var desc = Object.getOwnPropertyDescriptor(object, property);

		if (desc === undefined) {
			var parent = Object.getPrototypeOf(object);

			if (parent === null) {
				return undefined;
			} else {
				return get(parent, property, receiver);
			}
		} else if ("value" in desc) {
			return desc.value;
		} else {
			var getter = desc.get;

			if (getter === undefined) {
				return undefined;
			}

			return getter.call(receiver);
		}
	};

	function _inherits(subClass, superClass) {
		if (typeof superClass !== "function" && superClass !== null) {
			throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
		}

		subClass.prototype = Object.create(superClass && superClass.prototype, {
			constructor: {
				value: subClass,
				enumerable: false,
				writable: true,
				configurable: true
			}
		});
		if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
	}

	var Sprite = function (_Entity) {
		_inherits(Sprite, _Entity);

		function Sprite(x, y, coms) {
			_classCallCheck(this, Sprite);

			var _this = _possibleConstructorReturn(this, (Sprite.__proto__ || Object.getPrototypeOf(Sprite)).call(this, Sprite.tag));

			// Entity tag
			// This is needed for animation right now, I'll need to patch this later.
			_this.render_default = true;

			var i;
			if (coms != undefined) {
				if (!Array.isArray(coms)) {
					coms = [coms];
				};
				for (i = 0; i < coms.length; i++) {
					_this.add_component(coms[i]);
				}
			}

			_this._layer = 0;
			_this._game = null;

			_this.facing = Sprite.RIGHT;

			_this.x = x;
			_this.y = y;
			_this.width = 0;
			_this.height = 0;
			_this.angle = 0;
			_this.alpha = 1.0;

			_this.image = null;
			_this.visible = true; // The sprite can be hidden by setting this to false

			_this.velocity = new _Vector2.default(0, 0);
			_this.acceleration = new _Vector2.default(0, 0);

			// How much the render position is affected by the camera
			_this.parallax = new _Vector2.default(1, 1);
			// I need to look into this more, I think we can do some stuff at the tick() level to stop binding everywhere.
			_this.update = _this.update.bind(_this);
			return _this;
		}
		// Loads an image and when it's finished loading, sets the sprite's image
		// to it. Automatically adjusts the sprite's width and height.

		_createClass(Sprite, [{
			key: "setImage",
			value: function setImage(url, frameWidth, frameHeight) {
				_Util2.default.load(url, function (obj) {
					this.image = obj;
					this.width = frameWidth || this.image.naturalWidth;
					this.height = frameHeight || this.image.naturalHeight;
					this.imageLoaded();
				}.bind(this));
			}
		}, {
			key: "_set_image_helper",
			value: function _set_image_helper(img, frameWidth, frameHeight) {}
		}, {
			key: "imageLoaded",
			value: function imageLoaded() {}
		}, {
			key: "render",
			value: function render(context, camera) {
				_get(Sprite.prototype.__proto__ || Object.getPrototypeOf(Sprite.prototype), "render", this).call(this, context, camera);
				if (this.render_default === true) {
					if (this.image !== null && this.visible) {
						this._renderHelper(context, camera, this.image, this.width, this.height, 0, 0, this.width, this.height);
					}
				}
			}
		}, {
			key: "_renderHelper",
			value: function _renderHelper(context, camera, image, w, h, sx, sy, sw, sh) {
				// Avoid horrible automatic blending if we have non-integer values
				var tx = Math.floor(this.x - camera.scroll.x * this.parallax.x + this.width / 2);
				var ty = Math.floor(this.y - camera.scroll.y * this.parallax.y + this.height / 2);
				context.save();

				// Set up the context transform and alpha before drawing
				context.translate(tx, ty);
				if (this.angle != 0) {
					context.rotate(this.angle * Math.PI / 180);
				}
				if (this.alpha != 1.0) {
					context.globalAlpha = this.alpha;
				}
				if (this.facing == Sprite.LEFT) {
					context.scale(-1, 1);
				}

				context.drawImage(this.image, sx, sy, sw, sh, -this.width / 2, -this.height / 2, w, h);

				context.restore();
			}
		}, {
			key: "update",
			value: function update(elapsed) {
				// This vector math stuff sucks because there's no such thing as
				// operator overloading

				// Add to velocity based on accel
				var va = _Vector2.default.add,
				    vm = _Vector2.default.mul;
				this.velocity = va(this.velocity, vm(this.acceleration, elapsed));

				// Add to position based on velocity
				this.x += this.velocity.x * elapsed;
				this.y += this.velocity.y * elapsed;
				_get(Sprite.prototype.__proto__ || Object.getPrototypeOf(Sprite.prototype), "update", this).call(this, elapsed);
			}
		}, {
			key: "setLayer",
			value: function setLayer(layer) {
				this._layer = layer;
				if (this._game) {
					this._game.sortSprites();
				}
			}
		}]);

		return Sprite;
	}(_Entity3.default);

	exports.default = Sprite;
	;

	// "static" constants so that we don't have to remember that
	// 0 = left and 1 = right. These control if the sprite is flipped
	// horizontally or not.

	Sprite.LEFT = 0;
	Sprite.RIGHT = 1;
	Sprite.tag = 'sprite';
	console.log(Sprite.tag);
});