var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

define(["exports", "./Sprite"], function (exports, _Sprite2) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _Sprite3 = _interopRequireDefault(_Sprite2);

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

	var Text = function (_Sprite) {
		_inherits(Text, _Sprite);

		function Text(x, y) {
			_classCallCheck(this, Text);

			var _this = _possibleConstructorReturn(this, (Text.__proto__ || Object.getPrototypeOf(Text)).call(this, x, y));

			_this.text = "";
			_this.font = "";
			_this.color = "";
			return _this;
		}

		_createClass(Text, [{
			key: "render",
			value: function render(context, camera) {
				context.font = this.font;
				context.fillStyle = this.color;
				context.fillText(this.text, this.x - camera.scroll.x * this.parallax.x, this.y - camera.scroll.y * this.parallax.y);
			}
		}]);

		return Text;
	}(_Sprite3.default);

	exports.default = Text;
	;
	/*
 var lib;
 export default lib = new Module();
 
 lib.sprite.init = function(){
 	this.text = "";
 	this.font = "";
 	this.color = ""
 };
 
 lib.sprite.render = function(context, camera){
 	context.font = this.font;
 	context.fillStyle = this.color;
 	context.fillText(this.text,
 			             this.x - camera.scroll.x * this.parallax.x,
 			             this.y - camera.scroll.y * this.parallax.y);
 };
 */
});