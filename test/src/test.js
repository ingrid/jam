import jam from "../../jam/jam";
import proto from "../../jam/core/proto";

import util from "../../jam/core/util";


if (document.readyState === "complete"){
  initialize();
}else{
  window.onload = initialize;
};

function initialize(){
	var game = new jam.Game(500, 300, document.body);

  // This is the order for now.
  game.register(['input',
                 'script',
                 'physics',
                 'render']);
  game.set_state(new PlayState());
  util.mixinOn(game);
  game.on('loop', function(e){
		if( jam.Input.buttonDown("UP") ){
    }
  });
	game.run();
};

class PlayState extends jam.State{
  constructor(){
    super(['input','script','render', 'physics']);
    var p = new Player();
    this.add(p);
  }
}


class Player extends jam.e{
  constructor(){
    var p_img = proto.sq(20, 100, 100, 100);
    super(['script', 'physics', 'render'], {
      position : {x : 0,
                  y : 0
                 },
      collisionBox : {
      },
      image : {
        src : p_img,
        width : 20,
        height : 20
      },
      visible : true
    });
  }

  update(e){
    this.velocity.x = 0;
    this.velocity.y = 0;

    if( jam.Input.buttonDown("UP") ){
			this.velocity.y = -250;
		}
		if( jam.Input.buttonDown("DOWN") ){
			this.velocity.y = 250;
		}
    if( jam.Input.buttonDown("LEFT") ){
			this.velocity.x = -250;
		}
    if( jam.Input.buttonDown("RIGHT") ){
			this.velocity.x = 250;
		}
  }
}
