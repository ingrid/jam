import jam from "../../../../jam/jam";
import Player from './player';
import level_map from "../../../../jam/mods/tools/level_map";
import map1 from "../platformer_data/map.js";
import SplashState from './splashstate';

var initialize = function(){
  var game = new jam.Game(640, 480, document.body);
  game.set_state(new SplashState(game));
	game.run();
};

var preload = function(){
  jam.load_mod('rect');
  jam.load_mod('animation');
  jam.preload("platformer_data/player.png");
  jam.showPreloader(document.body, initialize);
};

if (document.readyState === "complete"){
  preload();
} else {
  window.onload = preload;
}
