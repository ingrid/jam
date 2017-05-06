import CollisionSystem from './core/collision';
import Game from './core/game';
import Entity from './core/entity';
import System from './core/system';
import State from './core/state';
import InputSystem from './core/input';

import Vector from './core/vector';
import Geometry from './core/geometry';
import proto from './core/proto';


var jam;
export default jam = {};

// Load all the default modules
jam.Collision = CollisionSystem;
jam.Game = Game;
jam.Entity = Entity;
jam.System = System;
jam.State = State;
jam.Input = InputSystem;

// Math libs
jam.Vector = Vector;
jam.Geometry = Geometry;

jam.proto = proto;

// Shortcuts
jam.e = jam.Entity;
jam.c = jam.Component;
jam.s = jam.System;

jam.v = jam.Vector;
jam.g = jam.Geometry;
jam.p = jam.proto;

jam.init = function(f){
  if (document.readyState === "complete"){
    f();
  }else{
    window.onload = f;
  }
};
