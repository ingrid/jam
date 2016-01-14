define(["../../js/jam"], function (_jam) {
    "use strict";

    var _jam2 = _interopRequireDefault(_jam);

    function _interopRequireDefault(obj) {
        return obj && obj.__esModule ? obj : {
            default: obj
        };
    }

    _jam2.default.config({
        dataDir: "data/"
    });

    var main = function main() {
        var level = "1,0,0,0,0,0,0,1\n" + "1,0,0,0,0,0,0,1\n" + "1,0,0,0,0,0,1,1\n" + "1,0,0,0,0,0,0,1\n" + "1,1,0,0,0,0,0,1\n" + "1,0,0,0,0,0,0,1\n" + "1,0,0,0,0,0,0,1\n" + "1,1,1,1,1,1,1,1\n";
        var g = new _jam2.default.Game(320, 240, document.body, 2);
        var tm = new _jam2.default.TileMap(32, "tiles.png");
        tm.x = 20;
        tm.y = 10;
        tm.loadCSV(level);
        var scene = g.root.scene;
        scene.add(tm);
        var guy = new _jam2.default.Sprite(90, 0);
        guy.walk = new _jam2.default.Sprite.Animation([0, 1, 2, 3], 8, 0, 0, function () {});
        guy.idle = new _jam2.default.Sprite.Animation([0], 0);
        guy.setImage("player_red.png", 16, 17);
        scene.add(guy);
        guy.acceleration.y = 250;
        guy.on("update", function (dt) {
            _jam2.default.Rect.collide(guy, tm);

            if (_jam2.default.Input.down("LEFT")) {
                guy.velocity.x = -50;
                guy.playAnimation(guy.walk);
                guy.facing = _jam2.default.Sprite.LEFT;
            } else if (_jam2.default.Input.down("RIGHT")) {
                guy.velocity.x = 50;
                guy.playAnimation(guy.walk);
                guy.facing = _jam2.default.Sprite.RIGHT;
            } else {
                guy.velocity.x = 0;
                guy.playAnimation(guy.idle);
            }

            if (_jam2.default.Input.justPressed("UP")) {
                guy.velocity.y = -100;

                _jam2.default.Sound.play("footstep1.mp3");
            }
        });
        g.root.on("update", function () {
            if (_jam2.default.Input.justPressed("MOUSE_LEFT")) {
                console.log([_jam2.default.Input.mouse.x, _jam2.default.Input.mouse.y]);
            }
        });
        g.run();
    };

    var preload = function preload() {
        _jam2.default.preload("image.png");

        _jam2.default.preload("tiles.png");

        _jam2.default.preload("player_red.png");

        _jam2.default.preload("footstep1.mp3");

        _jam2.default.showPreloader(main);
    };

    preload();
});
