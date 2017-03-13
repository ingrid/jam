define(["exports", "../jam", "../core/Sprite", "../core/Module"], function (exports, _jam, _Sprite, _Module) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _jam2 = _interopRequireDefault(_jam);

	var _Sprite2 = _interopRequireDefault(_Sprite);

	var _Module2 = _interopRequireDefault(_Module);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// Rectangular collision detection. This is in two parts, an overlaps function
	// and a collide function.

	// Overlap returns a boolean whether two sprites (or similar) overlap
	// eachothers bounding boxes. It also takes an optional callback and if they
	// do overlap, it calls this. This is mainly useful just for collision groups.

	// Collide checks if the objects overlap, and if they do, pushes them away
	// from eachother until they no longer do. It also sets their velocities
	// and touching[Side] flags.

	// These are implemented outside of a specific object so I can easily
	// attach them to things other than sprites (like collision groups
	// or something)

	/*	SAMPLE USAGE:
 
 ** checking overlap between two objects **
 // inside an update function:
 if(player.overlaps(robot)){
 	game.remove(robot);
 };
 
 
 ** checking overlap between two groups of objects **
 robots = jam.CollisionGroup();
 bullets = jam.CollisionGroup();
 robots.add(stuff);
 bullets.add(stuff);
 
 // inside update
 // the function defined here takes a single robot and a single bullet.
 jam.Collision.overlaps(robots, bullets, function(robot, bullet){
 	robot.health -= 3;
 	game.remove(bullet);
 	bullets.remove(bullet);
 });
 
 
 ** collision response **
 platforms = jam.CollisionGroup();
 var plat = jam.Sprite(......)
 plat.immovable = true;
 platforms.add(plat);
 
 //inside update
 player.collide(platforms);
 
 */

	var Collision = {};
	Collision.overlaps = function (s1, s2, callback) {
		// Assume both are GROUPS of objects, and if they're not, make them
		// lists of a single element.
		// Comparing two lists is easier than coming up with a solution for
		// comparing list/single, single/single, single/list, list/list
		if (s1 === undefined || s2 === undefined) {
			return false;
		}
		if (s1.getChildren === undefined) {
			var g1 = [s1];
		} else {
			var g1 = s1.getChildren();
		}
		if (s2.getChildren === undefined) {
			var g2 = [s2];
		} else {
			var g2 = s2.getChildren();
		}
		var returnValue = false;
		// Now loop through the two lists (n^2 LOL) and compare everything
		// TODO: Quadtree? :P
		for (var i = 0, iMax = g1.length; i < iMax; ++i) {
			for (var j = 0, jMax = g2.length; j < jMax; ++j) {
				var x1 = g1[i].x + g1[i]._collisionOffsetX;
				var y1 = g1[i].y + g1[i]._collisionOffsetY;
				var w1 = g1[i].width + g1[i]._collisionOffsetWidth;
				var h1 = g1[i].height + g1[i]._collisionOffsetHeight;

				var x2 = g2[j].x + g2[j]._collisionOffsetX;
				var y2 = g2[j].y + g2[j]._collisionOffsetY;
				var w2 = g2[j].width + g2[j]._collisionOffsetWidth;
				var h2 = g2[j].height + g2[j]._collisionOffsetHeight;

				// Detect overlap (maybe this should be overlapSingle)
				if (x1 + w1 > x2 && y1 + h1 > y2 && x1 <= x2 + w2 && y1 <= y2 + h2) {
					if (callback !== undefined) {
						callback(g1[i], g2[j]);
					}
					returnValue = true;
				}
			}
		}
		return returnValue;
	};

	// This function operates exactly like above, but uses collideSingle
	Collision.collide = function (s1, s2) {
		if (s1 === undefined || s2 === undefined) {
			return false;
		}
		if (s1.getChildren === undefined) {
			var g1 = [s1];
		} else {
			var g1 = s1.getChildren();
		}
		if (s2.getChildren === undefined) {
			var g2 = [s2];
		} else {
			var g2 = s2.getChildren();
		}
		var returnValue = false;
		for (var i = 0, iMax = g1.length; i < iMax; ++i) {
			for (var j = 0, jMax = g2.length; j < jMax; ++j) {
				_jam2.default.Collision.collideSingle(g1[i], g2[j]);
			}
		}
	};

	// Called to collide a pair of sprites.
	Collision.collideSingle = function (self, other) {
		if (!self.overlaps(other)) {
			return false;
		}

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
			return _jam2.default.Collision.overlaps(g, other, callback);
		};

		g.collide = function (other) {
			return _jam2.default.Collision.collide(g, other);
		};

		return g;
	};

	var lib;
	exports.default = lib = new _Module2.default();

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
			return _jam2.default.Collision.overlaps(this, other, callback);
		};
		this.collide = function (other) {
			return _jam2.default.Collision.collide(this, other);
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
});