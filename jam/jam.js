define(["exports", "./util", "./game", "./vector", "./sprite", "./sound", "./rect", "./debug", "./tilemap", "./input"], function (exports, _util, _game, _vector, _sprite, _sound, _rect, _debug, _tilemap, _input) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });

    var _util2 = _interopRequireDefault(_util);

    var _game2 = _interopRequireDefault(_game);

    var _vector2 = _interopRequireDefault(_vector);

    var _sprite2 = _interopRequireDefault(_sprite);

    var _sound2 = _interopRequireDefault(_sound);

    var _rect2 = _interopRequireDefault(_rect);

    var _debug2 = _interopRequireDefault(_debug);

    var _tilemap2 = _interopRequireDefault(_tilemap);

    var _input2 = _interopRequireDefault(_input);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    var lib;
    exports.default = lib = {};
    lib.Game = _game2.default;
    lib.Sprite = _sprite2.default;
    lib.Rect = _rect2.default;
    lib.Debug = _debug2.default;
    lib.Vector = _vector2.default;
    lib.Sound = _sound2.default;
    lib.TileMap = _tilemap2.default;
    lib.Input = _input2.default;
    lib.cache = _util2.default.cache;

    lib.config = function (obj) {
        _util2.default.dataDir = obj.dataDir || "";
        _util2.default.logLevel = obj.logLevel || 0;
    };

    lib.load = _util2.default.load;
    lib.preload = _util2.default.preload;
    lib.showPreloader = _util2.default.showPreloader;
    lib.log = _util2.default.log;
});