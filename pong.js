jsGame.includeModule("ProtoTools");
jsGame.includeModule("RectCollision");
jsGame.includeModule("Debug");


window.onload = function(){
	jsGame.preload("http://peach.blender.org/wp-content/uploads/big_big_buck_bunny.jpg");
	jsGame.preload("http://apod.nasa.gov/apod/image/9712/orionfull_jcc_big.jpg");
	jsGame.preload("http://www.surftravelcompany.com/big-wave-pics/big-wave.jpg");
	jsGame.preload("http://myrentalpad.com/wp-content/uploads/2010/03/cant-have-anything-nice.gif");
	jsGame.preload("http://peach.blender.org/wp-content/uploads/big_big_buck_bunny.jpg");
	jsGame.showPreloader(document.body, initialize);
}

function initialize(){
	var game = jsGame.Game(500, 300);
	game.fps = 40;

	jsGame.Debug.showBoundingBoxes = true;
	
	// Dumb way to put a border around the game
	game._canvas.style.border="1px solid black";

	// Score
	var score = [0,0];

	var scoreTxt = jsGame.Text(200, 50);
	game.add(scoreTxt);
	
	// Create objects
	var ball = jsGame.Sprite(300, 150);
	ball.rectangleImage(20,20, "rgb(0,0,0)");
	game.add(ball);

	var player = jsGame.Sprite(2, 100);
	player.rectangleImage(20, 100, "rgb(0,0,0)");
	game.add(player);

	var ai = jsGame.Sprite(478, 100);
	ai.rectangleImage(20, 100, "rgb(0,0,0)");
	game.add(ai);

	// Put player and AI in same collision group so the ball 
	// can collide with either.

	var paddles = jsGame.CollisionGroup();
	paddles.add(player);
	paddles.add(ai);

	// Extend object behaviors
	ball.velocity.x = 100;
	ball.velocity.y = 100;
	ball.update = jsGame.extend(ball.update, function(){
		// Bouncing
		// Use the overlaps callback
		ball.overlaps(paddles, function(me, other){
			if(ball.x < 150){
				ball.velocity.x = Math.abs(ball.velocity.x);
			}
			else{
				ball.velocity.x = -Math.abs(ball.velocity.x);
			}

			// Offset the y velocity based on where it hit the paddle
			yOff = ((ball.y + ball.height / 2) - (other.y + other.height/2)) / other.height;

			ball.velocity.x *= 1.1;
			ball.velocity.y += yOff * 300;
		})
		if(ball.y >= 300 - ball.height || ball.y <= 0){
			ball.velocity.y = -ball.velocity.y
		}
		// Scoring
		var reset = function(){
			ball.x = 240;
			ball.y = 140;
			ball.velocity.x = Math.random() > 0.5 ? 200 : -200;
			ball.velocity.y = Math.random() * 400 - 200;
		}
		if(ball.x <= 0){
			reset();
			score[1]++;
		}
		if(ball.x + ball.width >= 500){
			reset();
			score[0]++;
		}
	});

	player.update = jsGame.extend(player.update, function(elapsed){
		// Reset velocity
		player.velocity.y = 0;
		// And then set it based on input
		if( jsGame.Input.keyDown("UP") ){
			player.velocity.y = -250;
		}
		if( jsGame.Input.keyDown("DOWN") ){
			player.velocity.y = 250;
		}
		player.y = Math.min(Math.max(0, player.y), 300 - player.height);
	});

	ai.update = jsGame.extend(ai.update, function(elapsed){
		// Always towards the ball if the ball is coming towards us
		if(ball.x > 100){
			if(ball.y + ball.height / 2 > ai.y + ai.height){
				ai.velocity.y = 200;
			}
			if(ball.y + ball.height / 2 < ai.y){
				ai.velocity.y = -200;
			}
		}
		else{
			ai.velocity.y = 0;
		}
		ai.y = Math.min(Math.max(0, ai.y), 300 - ai.height);
	});

	// Score text
	scoreTxt.font = "40pt calibri";
	scoreTxt.color = "#000";
	scoreTxt.update = jsGame.extend(scoreTxt.update, function(){
		scoreTxt.text = score[0] + " - " + score[1];
	});


	game.run();
}
