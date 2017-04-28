import Game from './core/game';
import Entity from './core/entity';
import System from './core/system';
import State from './core/state';
import Input from './core/input';

var lib;
export default lib = {};

// Load all the default modules
lib.Game = Game;
lib.Entity = Entity;
lib.System = System;
lib.State = State;
lib.Input = Input;;

// Shortcuts
lib.e = lib.Entity;
lib.c = lib.Component;
lib.s = lib.System;

lib.load = function(s){
  if (mod_map.systems.s != undefined){
    mod_map.s[s] = mod_map.systems.s;
  }else{
    console.log('No module found for name: ' + s);
  }
};
