import v from './vector';

// Default component entities, so you don't have to specify stuff like
// velocity 0/0 and acceleration 0/0 on a bunch of sprites.

var defaults;
export default defaults = {
  position : new v(0, 0),
  velocity : new v(0, 0),
  acceleration : new v(0, 0),

  image : {
    src : null,
    width : 0,
    height : 0
  },
  alpha : 1,
  angle : 0,
  parallax : new v(0, 0),

  update : function(){

  },

  animation : null,

  facing : 0
};
