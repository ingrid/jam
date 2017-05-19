import v from './vector';

// Default component entities, so you don't have to specify stuff like
// velocity 0/0 and acceleration 0/0 on a bunch of sprites.
// Need to make a function that returns the value for the case of objects.
var defaults;
export default defaults = {
  position : new v(0, 0),
  velocity : new v(0, 0),
  acceleration : new v(0, 0),

  image : {
    src : null,
    size : new v(0, 0),
    offset : new v(0, 0)
  },
  alpha : 1,
  angle : 0,
  parallax : new v(0, 0),
  facing : 0,
  animation : null,

  update : function(){

  },

  immovable : false,
  buffer : {},
  font : "60px sans-serif",
  text : '',
  size : new v(800, 200),
  frame : 0
};
