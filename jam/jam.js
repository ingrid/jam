import CollisionSystem from './core/collision';
import Game from './core/game';
import Entity from './core/entity';
import System from './core/system';
import State from './core/state';
import InputSystem from './core/input';

import Vector from './core/vector';
import Geometry from './core/geometry';


var lib;
export default lib = {};

// Load all the default modules
lib.Collision = CollisionSystem;
lib.Game = Game;
lib.Entity = Entity;
lib.System = System;
lib.State = State;
lib.Input = InputSystem;

// Math libs
lib.Vector = Vector;
lib.Geometry = Geometry;

// Shortcuts
lib.e = lib.Entity;
lib.c = lib.Component;
lib.s = lib.System;

lib.v = Vector;
lib.g = Geometry;
