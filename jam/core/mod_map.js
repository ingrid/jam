// A module map for core and optional included
var mods = {
  tools : 'tools/',
  physics : 'physics/',
  collision : 'physics/collision/',
  input : 'input/'
};

var map = {
  rect : mods.collision +  'rect.js',

  animation : mods.tools + 'animation.js',
  color_key : mods.tools + 'color_key.js',
  debug : mods.tools + 'debug.js',
  level_map : mods.tools + 'level_map.js',
  proto : mods.tools + 'proto.js',
  proto_tools : mods.tools + 'proto_tools.js',

  arcade : mods.input + 'arcade.js',
  j4 : mods.input + 'j4.js'
};

export default map;
