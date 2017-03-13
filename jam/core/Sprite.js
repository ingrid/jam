import Util from './Util';
import Vector from './Vector';
import Entity from './Entity';

class Sprite extends Entity {
  constructor(x, y, coms) {
    super(Sprite.tag);

    // Entity tag
    // This is needed for animation right now, I'll need to patch this later.
    this.render_default = true;

    if (coms != undefined) {
      if (!Array.isArray(coms)) {
        coms = [coms];
      };
      for (var i = 0; i < coms.length; i++) {
        this.add_component(coms[i]);
      }
    }

    this._layer = 0;
    this._game = null;

    this.facing = Sprite.RIGHT;

    this.x = x;
    this.y = y;
    this.width = 0;
    this.height = 0;
    this.angle = 0;
    this.alpha = 1.0;

    this.image = null;
    this.visible = true; // The sprite can be hidden by setting this to false

    this.velocity = new Vector(0, 0);
    this.acceleration = new Vector(0, 0);

    // How much the render position is affected by the camera
    this.parallax = new Vector(1, 1);
    // I need to look into this more, I think we can do some stuff at the tick() level to stop binding everywhere.
    this.update = this.update.bind(this);
  }

  setImage(url, frameWidth, frameHeight) {
    Util.load(url, function (obj) {
      this.image = obj;
      this.width = frameWidth || this.image.naturalWidth;
      this.height = frameHeight || this.image.naturalHeight;
      this.imageLoaded();
    }.bind(this));
  }

  _set_image_helper(img, frameWidth, frameHeight) {}

  ue: function

  render(context, camera) {
    super.render(context, camera);
    if (this.render_default === true) {
      if (this.image !== null && this.visible) {
        this._renderHelper(context, camera, this.image, this.width, this.height, 0, 0, this.width, this.height);
      }
    }
  }

  _renderHelper(context, camera, image, w, h, sx, sy, sw, sh) {
    // Avoid horrible automatic blending if we have non-integer values
    var tx = Math.floor(this.x - camera.scroll.x * this.parallax.x + this.width / 2);
    var ty = Math.floor(this.y - camera.scroll.y * this.parallax.y + this.height / 2);
    context.save();

    // Set up the context transform and alpha before drawing
    context.translate(tx, ty);
    if (this.angle != 0) {
      context.rotate(this.angle * Math.PI / 180);
    }
    if (this.alpha != 1.0) {
      context.globalAlpha = this.alpha;
    }
    if (this.facing == Sprite.LEFT) {
      context.scale(-1, 1);
    }

    context.drawImage(this.image, sx, sy, sw, sh, -this.width / 2, -this.height / 2, w, h);

    context.restore();
  }

  update(elapsed) {
    // This vector math stuff sucks because there's no such thing as
    // operator overloading

    // Add to velocity based on accel
    var va = Vector.add,
        vm = Vector.mul;
    this.velocity = va(this.velocity, vm(this.acceleration, elapsed));

    // Add to position based on velocity
    this.x += this.velocity.x * elapsed;
    this.y += this.velocity.y * elapsed;
    super.update(elapsed);
  }

  setLayer(layer) {
    this._layer = layer;
    if (this._game) {
      this._game.sortSprites();
    }
  }
}

export default Sprite;

// "static" constants so that we don't have to remember that
// 0 = left and 1 = right. These control if the sprite is flipped
// horizontally or not.

Sprite.LEFT = 0;
Sprite.RIGHT = 1;
Sprite.tag = 'sprite';
console.log(Sprite.tag);
