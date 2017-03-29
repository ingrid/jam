import jam from "../../../../jam/jam";

export default class Player extends jam.Sprite{
  constructor(x, y, map){
    super(x, y, ['animated', 'collide_rect']);
	  this.setImage("platformer_data/player.png", 32, 32);

    this.anim_idle = new jam.Animation.Strip([0], 32, 32, 0);
	  this.anim_run = new jam.Animation.Strip([1,2,3,4,5,6], 32, 32, 9);
	  this.anim_jump = new jam.Animation.Strip([32], 32, 32, 0);
	  this.playAnimation(this.anim_idle);

	  this.setCollisionOffsets(6, 0, 20, 31);
	  this.setLayer(1);

	  this.lastPositions = [];
	  this.smoothX = this.x + this.width/2;
	  this.smoothY = this.y + this.height/2;
    this.map = map;
  }

  update(elapsed){
    super.update(elapsed);
		// Collision
		this.collide(this.map);

		// Running / standing
		this.velocity.x = 0;
		if(jam.Input.buttonDown("LEFT")){
			this.velocity.x = -90;
			this.playAnimation(this.anim_run);
			this.facing = jam.Sprite.LEFT;
		}
		else if(jam.Input.buttonDown("RIGHT")){
			this.velocity.x = 90;
			this.playAnimation(this.anim_run);
			this.facing = jam.Sprite.RIGHT;
		}
		else{
			this.playAnimation(this.anim_idle);
		}

		// Jumping animation
		if(!this.touchingBottom){
			this.playAnimation(this.anim_jump);
		}

		// Jumping
		if((jam.Input.justPressed("X") || jam.Input.justPressed("UP")) && this.touchingBottom){
			this.velocity.y = -200;
		}

		// Gravity
		this.velocity.y += 400 * elapsed;

 		this.lastPositions.splice(0,0, new jam.Vector(this.x + this.width / 2, this.y + this.height / 2));
		for(var i = 0; i < Math.min(this.lastPositions.length, 10); ++i){
			this.smoothX += this.lastPositions[i].x;
			this.smoothY += this.lastPositions[i].y;
		}
		this.smoothX /= i+1;
		this.smoothY /= i+1;
	}
}
