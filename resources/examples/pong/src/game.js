import jam from "../../../../jam/jam";

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
                 'text',
                 'render']);
  game.set_state(new PlayState());
	game.run();
});

class PlayState extends jam.State{
  constructor(){
    super(['input',
           'physics',
           'script',
           'text',
           'render']);

    this.bgColor = "rgb(0, 0, 0)";

    var score = [0,0];
    var scoreTxt = new Text(203, 50);

    var player = new jam.p.Sprite(20, 100, { width: 10,
                                       height : 100,
                                       color : "rgba(255, 255, 0, 1)"});
    var ai = new jam.p.Sprite(470, 100, { width: 10,
                                   height : 100,
                                   color : "rgba(255, 255, 0, 1)"});
    var ball = new jam.p.Sprite(245, 145, { width: 10,
                                   height : 10,
                                   color : "rgba(255, 255, 0, 1)"});

    player.on('update', function(e){
      player.velocity.y = 0;
      if( jam.Input.buttonDown("UP") ){
			  player.velocity.y = -250;
		  }
		  if( jam.Input.buttonDown("DOWN") ){
			  player.velocity.y = 250;
		  }
      player.position.y = Math.min(Math.max(0, player.position.y), 300 - player.height);
    });
    ai.on('update', function(e){
      if(ball.position.x > 100){
			  if(ball.position.y + ball.height / 2 > ai.position.y + ai.height){
				    ai.velocity.y = 200;
			  }
			  if(ball.position.y + ball.height / 2 < ai.position.y){
				  ai.velocity.y = -200;
			  }
		  }
		  else{
			  ai.velocity.y = 0;
		    }
		  // Clamp the position just like player
		  ai.position.y = Math.min(Math.max(0, ai.position.y), 300 - ai.height);
    });

    ball.on('update', function(e){
      var col = undefined; // Some weird stuff until collision groups are added.
      if (jam.Collision.overlap_single(ball, ai)){ col = ai; }
      else if (jam.Collision.overlap_single(ball, player)){ col = player; }
      if (col){
			  if (ball.position.x < 150){
				  ball.velocity.x = Math.abs(ball.velocity.x);
			  }else{
				  ball.velocity.x = -Math.abs(ball.velocity.x);
			  }

			  var yOff = ((ball.position.y + ball.height / 2) - (col.position.y + col.height/2)) / col.height;

			  ball.velocity.x *= 1.1;	// Speed up
			  ball.velocity.y += yOff * 300;	// Adjust the y speed based on where on the paddle it hit.
		  }

		  // Bounce off the top and bottom
		  if(ball.position.y > 300 - ball.height || ball.position.y < 0){
        //console.log('?????');
			  ball.velocity.y = -ball.velocity.y;
        ball.position.y = Math.min(Math.max(0, ball.position.y), 300 - ball.height); //??
		  }

		  // Score on the left side
		  if(ball.position.x <= 0){
			  ball.reset();
			  score[1]++;
		  }
		  // Score on the right side
		  if(ball.position.x + ball.width >= 500){
			  ball.reset();
			  score[0]++;
		  }
    });
	  ball.reset = function(){
		  ball.position.x = 245;
		  ball.position.y = 145;
		  ball.velocity.x = Math.random() > 0.5 ? 200 : -200;
		  ball.velocity.y = Math.random() * 400 - 200;
	  };
	  ball.reset();

    this.add(player);
    this.add(ai);
    this.add(ball);
    this.add(scoreTxt);

	  scoreTxt.on('update', function(e){
		  scoreTxt.text = score[0] + " - " + score[1];
	  });
  }

}

class Text extends jam.e{
  constructor(x, y){
    super(['script',
           'text',
           'render'], {
             position : new jam.v(x, y),
             visible : true,
             font : "40pt calibri",
	           color : "#fff"
           });
  }
  load(img){
  }
}
