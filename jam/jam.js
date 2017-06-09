import CollisionSystem from './core/collision';
import Game from './core/game';
import Entity from './core/entity';
import System from './core/system';
import State from './core/state';
import InputSystem from './core/input';

// Patch until we implement system onload
import AnimationSystem from './core/animation';


import Vector from './core/vector';
import Geometry from './core/geometry';
import proto from './core/proto';
import cache from './core/cache';

// prefabs
import PrefabSprite from './prefabs/sprite';
import PrefabGame from './prefabs/game'; // what should I call this?
import PrefabState from './prefabs/state';

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
jam.cache = cache;

// Shortcuts
jam.e = jam.Entity;
jam.c = jam.Component;
jam.s = jam.System;

jam.v = jam.Vector;
jam.g = jam.Geometry;
jam.p = jam.proto;

jam.p.Sprite = PrefabSprite;
jam.p.Game = PrefabGame;
jam.p.State = PrefabState;

jam.jSprite = PrefabSprite;
jam.jGame = PrefabGame;
jam.jState = PrefabState;

jam.Animation = AnimationSystem.Animation;

jam.init = function(f){
  if (document.readyState === "complete"){
    f();
  }else{
    window.onload = f;
  }
};
