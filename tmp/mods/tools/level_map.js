define(["../../jam"], function (_jam) {
	"use strict";

	var _jam2 = _interopRequireDefault(_jam);

	function _interopRequireDefault(obj) {
		return obj && obj.__esModule ? obj : {
			default: obj
		};
	}

	// LevelMap is a grid of tiles, for fast and simple level development
	// Handles rendering the portion of the map which is visible and collisions
	// Useful for platformers or RPGs, and other things probably

	_jam2.default.LevelMap = function (tilesize, w, h, image, indices, padding) {
		if (padding == undefined) {
			padding = { x: 1,
				y: 0 };
		}
		var self = _jam2.default.CollisionGroup();
		self._layer = 0;
		self.tiles = [];
		self.tilesize = tilesize;
		self.indices = indices;

		// The LevelMap should function like a collisongroup for tiles.
		self.tileCollisionGroup = _jam2.default.CollisionGroup();
		self.image = null;
		// We have to pretend no image has been given (so it stays null) until it
		// is completely loaded. Otherwise we'd try to render it and get DOM errs
		var tempImage = new Image();
		tempImage.onload = function () {
			self.image = tempImage;
		};
		tempImage.src = image;

		self.update = function () {};

		// We want to pretend this is like a Sprite, where we can just call collide
		// on it instead of worrying about how that works internally. So, we just
		// set its collide and overlaps to its collisionGroup's functions
		self.collide = self.tileCollisionGroup.collide;
		self.overlaps = self.tileCollisionGroup.overlaps;
		self.getChildren = self.tileCollisionGroup.getChildren;

		// Render each tile if it is visible
		self.render = function (context, camera) {
			// Figure out the minimum and maximum tiles horizontally
			var x1 = camera.scroll.x;
			var x2 = camera.scroll.x + camera.size.x;
			x1 = Math.floor(x1 / self.tilesize);
			x2 = Math.floor(x2 / self.tilesize);

			// And the same vertically
			var y1 = camera.scroll.y;
			var y2 = camera.scroll.y + camera.size.y;
			y1 = Math.floor(y1 / self.tilesize);
			y2 = Math.floor(y2 / self.tilesize);

			// And only render the ones that are on-screen
			for (var y = Math.max(0, y1); y < Math.min(y2 + 1, self.height); ++y) {
				for (var x = Math.max(0, x1); x < Math.min(x2 + 1, self.width); ++x) {
					var t = self.tiles[y][x];
					if (t !== null && self.image) {
						var dx = x * self.tilesize - Math.floor(camera.scroll.x);
						var dy = y * self.tilesize - Math.floor(camera.scroll.y);

						// ugh.
						context.drawImage(self.image, t.imageIndex * self.tilesize, 0, self.tilesize, self.tilesize, dx, // Quick fix for render blur on non-interger numbers.
						dy, self.tilesize, self.tilesize);
					}
				}
			}
		};

		// Put a tile at a position
		self.put = function (ti, x, y) {
			// If there's a function callback for this tileindex, call it.
			// But usually just place the tile.
			if (!indices || indices[ti] === undefined) {
				var t = _jam2.default.LevelMap.Tile(x, y, tilesize, tilesize, ti, true);
				if (self.tiles[y][x] !== null) {
					self.tileCollisionGroup.remove(self.tiles[y][x]);
				}
				self.tiles[y][x] = t;
				if (t.collides) {
					self.tileCollisionGroup.add(t);
				}
			} else {
				indices[ti](self, x, y);
			}
		};

		self.putAtPixel = function (ti, x, y) {
			self.put(ti, Math.floor(x / self.tilesize), Math.floor(y / self.tilesize));
		};

		// Clear the tilemap
		self.reset = function (w, h) {
			self.tileCollisionGroup.children = [];
			self.tiles = [];
			self.width = w;
			self.height = h;
			for (var y = 0; y < h; ++y) {
				self.tiles.push([]);
				for (var x = 0; x < w; ++x) {
					self.tiles[y].push(null);
				}
			}
		};

		self.serialize = function () {
			var json = "map_data = [\n";
			for (var y in self.tiles) {
				json += "[";
				for (var x in self.tiles[y]) {
					var i = 0;
					if (self.tiles[y][x] !== null) {
						i = self.tiles[y][x].imageIndex;
					}
					json += i + (x < self.tiles[y].length - 1 ? "," : "");
				}
				json += "]" + (y < self.tiles.length - 1 ? "\n" : "");
			}
			json += "];";
			return json;
		};

		self.reset(w, h);

		return self;
	};

	// A Tile object is basically a Sprite with less stuff in it. It just needs to
	// be able to draw and collide.
	_jam2.default.LevelMap.Tile = function (x, y, w, h, imageIndex, collide) {
		var self = {};
		self.x = x * w;
		self.y = y * h;
		self.width = w;
		self.height = h;
		self._collisionOffsetX = 0;
		self._collisionOffsetY = 0;
		self._collisionOffsetWidth = 0;
		self._collisionOffsetHeight = 0;
		self.velocity = { x: 0, y: 0 };
		self.collides = collide === undefined ? true : collide;
		self.overlaps = function (other, callback) {
			return _jam2.default.Collision.overlaps(self, other, callback);
		};
		self.collide = function (other) {
			return _jam2.default.Collision.collide(self, other);
		};
		self.immovable = true;
		self.imageIndex = imageIndex;
		return self;
	};

	// loadTileMap takes a square size for the tiles, a string of CSV map data,
	// a sprite sheet for the tiles, and an optional table of functions to call
	// upon seeing a tile with a given index. It then creates a map be reading the
	// CSV data and placing the appropriate tiles.
	_jam2.default.LevelMap.loadTileMap = function (tilesize, data, tilestrip, indices) {
		// Parse CSV (commas between cells, newlines between rows)
		var h = data.length;
		if (h === 0) {
			return;
		}
		var w = data[0].length;
		if (w === 0) {
			return;
		}
		_jam2.default.log("tilemap:" + w + "x" + h);

		var map = _jam2.default.LevelMap(tilesize, w, h, tilestrip, indices);

		for (var y = 0; y < h; ++y) {
			var cells = data[y];
			for (var x = 0; x < w; ++x) {
				var index = cells[x];
				if (index !== 0) // 0 special case for "no tile thanks"
					{
						map.put(index, x, y);
					}
			}
		}
		return map;
	};
});