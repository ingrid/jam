import Game from './game';
import Camera from './camera';

export default class State{
  constructor(systems){
    this._children = [];
    this._remove = [];
    this.systems = {};
    this.camera = new Camera();

    this.run(systems);
  }
// We can probabaly take visible off renderable, just remove the render system, right?
  add(entity){
    var i;
    for (i = 0; i < entity.systems.length; i++){
      if (this.systems[entity.systems[i]] != undefined){
        this.systems[entity.systems[i]].list.push(entity);
      }else{
        // System not on the state yet
      }
    }
    this._children.push(entity);
  }

  remove(entity){
    // This should take entities out of all related state systems;
  }

  run(systems){
    systems = systems || [];
    if (systems.length == undefined){
      systems = [systems];
    }

    var i;
    for (i = 0; i < systems.length; i++){
      var tag = systems[i];
      if (this.systems[tag] == undefined){  // It doesn't already exist on the state.
        var s = Game.systems[tag];
        if (s != undefined){
          this.systems[tag] = {};
          this.systems[tag].lib = s;
          this.systems[tag].list = [];
        }else{
          console.log("No system found for tag: " + tag);
        }
      }
    }
  }
}
