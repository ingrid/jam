import Camera from "./camera";

// A container for state to streamline switching and cleanup.
export default class state{
  constructor(w, h, state_data){
    this._children = [];
    // List of objects to be removed
    this._remove = [];
    this.camera = new Camera(0, 0);

    this.bgColor = "rgb(255,255,255)";
  }
  add(sprite) {
    this._children.push(sprite);
    // sprite._game = this;
    this.sort_sprites(); // Sort to figure out layering
  }

  remove(sprite) {
    if (this._remove.indexOf(sprite) === -1) {
      this._remove.push(sprite);
      // sprite._game = null;
    }
  }

  sort_sprites() {
    this._children.sort(function (a, b) {
      return b._layer - a._layer;
    });
  }

  enter(){
  }
  exit(){
  }
}

state.preload = class preload extends state{
  // A special case screen while loading assets.
  constructor(){
    super();
  }
};
