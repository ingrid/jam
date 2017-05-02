import jam from "../../jam/jam";
import proto from "../../jam/core/proto";

import util from "../../jam/core/util";
import g from "../../jam/core/geometry";
import v from "../../jam/core/vector";

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
var p, o;
class PlayState extends jam.State{
  constructor(){
    super(['input','script','render', 'physics']);

    p = new Player(70, 70);
    o = new Obstacle(80, 80);

    console.log(p.shape.edges);
    console.log(o.shape.edges);

    console.log(p.shape.normals);
    console.log(o.shape.normals);

    this.add(p);
    this.add(o);
  }
}

class Player extends jam.e{
  constructor(x, y){
    var p_img = proto.sq(20, 100, 100, 100);
    super(['script', 'physics', 'render'], {
      position : new v(x, y),
      shape : new g.Shape([new v(0, 0), new v(20, 0),
                          new v(20, 20), new v(0, 20)]),
      image : { src : p_img,
                width : 20,
                height : 20 },
      visible : true
    });
  }

  update(e){
    this.velocity.x = 0;
    this.velocity.y = 0;
    // var col = jam.Collision.overlap_single(this, o);
    var col = jam.Collision.collide_single(this, o);
    if (col){
      console.log('foo');
    }else{
      console.log('bar');
    }
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

class Obstacle extends jam.e{
  constructor(x, y){
    var p_img = proto.sq(20, 255, 100, 100);
    super(['script', 'physics', 'render'], {
      position : new v(x, y),
      shape : new g.Shape([new v(0, 0), new v(20, 0),
                           new v(20, 20), new v(0, 20)]),
      image : {
        src : p_img,
        width : 20,
        height : 20
      },
      visible : true
    });
  }
}
