define(["exports", "./util"], function (exports, _util) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _util2 = _interopRequireDefault(_util);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var lib;
	exports.default = lib = {};
	var copies = {};

	lib.play = function (url) {
		var sound = _util2.default.load(url, function (obj) {
			if (obj.paused) {
				obj.play();
			} else {
				var clone;

				if (copies[url]) {
					for (var i = 0; i < copies[url].length; i++) {
						if (copies[url][i].paused) {
							copies[url][i].play();
							return;
						}
					}

					clone = obj.cloneNode();
					copies[url].push(clone);
					clone.play();
				} else {
					clone = obj.cloneNode();
					copies[url] = [obj, clone];
					clone.play();
				}
			}
		});

		return sound;
	};

	lib.get = function (url) {
		return _util2.default.load(url);
	};
});