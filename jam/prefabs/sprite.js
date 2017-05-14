import Entity from "../core/entity";
import proto from "../core/proto";
import v from "../core/vector";
import g from "../core/geometry";
import cache from "../core/cache";

export default class Sprite extends Entity{
  constructor(x, y, c){
    var image;
    super(['script',
           'physics',
           'render'], {
             position : new v(x, y),
             body : new g.Shape([new v(0, 0), new v(c.width, 0),
                                 new v(c.width, c.height), new v(0, c.height)]),
             velocity : new v(0, 0),
             image : image,
             visible : true
           });

    if (typeof c === 'string' || c instanceof String){
      // They passed in an image.
      cache.load(c, function (obj) {
        this.image = {};
        this.image.src = obj;
        this.image.width = this.image.naturalWidth;
        this.image.height = this.image.naturalHeight;
        // this.imageLoaded();
      }.bind(this));
    }else{ // They passed in an object to define a placeholder image.
      image = { src : proto.rect(c.width, c.height, c.color),
                  width : c.width,
                height : c.height
                };
    }
    this.width = c.width;
    this.height = c.height;
  }
}

class Button extends Entity{
  // ember uses 'diabled'
  // Hover, idle, selected, inactive?
  constructor(x, y, txt, c){
    if (c){
        //bg images config
      var p_img = proto.sq(20, 100, 100, 100);
    }
    super(['script',
           'physics',
           'text',
           'render'], {
             position : new v(x, y),
             body : new g.Shape([new v(0, 0), new v(20, 0),
                                     new v(20, 20), new v(0, 20)]),
             image : { src : p_img,
                       width : 20,
                       height : 20 },
             visible : true
           });
  }
}
