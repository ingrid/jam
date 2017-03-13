import Meta from "./core/meta";
import Vector from "./core/vector";
import Util from "./core/util";
import Game from "./core/game";
import Sprite from "./core/sprite";
import Input from "./core/input";
import Sound from "./core/sound";
import Text from "./core/text";
import Entity from "./core/entity";
import mod_map from "./core/mod_map";

// Load all the default modules

var lib;

export default lib = {};

lib.Meta = Meta;
lib.Vector = Vector;
lib.Util = Util;
lib.Game = Game;
lib.Sprite = Sprite;
lib.Input = Input;
lib.Sound = Sound;
lib.Text = Text;

lib.extend = Meta.extend;
lib.ex = Meta.extend;

lib.cache = Util.cache;

lib.config = function (obj) {
  Util.dataDir = obj.dataDir || "";
  Util.logLevel = obj.logLevel || 0;
};

// Loads and caches image files or sound files.
lib.load = Util.load;

// Preload just calls load and counts the number of currently loading objects
lib.preload = Util.preload;

// Makes a canvas filling the parent element
lib.showPreloader = Util.showPreloader;

lib.log = Util.log;

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
  Entity.load_mod(mod, as_default, name);
};

// Add a flag on load module that loads mod as a 'default' so that that all new sprites incorperate it without declaration?
lib.load_mod = function (name, as_default) {
  var mod_file = mod_map[name];
  if (mod_file != undefined) {
    //import mod from mod_file;
    //lib.load_mod(mod, as_default, custom_name)
  } else {
    console.log('No module found for ' + name);
  }
};
