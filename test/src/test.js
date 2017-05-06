import jam from "../../jam/jam";

jam.init(function(){
  var config = { parent : document.body,
                 debug : false,
                 zoom : 1,
                 fps : 60,
                 prefabs : false,
                 mixins : false };
	var game = new jam.Game(500, 300, config);

  game.register(['input',
                 'physics',
                 'script',
                 'text',
                 'render']);

  game.set_state(new PlayState());
  // jam.util.mixinOn(game);
  // game.on('loop', function(e){
  //   if( jam.Input.buttonDown("MOUSE_LEFT") ){
  //     console.log('woo');
  //   }
  // });

	game.run();
});

var p, o, t;
class PlayState extends jam.State{
  constructor(){
    super(['input',
           'physics',
           'script',
           'text',
           'render']);

    this.bgColor = "rgb(0, 0, 0)";

    p = new Player(70, 70);
    o = new Obstacle(80, 80);
    t = new TObstacle(180, 20);

    this.add(p);
    this.add(o);
    this.add(t);
  }
}

class Player extends jam.e{
  constructor(x, y){
    var p_img = jam.proto.sq(20, 100, 100, 100);
    super(['script',
           'physics',
           'render'], {
      position : new jam.v(x, y),
      body : new jam.g.Shape([new jam.v(0, 0), new jam.v(20, 0),
                          new jam.v(20, 20), new jam.v(0, 20)]),
      image : { src : p_img,
                width : 20,
                height : 20 },
      visible : true
    });
  }

  update(e){
    this.velocity.x = 0;
    this.velocity.y = 0;
    // console.log(this.position.x);
    var col = jam.Collision.collide_single(this, o) || jam.Collision.collide_single(this, t);
    if (col){
      this.velocity.x = 0;
      this.velocity.y = 0;
    }
    // console.log(this.position.x);
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
    var p_img = jam.proto.sq(20, 100, 255, 100);
    super(['script',
           'physics',
           'render'], {
             position : new jam.v(x, y),
             body : new jam.g.Shape([new jam.v(0, 0), new jam.v(20, 0),
                                 new jam.v(20, 20), new jam.v(0, 20)]),
             image : {
               src : p_img,
               width : 20,
               height : 20
             },
             visible : true,
             immovable : true
           });
  }
}


class TObstacle extends jam.e{
  constructor(x, y){
    super(['script',
           'physics',
           'text',
           'render'], {
             position : new jam.v(x, y),
             body : new jam.g.Shape([new jam.v(0, 0), new jam.v(200, 0), new jam.v(0, 200)]),
             text : 'foo',
             visible : true,
             immovable : true
           });
  }
}
