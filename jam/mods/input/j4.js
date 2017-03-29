import Module from "../../core/module";
import jam from "../../jam";

// Four way joy stick controls, no diagnals.

var lib;
export default lib = new Module();

lib.name = 'j4';

lib.load = function(jam){
};

lib.sprite.init = function(elapsed){
  this.speed = 40;
  this.j4 = function(speed){
    this.speed = speed
    return this;;
  };
};

lib.sprite.update = function(elapsed){
  this.velocity.x = 0;
  this.velocity.y = 0;
	if(jam.Input.buttonDown("LEFT")){
    this.dir = 'left';
		this.velocity.x = -this.speed;
		this.playAnimation(this.anim.walk[this.dir]);
	}else if(jam.Input.buttonDown("RIGHT")){
    this.dir = 'right';
		this.velocity.x = this.speed;
    this.playAnimation(this.anim.walk[this.dir]);
  }else if(jam.Input.buttonDown("DOWN")){
    this.dir = 'down';
		this.velocity.y = this.speed;
    this.playAnimation(this.anim.walk[this.dir]);
  }else if(jam.Input.buttonDown("UP")){
    this.dir = 'up';
		  this.velocity.y = -this.speed;
      this.playAnimation(this.anim.walk[this.dir]);
	  }else{
		  this.playAnimation(this.anim.idle[this.dir]);
	  }
};
