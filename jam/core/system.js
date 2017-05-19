import defaults from './defaults';

export default class System{
  constructor(game){
    this.entities = [];
    this._remove = [];

    this.required = []; // Required componets.
    this.dependencies = []; // Systems this system is dependent on.
  }

  load(j){
  }

  init(e){
    // Look at prexisting components on the entity,
    // populate with default values if necessary.
    var i;
    for (i = 0; i < this.required.length; i++){
      // Only looking for undefined, null is allowed.
      if (e[this.required[i]] == undefined){
        var def_val = defaults[this.required[i]];
        if (def_val == undefined){
          console.log("No value specified and no default found for component name: "
                      + this.required[i]);
        }else{
          e[this.required[i]] = def_val;
        }
      }
    }
  }

  add(e){  // Entity
    console.log('Should not be called');
  }

  remove(e){
    this._remove.push(e);
  }

  update_entity(e){
  }

  update(e_list, game){
    // If we don't want a system to update automatically we can just rip this out.
    // this.entities = this.entities.filter(function (e, i, a) {
    //   var keep = this._remove.indexOf(e) === -1;
    //   // Stuff to deactivate entity.
    //   return keep;
    // }.bind(this));
    // this._remove = [];
    //console.log(e_list);
    var i;
    for (i = 0; i < e_list.length; i++){
      this.update_entity(e_list[i], game);
    }
  }
}
