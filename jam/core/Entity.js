var add_com_helper = function add_com_helper(com) {
  if (com.init != undefined) {
    com.init.call(this);
  }
  if (com.update != undefined) {
    this.updates.push(com.update.bind(this));
  }
  if (com.render != undefined) {
    this.renders.push(com.render.bind(this));
  }
};

class Entity {
  constructor(tag) {
    this.constructor.tag = tag;
    this.components = [];
    this.updates = [];
    this.renders = [];

    this.add_component = this.add_component.bind(this);

    /*/
      var defaults = Entity.mods[this.constructor.tag].defaults;
      var i;
      for (i=0;i<defaults.length;i++){
      add_com_helper(this, defaults[i]);
      }
    */
    this.render = this.render.bind(this);
  }

  add_component(com_name) {
    if (Entity.mods[this.constructor.tag][com_name] == undefined) {
      // No mod for this type of entity loaded.
      console.log("No component named " + com_name + " found for type " + this.constructor.tag);
      return;
    }
    var com = Entity.mods[this.constructor.tag][com_name];
    add_com_helper.call(this, com);
  }

  list_components() {
    // Format a printable list of componenets on this object
  }

  update(elapsed) {
    for (var i = 0; i < this.updates.length; i++) {
      this.updates[i](elapsed);
    }
  }

  render(context, camera) {
    for (var i = 0; i < this.renders.length; i++) {
      this.renders[i](context, camera);
    }
  }
}

export default Entity;

Entity.mods = {};
Entity.mods.sprite = {};
Entity.mods.sprite.defaults = [];
Entity.mods.game = {};
Entity.mods.game.defaults = [];

Entity.load_mod = function (mod, as_default, name) {
  // Add check if mod itself is already loaded.
  // Add check for if name is arleady defined, we can override, but should log a message.

  // Maybe trim unecessary (empty or undefined) components here.
  if (as_default === true) {
    Entity.mode.sprite.defaults.push(mod.sprite);
    Entity.mode.game.defaults.push(mod.game);
  } else {
    Entity.mods.sprite[name] = mod.sprite;
    Entity.mods.game[name] = mod.game;
    console.log(Entity.mods);
  }
};
