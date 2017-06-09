import System from "./system";
import v from "./vector";
//import Sheet from "./sheet";

var defaults = {src : null,
                size : new v(16, 16),
                offset : new v(0, 0),
                wrap : 0,
                loop : true}; // Right now this doens't do anything, single loop animations are handled with callbacks.

class Animation{
  constructor(c, frames, rate){
    Object.assign(this, defaults, c);
    this.rate = rate;
    var i, x, y;
    // Generate frames.
    this.frames = [];
    for (i=0; i<frames.length; i++){
      var xi, yi;
      if (this.wrap > 0){
        xi = frames[i] % this.wrap;
        yi = Math.floor(frames[i]/this.wrap);
      }else{
        // Don't divide by 0;
        xi = frames[i];
        yi = 0;
      }
      x = (xi*this.size.x)+this.offset.x+(this.padding.x*xi);
      y = (yi*this.size.y)+this.offset.y+(this.padding.y*yi);
      this.frames.push({
        src : this.src,
        size : this.size,
        offset : new v(x, y)
      });
    }
  }
}

export default class AnimationSystem extends System{
  constructor(){
    super();
    this.required = ['animations',
                     'current_animation',
                     'frame',
                     'previous_animation'];
  }

  update_entity(e, game){
    var animation = e.animations[e.current_animation];
    if (e.current_animation != e.previous_animation){
      // Check for new animation.
      e.previous_animation = e.current_animation;
      e.frame = 0;
    }else{
      // Update frame count.
      console.log(e.frame);
      e.frame = e.frame + game.elapsed * animation.rate;
      console.log(e.frame);
      console.log(animation.rate);
      console.log(game.elapsed);
		  if (e.frame > animation.frames.length){
        // Loop when done. It shouldn't always loop, but we'll add that in later.
			  e.frame = 0;
			  if (animation.callback !== undefined) {
				  animation.callback();
        }
      }
    }
    // Finally, set image based on frame.
    e.image = animation.frames[Math.floor(e.frame)];
  }

}

AnimationSystem.Animation = Animation;
