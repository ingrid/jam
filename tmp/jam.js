define(["exports", "./core/meta", "./core/vector", "./core/util", "./core/game", "./core/sprite", "./core/input", "./core/sound", "./core/text", "./core/entity", "./core/mod_map"], function (exports, _meta, _vector, _util, _game, _sprite, _input, _sound, _text, _entity, _mod_map) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  var _meta2 = _interopRequireDefault(_meta);

  var _vector2 = _interopRequireDefault(_vector);

  var _util2 = _interopRequireDefault(_util);

  var _game2 = _interopRequireDefault(_game);

  var _sprite2 = _interopRequireDefault(_sprite);

  var _input2 = _interopRequireDefault(_input);

  var _sound2 = _interopRequireDefault(_sound);

  var _text2 = _interopRequireDefault(_text);

  var _entity2 = _interopRequireDefault(_entity);

  var _mod_map2 = _interopRequireDefault(_mod_map);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  // Load all the default modules

  var lib;

  exports.default = lib = {};

  lib.Meta = _meta2.default;
  lib.Util = _util2.default;
  lib.Game = _game2.default;
  lib.Sprite = _sprite2.default;
  lib.Input = _input2.default;
  lib.Sound = _sound2.default;
  lib.Text = _text2.default;

  lib.Vector = _vector2.default;
  lib.vec = _vector2.default;

  lib.extend = _meta2.default.extend;
  lib.ex = _meta2.default.extend;

  lib.cache = _util2.default.cache;

  lib.config = function (obj) {
    _util2.default.dataDir = obj.dataDir || "";
    _util2.default.logLevel = obj.logLevel || 0;
  };

  // Loads and caches image files or sound files.
  lib.load = _util2.default.load;

  // Preload just calls load and counts the number of currently loading objects
  lib.preload = _util2.default.preload;

  // Makes a canvas filling the parent element
  lib.showPreloader = _util2.default.showPreloader;

  lib.log = _util2.default.log;

  /** /
  lib.config = function(obj) {
    Util.dataDir = obj.dataDir || "";
    Util.logLevel = obj.logLevel || 0;
  };
  /**/

  lib.mod = function (mod, as_default, name) {
    if (name == undefined) {
      name = mod.name;
    }
    mod.preLoad();
    mod.load(lib);
    _entity2.default.load_mod(mod, as_default, name);
  };

  // Add a flag on load module that loads mod as a 'default' so that that all new sprites incorperate it without declaration?
  lib.load_mod = function (name, as_default) {
    var mod_file = _mod_map2.default[name];
    if (mod_file != undefined) {
      //import mod from mod_file;
      //lib.load_mod(mod, as_default, custom_name)
    } else {
        console.log('No module found for ' + name);
      }
  };
});