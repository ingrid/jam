import v from './vector';

// Default component entities, so you don't have to specify stuff like
// velocity 0/0 and acceleration 0/0 on a bunch of sprites.
// Right now they're broken out very discretely for caases where mutiple systems use a single component (most systems use position for example) but some can be reduced, for example 'frame' and 'animation' are coupled tightly enough that I think they can both be put in an animation component.

var defaults;
export default defaults = {
  position : function(e){ e.position = new v(0, 0);},
  velocity : function(e){ e.velocity = new v(0, 0);},
  acceleration : function(e){ e.acceleration = new v(0, 0);},

  image : function(e){ e.image = { src : null,
                                   size : new v(0, 0),
                                   offset : new v(0, 0)};},
  alpha : function(e){ e.alpha = 1; },
  angle : function(e){ e.angle = 0; },
  parallax : function(e){ e.parallax = new v(0, 0);},
  facing : function(e){ e.facing = 0; },
  animation : function(e){ e.animation = null; },

  update : function(e){ e.update = function(){}; },

  immovable : function(e){ e.immovable = false; },

  // For text and dynamically drawn sprites
  buffer : function(e){ e.buffer = {}; },

  font : function(e){ e.font = "60px sans-serif"; },
  text : function(e){ e.text = ''; },
  size : function(e){ e.size = new v(800, 200); },
  frame : function(e){ e.frame = 0; }
};
