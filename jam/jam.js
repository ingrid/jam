import Meta from "./core/meta";
import Vector from "./core/vector";
import Util from "./core/util";
import Game from "./core/game";
import Sprite from "./core/sprite";
import Input from "./core/input";
import Sound from "./core/sound";
import Text from "./core/text";
import Entity from "./core/entity";
import State from "./core/state";


var lib;
export default lib = {};

// Load all the default modules
lib.Meta = Meta;
lib.Vector = Vector;
lib.Util = Util;
lib.Game = Game;
lib.Sprite = Sprite;
lib.Input = Input;
lib.Sound = Sound;
lib.Text = Text;
lib.State = State;

// Eventually this will be removed in favor of mixins and super.
lib.extend = Meta.extend;
lib.ex = Meta.extend;

// Stuff for asset management.
lib.cache = Util.cache;
lib.load = Util.load;
lib.config = function (obj) {
  Util.dataDir = obj.dataDir || "";
  Util.logLevel = obj.logLevel || 0;
};

// Preload just calls load and counts the number of currently loading objects
lib.preload = Util.preload;

// Makes a canvas filling the parent element
lib.showPreloader = Util.showPreloader;

lib.log = Util.log;

lib.config = function(obj) {
  Util.dataDir = obj.dataDir || "";
  Util.logLevel = obj.logLevel || 0;
};

lib.mod = Util.mod;
lib.load_mod = Util.load_mod;

// For the module loading system.
Util.jam = lib;
