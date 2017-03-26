import jam from "../../../jam/jam";
import collide_rect from "../../../jam/mods/physics/collision/rect";
import animation from "../../../jam/mods/tools/animation";
import level_map from "../../../jam/mods/tools/level_map";
import map1 from "./platformer_data/map.js";

jam.mod(collide_rect);
jam.mod(animation);

var initialize = function(){
  var game = new jam.Game(640, 480, document.body);

  //ggame.set_state(new PlayState(game));
  game.set_state(new SplashState(game));
	game.run();
};

class SplashState extends jam.State{
  constructor(game){
    super();
    window.setTimeout(function(){
      game.set_state(new PlayState(game));
    }, 2000);
  }
}

class PlayState extends jam.State{
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
	  var player = makePlayer(game, map);

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

var makePlayer = function(game, map){
	var player = new jam.Sprite(250, 400, ['animated', 'collide_rect']);
	player.setImage("platformer_data/player.png", 32, 32);
	// Set up player's animations
	player.anim_idle = new jam.Animation.Strip([0], 32, 32, 0);
	player.anim_run = new jam.Animation.Strip([1,2,3,4,5,6], 32, 32, 9);
	player.anim_jump = new jam.Animation.Strip([32], 32, 32, 0);
	player.playAnimation(player.anim_idle);

	player.setCollisionOffsets(6, 0, 20, 31);
	player.setLayer(1);

	player.lastPositions = [];
	player.smoothX = player.x + player.width/2;
	player.smoothY = player.y + player.height/2;

	player.update = jam.extend(player.update, function(elapsed){
		// Collision
		player.collide(map);

		// Running / standing
		player.velocity.x = 0;
		if(jam.Input.buttonDown("LEFT")){
			player.velocity.x = -90;
			player.playAnimation(player.anim_run);
			player.facing = jam.Sprite.LEFT;
		}
		else if(jam.Input.buttonDown("RIGHT")){
			player.velocity.x = 90;
			player.playAnimation(player.anim_run);
			player.facing = jam.Sprite.RIGHT;
		}
		else{
			player.playAnimation(player.anim_idle);
		}

		// Jumping animation
		if(!player.touchingBottom){
			player.playAnimation(player.anim_jump);
		}

		// Jumping
		if((jam.Input.justPressed("X") || jam.Input.justPressed("UP")) && player.touchingBottom){
			player.velocity.y = -200;
		}

		// Gravity
		player.velocity.y += 400 * elapsed;

		player.lastPositions.splice(0,0, new jam.Vector(player.x + player.width / 2, player.y + player.height / 2));
		for(var i = 0; i < Math.min(player.lastPositions.length, 10); ++i){
			player.smoothX += player.lastPositions[i].x;
			player.smoothY += player.lastPositions[i].y;
		}
		player.smoothX /= i+1;
		player.smoothY /= i+1;
	});
	return player;
};

var preload = function(){
  jam.preload("platformer_data/player.png");
  jam.showPreloader(document.body, initialize);
};

if (document.readyState === "complete"){
  preload();
} else {
  window.onload = preload;
}
