import System from "./system";
// Direct manipulation rect collision.

var Collision = {};

// Called to collide a pair of sprites.
Collision.collide_single = function (e1, e2) {
  if (!Collision.overlap_single(e1, e2)) { return false; }

  // Figure out how much each object will need to move based on which ones are immmovable
  var staticCo1, staticCo2;
  if (self.immovable && other.immovable) {
    return;
  } else if (self.immovable) {
    staticCo2 = 1.0;staticCo1 = 0.0;
  } else if (other.immovable) {
    staticCo1 = 1.0;staticCo2 = 0.0;
  } else {
    staticCo1 = 0.5;staticCo2 = 0.5;
  }

  var x1 = self.x + self._collisionOffsetX;
  var y1 = self.y + self._collisionOffsetY;
  var w1 = self.width + self._collisionOffsetWidth;
  var h1 = self.height + self._collisionOffsetHeight;

  var x2 = other.x + other._collisionOffsetX;
  var y2 = other.y + other._collisionOffsetY;
  var w2 = other.width + other._collisionOffsetWidth;
  var h2 = other.height + other._collisionOffsetHeight;

  // Find the side with minimum penetration
  var penLeft = -(x1 + w1 - x2);
  var penRight = -(x1 - (x2 + w2));
  var penTop = -(y1 + h1 - y2);
  var penBottom = -(y1 - (y2 + h2));

  var minHorizSep = penRight < -penLeft ? penRight : penLeft;
  var minVertSep = penBottom < -penTop ? penBottom : penTop;

  // Separate the objects, reset their velocities
  // and set the touching flags.
  if (Math.abs(minHorizSep) < Math.abs(minVertSep)) {
    if (minHorizSep > 0) {
      self.touchingLeft = true;
      self.velocity.x = Math.max(0, self.velocity.x);
      other.touchingRight = true;
      other.velocity.x = Math.min(0, other.velocity.x);
    } else {
      self.touchingRight = true;
      self.velocity.x = Math.min(0, self.velocity.x);
      other.touchingLeft = true;
      other.velocity.x = Math.max(0, other.velocity.x);
    }
    self.x += minHorizSep * staticCo1;
    other.x -= minHorizSep * staticCo2;
  } else {
    if (minVertSep > 0) {
      self.touchingTop = true;
      self.velocity.y = Math.max(0, self.velocity.y);
      other.touchingBottom = true;
      other.velocity.y = Math.min(0, other.velocity.y);
    } else {
      self.touchingBottom = true;
      self.velocity.y = Math.min(0, self.velocity.y);
      other.touchingTop = true;
      other.velocity.y = Math.max(0, other.velocity.y);
    }
    self.y += minVertSep * staticCo1;
    other.y -= minVertSep * staticCo2;
  }
  return true;
};

// A collision group holds any number of Sprites or similar and allows
// batch collision detection. This is great for dynamically created objects
// like stuff loaded from a map, particles, spawned enemies, etc. because
// you can just add all that stuff to a group and collide it against the
// player.
var CollisionGroup = function CollisionGroup() {
  var g = {};
  g.children = [];
  g._remove = [];

  g.add = function (sprite) {
    g.children.push(sprite);
  };

  g.remove = function (sprite) {
    g._remove.push(sprite);
  };

  // Yeah, if you use the getChildren function then we don't need an update.
  // not sure if this is the best solution
  g.getChildren = function () {
    if (g._remove.length > 0) {
      g.children = g.children.filter(function (x, i, a) {
        return g._remove.indexOf(x) === -1;
      });
      g._remove = [];
    }
    return g.children;
  };

  g.overlaps = function (other, callback) {
    return Collision.overlaps(g, other, callback);
  };

  g.collide = function (other) {
    return Collision.collide(g, other);
  };

  return g;
};

var lib = new Module();
export default lib;

lib.load = function (jam) {
  jam.Collision = Collision;
  jam.CollisionGroup = CollisionGroup;
};

// Okay, now give sprites all this functionality
lib.sprite.init = function () {
  this.immovable = false; // Can this sprite be pushed around by collisions
  this._collisionOffsetX = 0;
  this._collisionOffsetY = 0;
  this._collisionOffsetWidth = 0;
  this._collisionOffsetHeight = 0;

  // Always supply this as the first argument and the other guy as the second
  this.overlaps = function (other, callback) {
    return Collision.overlaps(this, other, callback);
  };
  this.collide = function (other) {
    return Collision.collide(this, other);
  };

  // These become true for the single frame after stuff collides
  this.touchingTop = false;
  this.touchingBottom = false;
  this.touchingLeft = false;
  this.touchingRight = false;

  this.setCollisionOffsets = function (xo, yo, w, h) {
    this._collisionOffsetX = xo;
    this._collisionOffsetY = yo;
    this._collisionOffsetWidth = w - this.width;
    this._collisionOffsetHeight = h - this.height;
  };
};

lib.sprite.update = function (elapsed) {
  // Then get reset to false again
  this.touchingTop = false;
  this.touchingBottom = false;
  this.touchingLeft = false;
  this.touchingRight = false;
};

lib.name = 'collide_rect';

lib.preLoad = function(){
};
