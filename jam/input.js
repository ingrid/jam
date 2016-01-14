define(["exports", "./vector"], function (exports, _vector) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _vector2 = _interopRequireDefault(_vector);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	var lib;
	exports.default = lib = {};
	var keycodeMap = {
		192: "~",
		32: "SPACE",
		37: "LEFT",
		38: "UP",
		39: "RIGHT",
		40: "DOWN"
	};
	var mousebuttonMap = {
		1: "MOUSE_LEFT",
		3: "MOUSE_RIGHT"
	};
	lib._buttons = [];
	lib._justPressed = [];
	lib._justReleased = [];
	var games = [];
	var focused = null;
	lib.mouse = new _vector2.default(0, 0);

	var getMouseButton = function getMouseButton(e) {
		return mousebuttonMap[e];
	};

	var getKeyButton = function getKeyButton(code) {
		if (code >= 65 && code <= 90 || code >= 48 && code <= 57) {
			return String.fromCharCode(code);
		} else if (code >= 97 && code <= 122) {
			return String.fromCharCode(code).toUpperCase();
		}

		if (keycodeMap[code] != undefined) {
			return keycodeMap[code];
		}
	};

	var getMouseCoords = function getMouseCoords(game, e) {
		var x;
		var y;

		if (e.pageX || e.pageY) {
			x = e.pageX;
			y = e.pageY;
		} else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}

		x -= game._canvas.offsetLeft;
		y -= game._canvas.offsetTop;

		if (x >= 0 && x < game._canvas.width * game.zoom && y >= 0 && y < game._canvas.height * game.zoom) {
			return new _vector2.default(x / game.zoom, y / game.zoom);
		}
	};

	var refocus = function refocus(game) {
		focused = game;

		for (var i = 0; i < games.length; i++) {
			if (games[i] === game) {
				game.gainFocus();
			} else {
				games[i].loseFocus();
			}
		}
	};

	var updateFromGame = function updateFromGame(game) {
		lib._justPressed = [];
		lib._justReleased = [];
	};

	lib.registerGame = function (game) {
		var id = games.length;
		games.push(game);

		if (!focused) {
			refocus(game);
		}

		var focusFunc = function focusFunc(fn) {
			return function (e) {
				if (game === focused) {
					fn(e);
				}
			};
		};

		game._canvas.onclick = function () {
			refocus(game);
		};

		game._canvas.onmousedown = focusFunc(function (e) {
			var button = getMouseButton(e.which);

			if (!lib._buttons[button]) {
				lib._buttons[button] = true;
				lib._justPressed[button] = true;
			}
		});
		game._canvas.onmouseup = focusFunc(function (e) {
			var button = getMouseButton(e.which);

			if (lib._buttons[button]) {
				lib._buttons[button] = false;
				lib._justReleased[button] = true;
			}
		});
		game._canvas.onmousemove = focusFunc(function (e) {
			var mouse = getMouseCoords(game, e);

			if (mouse != undefined) {
				lib.mouse = mouse;
			}
		});
	};

	document.onkeydown = function (e) {
		var code = 'which' in e ? e.which : e.keyCode;
		var button = getKeyButton(code);

		if (!lib._buttons[button]) {
			lib._buttons[button] = true;
			lib._justPressed[button] = true;
		}
	};

	document.onkeyup = function (e) {
		var code = 'which' in e ? e.which : e.keyCode;
		var button = getKeyButton(code);

		if (lib._buttons[button]) {
			lib._buttons[button] = false;
			lib._justReleased[button] = true;
		}
	};

	lib.update = function (game) {
		if (game === focused) {
			lib._justPressed = [];
			lib._justReleased = [];
		}
	};

	lib.justPressed = function (button) {
		return lib._justPressed[button] || false;
	};

	lib.justReleased = function (button) {
		return lib._justReleased[button] || false;
	};

	lib.down = function (button) {
		return lib._buttons[button] || false;
	};

	lib.up = function (button) {
		return !lib._buttons[button] || true;
	};
});