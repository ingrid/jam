import jam from "../../jam/jam";
import level_map from "../../jam/mods/tools/level_map";
import collide_rect from "../../jam/mods/physics/collision/rect";

jam.mod(collide_rect);

var TILESET = "../examples/platformer/platformer_data/tiles.png";

window.onload = function(){
	// Start loading images immediately instead of when they're needed
	jam.preload(TILESET);

	// Show a loading bar until all the preloading is done, at which point
	// call initialize()
	jam.showPreloader(document.body, initialize);
}

var initialize = function(){
	var game = new jam.Game(640, 480, document.body);

	var map = jam.LevelMap(32, 50, 50, TILESET);

	game.update = jam.ex(function(){
		if(jam.Input.buttonDown("MOUSE_LEFT")){
			map.putAtPixel(1, jam.Input.mouse.x, jam.Input.mouse.y);
		}

		if(jam.Input.justPressed("S")){
			window.open("data:application/octet-stream," + encodeURIComponent(map.serialize()), "");
		}

	}, game.update);

	game.add(map);

	game.run();
};

var preload = function(){
  jam.preload(TILESET);
  jam.showPreloader(document.body, initialize);
};

if (document.readyState === "complete"){
  preload();
} else {
  window.onload = preload;
}
