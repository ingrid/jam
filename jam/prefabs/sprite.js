import Entity from "../core/entity";
import proto from "../core/proto";
import v from "../core/vector";
import g from "../core/geometry";
import cache from "../core/cache";

export default class Sprite extends Entity{
  constructor(x, y, c){
    super(['script',
           'physics',
           'render'], {
             position : new v(x, y),
             body : new g.Shape([new v(0, 0), new v(c.width, 0),
                                 new v(c.width, c.height), new v(0, c.height)]),
             velocity : new v(0, 0),
             image : null,
             visible : true
           });

    if (typeof c === 'string' || c instanceof String){
      // They passed in an image and want us to figure out the size and offset.
      cache.load(c, function (obj) {
        this.image = {};
        this.image.src = obj;
        this.image.size = {};
        this.image.size.x = obj.naturalWidth;
        this.image.size.y = obj.naturalHeight;
        this.image.offset = { x:0, y:0 };
      }.bind(this));
    }else if(typeof c.src === 'string' || c.src instanceof String){
      // They passed in an image with specifications.
      cache.load(c.src, function (obj) {
        this.image = {};
        this.image.src = obj;
        this.image.size = {};
        this.image.size.x = c.width;
        this.image.size.y = c.height;
        this.image.offset = { x:0, y:0 };
      }.bind(this));
    }else{
      // They passed in a config for a proto image.
      this.image = { src : proto.rect(c.width, c.height, c.color),
                     size : { x:c.width, y:c.height },
                     offset : { x:0, y:0 }
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
