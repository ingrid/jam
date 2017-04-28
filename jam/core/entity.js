import System from './system';
import Game from './game';

export default class Entity{
  constructor(systems, components){
    this.systems = [];
    Object.assign(this, components);
    this.add(systems);
  }

  add(systems){
    systems = systems || [];
    if (systems.length == undefined){
      systems = [systems];
    }

    var i;
    for (i = 0; i < systems.length; i++){
      var tag = systems[i];
      if (this.systems[tag] == undefined){  // It doesn't already exist on the entity.
        // Add to system.
        var s = Game.systems[tag];
        if (s != undefined){
          console.log(tag);
          this.systems.push(tag);
          Game.systems[tag].init(this);
        }else{
          console.log("No system found for tag: " + tag);
        }
      }
    }
  }

  remove(systems){
  }

  define(components){
    if (components != undefined){
      // Not checking for predefined fields here.
      Object.assign(this, components);
    }
  }

  delete(){
  }
}
