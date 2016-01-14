define(["exports"], function (exports) {
    "use strict";

    Object.defineProperty(exports, "__esModule", {
        value: true
    });
    var vector;

    exports.default = vector = function vector(x, y) {
        this.x = x;
        this.y = y;
    };

    vector.prototype.toString = function () {
        return "<" + this.x + ", " + this.y + ">";
    };

    vector.prototype.getLength = function () {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    };

    vector.prototype.getLengthSq = function () {
        return this.x * this.x + this.y * this.y;
    };

    vector.prototype.equals = function (v) {
        return this.x === v.x && this.y === v.y;
    };

    vector.add = function (v1, v2) {
        return new vector(v1.x + v2.x, v1.y + v2.y);
    };

    vector.sub = function (v1, v2) {
        return new vector(v1.x - v2.x, v1.y - v2.y);
    };

    vector.mul = function (v, s) {
        return new vector(v.x * s, v.y * s);
    };

    vector.div = function (v, s) {
        return new vector(v.x / s, v.y / s);
    };

    vector.compare = function (v1, v2) {
        return v1.x == v2.x && v1.y == v2.y;
    };
});