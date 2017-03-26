// A module map for core and optional included
var mods = {
  tools : 'tools/',
  physics : 'physics/',
  collision : 'physics/collision/'
};

var map = {
  rect : mods.collision +  'rect.js',
  animated : mods.tools + 'animation'
};

export default map;
