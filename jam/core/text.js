import Sprite from './sprite';

export default class Text extends Sprite {
  constructor(x, y) {
    super(x, y)
    this.text = "";
    this.font = "";
    this.color = "";
  }

  render(context, camera) {
    context.font = this.font;
    context.textBaseline="hanging";
    context.fillStyle = this.color;
    context.fillText(this.text, this.x - camera.scroll.x * this.parallax.x, this.y - camera.scroll.y * this.parallax.y);
  }
}

/*
var lib;
export default lib = new Module();

lib.sprite.init = function(){
  this.text = "";
  this.font = "";
  this.color = ""
};

lib.sprite.render = function(context, camera){
  context.font = this.font;
  context.fillStyle = this.color;
  context.fillText(this.text,
                   this.x - camera.scroll.x * this.parallax.x,
                   this.y - camera.scroll.y * this.parallax.y);
};
*/
