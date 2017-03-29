import jam from "../../../../jam/jam";
import proto from "../../../../jam/mods/tools/proto";

var initialize = function(){
	var game = new jam.Game(500, 300, document.body);
  game.set_state(new SplashState(game));
	game.run();
};

var preload = function(){
  jam.load_mod('rect');
  jam.showPreloader(document.body, initialize);
};

if (document.readyState === "complete"){
  preload();
} else {
  window.onload = preload;
}

class SplashState extends jam.State{
  constructor(game){
    super();
    window.setTimeout(function(){
      game.set_state(new PlayState(game));
    }, 2000);
  }

  update(dt){
    super.update(dt);
  }
}

class Player extends jam.Sprite{
  constructor(x, y){
    super(x, y);
    this.setImage(proto.sq(5, 20, 200, 5));
  }
  input(){

  }
  update(dt){
    if(jam.Input.justPressed("UP")){
      // this.velocity.y = -20;
    }else if(jam.Input.justPressed("DOWN")){

    }else if(jam.Input.justPressed("LEFT")){

    }else if(jam.Input.justPressed("RIGHT")){
    }
  }
}

class PlayState extends jam.State{
  constructor(game){
    super();
	  this.score = 0;

	  this.score_txt = new jam.Text(203, 50);
	  this.add(this.score_txt);

	  this.food = new jam.Sprite(300, 150, 'collide_rect');

	  this.food.setImage(proto.sq(5, 255, 0, 0));
	  this.add(this.food);

    this.player = new Player(300, 200);
    this.add(this.player);
  }

  update(dt){
    super.update(dt);
  }
}
