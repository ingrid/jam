define(["../../jam/jam"], function (_jam) {
	"use strict";

	var _jam2 = _interopRequireDefault(_jam);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	_jam2.default.config({
		dataDir: "data/"
	});

	var main = function main() {
		var g = new _jam2.default.Game(320, 240, document.body, 2);
		g.run();
	};

	var preload = function preload() {
		_jam2.default.showPreloader(main);
	};

	preload();
});
