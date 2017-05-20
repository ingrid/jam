import jam from "jam/jam";
import Player from "./player";

jam.cache.data_dir = "./data/";

jam.init(function(){
  var config = { parent : document.body,
                 debug : false,
                 zoom : 1,
                 fps : 60,
                 prefabs : false,
                 mixins : true,
                 pixels : false };
	var game = new jam.Game(500, 300, config);
  game.register(['input',
                 'physics',
                 'script',
                 'animation',
                 'text',
                 'render']);

  jam.cache.preload("sprites.png");
  jam.cache.preload("player.png");
  jam.cache.show_preloader(game._canvas,
                           main);
  function main(){
    game.set_state(new PlayState());
	  game.run();
  };
});

class PlayState extends jam.State{
  constructor(){
    super(['input',
           'physics',
           'script',
           'animation',
           'text',
           'render']);

    this.bgColor = "rgb(0, 0, 0)";

//    var player = new jam.p.Sprite(20, 100, {src : 'sprites.png',
//                                            width : 100,
//                                            height : 100 });
    //var player = new jam.p.Sprite(20, 100, 'sprites.png');
    var player = new Player(20, 100, 'sprites.png');
    this.add(player);

    player.on('update', function(e){
    });
  }

}
