import jam from "../../../../jam/jam";
import Player from './player';
import level_map from "../../../../jam/mods/tools/level_map";
import map1 from "../platformer_data/map.js";

export default class PlayState extends jam.State{
  constructor(game){
    super();
    var bg = new jam.Sprite(0, 0);
	  bg.width = 640; bg.height = 480;
	  bg.image = document.createElement("canvas");
	  bg.image.width = 640;
	  bg.image.height = 480;
	  var erase = false;
	  var ctx = bg.image.getContext("2d");

	  var map = jam.LevelMap.loadTileMap(32, map1, "platformer_data/tiles.png");
	  //var player = makePlayer(game, map);
    var player = new Player(250, 400, map);

	  bg.color = "rgba(0,128,255,0.75)";

	  bg.update = jam.extend(bg.update, function(elapsed){
		  for(var i = 0; i < 7; i++){
			  ctx.beginPath();
			  if(erase){
				  ctx.arc(player.smoothX + Math.random() * 20 - 10, player.smoothY + Math.random() * 20 - 10, Math.random() * 3 + 2, 0, 2 * Math.PI, false);
				  ctx.fillStyle = "rgba(255,255,255, 0.75)";
			  }else{
				  ctx.arc(player.smoothX + Math.random() * 16 - 8, player.smoothY + Math.random() * 16 - 8, Math.random() * 3 + 1, 0, 2 * Math.PI, false);
				  ctx.fillStyle = bg.color;
			  }
			  ctx.fill();
		  }
		  ctx.beginPath();
		  ctx.arc(player.smoothX, player.smoothY, 4, 0, 2 * Math.PI, false);
		  ctx.fillStyle = erase ? "rgba(255,255,255, 0.75)" : bg.color;
		  ctx.fill();

		  if(jam.Input.justPressed("B")){
			  erase = false;
		  }
		  if(jam.Input.justPressed("E")){
			  erase = true;
		  }
		  if(jam.Input.justPressed("1")){
			  bg.color = "rgba(0,128,255,0.75)";
		  }
		  if(jam.Input.justPressed("2")){
			  bg.color = "rgba(255,0,64,0.75)";
		  }
		  if(jam.Input.justPressed("3")){
			  bg.color = "rgba(0,0,0,0.75)";
		  }
	  });

    this.add(bg);
    this.add(map);
	  this.add(player);
  }
}
