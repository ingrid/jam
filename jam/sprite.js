define(["exports", "./util", "./vector", "./lib/sylvester"], function (exports, _util, _vector, _sylvester) {
   "use strict";

   Object.defineProperty(exports, "__esModule", {
      value: true
   });

   var _util2 = _interopRequireDefault(_util);

   var _vector2 = _interopRequireDefault(_vector);

   var _sylvester2 = _interopRequireDefault(_sylvester);

   function _interopRequireDefault(obj) {
      return obj && obj.__esModule ? obj : {
         default: obj
      };
   }

   var _sprite;

   exports.default = _sprite = function sprite(x, y, image) {
      this.facing = this.RIGHT;

      this.x = x;
      this.y = y;
      this.width = 0;
      this.height = 0;
      this.angle = 0;
      this.alpha = 1.0;

      // Collision flags
      this._collisionOffsetX = 0;
      this._collisionOffsetY = 0;
      this._collisionOffsetWidth = 0;
      this._collisionOffsetHeight = 0;
      // It will stay still when things collide with it, if true
      this.immovable = false;
      this.touchingTop = false;
      this.touchingBottom = false;
      this.touchingLeft = false;
      this.touchingRight = false;

      this.collides = true;

      this.image = null;
      // The sprite can be hidden by setting this to false
      this.visible = true;

      this.scale = 1.0;

      this.velocity = new _vector2.default(0, 0);
      this.acceleration = new _vector2.default(0, 0);

      // Animation state
      this.animation = null;
      this.lastAnimation = null;
      this.frame = null;
      this.animationFrame = 0;
      this._force = false;

      if (image !== undefined) {
         this.setImage(image);
      }

      // List of objects to be removed
      this._removeList = [];

      // Scene Graph stuff
      this.subSprites = [];
      this.parentSprite = null;

      this.add = function (sprite) {
         this.subSprites.push(sprite);
         sprite.parentSprite = this;
      };

      this.remove = function (sprite) {
         if (this._removeList.indexOf(sprite) === -1) {
            this._removeList.push(sprite);
            sprite.parentSprite = null;
         }
      };

      // Finds the world-space transform. Recursively up through
      // the scene graph.
      this.getTransform = function () {
         var parentMatrix = _sylvester2.default.Matrix.I(3);
         if (this.parentSprite) {
            parentMatrix = this.parentSprite.getTransform();
         }
         var translationMatrix = _sylvester2.default.$M([[1, 0, this.x + this.width / 2], [0, 1, this.y + this.height / 2], [0, 0, 1]]);

         var rotationMatrix = _sylvester2.default.Matrix.RotationZ(this.angle * Math.PI / 180);
         var halfWidthTranslationMatrix = _sylvester2.default.$M([[1, 0, -this.width / 2], [0, 1, -this.height / 2], [0, 0, 1]]);

         return parentMatrix.x(translationMatrix.x(rotationMatrix.x(halfWidthTranslationMatrix)));
      };

      // Inverse worldspace transform
      this.getInverseTransform = function () {
         return this.getTransform().inv();
      };

      // Gives a static-frame sprite under a different parent in the
      // scene graph hierarchy, but with the same absolute position
      // and rotation
      this.transcend = function (otherParent) {
         var totalTrans = otherParent.getInverseTransform().x(this.getTransform());
         newParentPos = totalTrans.x(_sylvester2.default.$V([0, 0, 1]));
         offsetPos = totalTrans.x(_sylvester2.default.$V([1, 0, 1]));
         var x = newParentPos.elements[0];
         var y = newParentPos.elements[1];
         var ox = offsetPos.elements[0];
         var oy = offsetPos.elements[1];
         var dx = ox - x;
         var dy = oy - y;
         var a = Math.atan2(dy, dx);
         var spr = new _sprite(x, y);
         spr.frame = this.frame;
         spr.image = this.image;
         spr.angle = a / Math.PI * 180;
         return spr;
      };

      // extending functionality

      _util2.default.mixinOn(this);
   };

   _sprite.prototype.LEFT = 0;
   _sprite.prototype.RIGHT = 1;

   _sprite.Animation = function (frames, rate, offsetX, offsetY, callback) {
      offsetX = offsetX || 0;
      offsetY = offsetY || 0;
      this.rate = rate;
      this.callback = callback;
      this.numFrames = frames.length;

      this.getFrameData = function (sprite, i) {
         var frame = {};
         frame.x = frames[i] * sprite.width + offsetX;
         frame.y = offsetY;
         frame.w = sprite.width;
         frame.h = sprite.height;
         return frame;
      };
   };

   _sprite.prototype.setImage = function (url_or_obj, frameWidth, frameHeight) {
      var postLoad = function (obj) {
         this.image = obj;
         this.width = frameWidth || this.image.naturalWidth;
         this.height = frameHeight || this.image.naturalHeight;
      }.bind(this);

      ;

      if (url_or_obj.complete) {
         postLoad(url_or_obj);
      } else {
         _util2.default.load(url_or_obj, postLoad);
      }
   };

   _sprite.prototype.render = function (context) {
      if (!this.visible) {
         return;
      }

      var curFrame = null;

      if (this.frame === null || this.frame === undefined) {
         curFrame = {
            x: 0,
            y: 0,
            w: this.width,
            h: this.height
         };
      } else {
         curFrame = this.frame;
      }

      this._renderHelper(context, this.image, curFrame.w, curFrame.h, curFrame.x, curFrame.y, curFrame.w, curFrame.h);
   };

   _sprite.prototype._renderHelper = function (context, image, w, h, sx, sy, sw, sh) {
      var tx = Math.floor(this.x + this.width / 2);
      var ty = Math.floor(this.y + this.height / 2);
      context.save();
      context.translate(tx, ty);

      if (this.angle !== 0) {
         context.rotate(this.angle * Math.PI / 180);
      }

      if (this.alpha !== 1.0) {
         context.globalAlpha = this.alpha;
      }

      if (this.facing == this.LEFT) {
         context.scale(-1, 1);
      }

      if (this.image) {
         context.drawImage(this.image, sx, sy, sw, sh, -Math.floor(this.width / 2), -Math.floor(this.height / 2), w, h);
      }

      for (var i = 0; i < this.subSprites.length; ++i) {
         this.subSprites[i].render(context);
      }

      context.restore();
   };

   _sprite.prototype.playAnimation = function (animation, force) {
      this.animation = animation;

      if (force) {
         this._force = true;
      }

      if (!this.frame || force) {
         this.frame = this.animation.getFrameData(this, 0);
         this.animationFrame = 0;
      }
   };

   _sprite.prototype.setSingleFrame = function (index) {
      this.frame = {
         x: index * this.width,
         y: 0,
         w: this.width,
         h: this.height
      };
      this.animation = null;
   };

   _sprite.prototype.update = function (elapsed) {
      this.subSprites = this.subSprites.filter(function (x, i, a) {
         return this._removeList.indexOf(x) === -1;
      }, this);
      this._removeList = [];

      if (this.animation !== null) {
         this.animationFrame = this.animationFrame + elapsed * this.animation.rate;

         if (this.animationFrame > this.animation.numFrames) {
            this.animationFrame = 0;

            if (this.animation.callback !== undefined) {
               this.animation.callback();
            }
         }

         this.frame = this.animation.getFrameData(this, Math.floor(this.animationFrame));

         if (this.animation !== this.lastAnimation || this._force) {
            this.animationFrame = 0;
            this.frame = this.animation.getFrameData(this, 0);
            this._force = false;
         }

         this.lastAnimation = this.animation;
      }

      this.velocity = _vector2.default.add(this.velocity, _vector2.default.mul(this.acceleration, elapsed));
      this.x += this.velocity.x * elapsed;
      this.y += this.velocity.y * elapsed;

      for (var i = 0; i < this.subSprites.length; ++i) {
         this.subSprites[i].update(elapsed);
      }
   };
});