import jam from "../../../../jam/jam";

if (document.readyState === "complete"){
  initialize();
}else{
  window.onload = initialize;
};

function initialize(){
  var config = { parent : document.body,
                 debug : false,
                 zoom : 1,
                 fps : 60,
                 prefabs : false,
                 mixins : false };

	var game = new jam.Game(500, 300, config);

  // This does not effect order, that happens on state.
  game.register(['input',
                 'physics',
                 'script',
                 'text',
                 'render']);

  game.set_state(new PlayState());
	game.run();
};

class PlayState extends jam.State{
  constructor(){
    super(['input',
           'physics',
           'script',
           'text',
           'render',
           'debug']);
  }
}
