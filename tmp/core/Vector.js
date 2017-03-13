define(["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var Vector = function () {
    function Vector(x, y) {
      _classCallCheck(this, Vector);

      this.x = x;
      this.y = y;
    }

    // Returns a nice string representation of the vector

    _createClass(Vector, [{
      key: "toString",
      value: function toString() {
        return "<" + this.x + ", " + this.y + ">";
      }
    }, {
      key: "getLength",
      value: function getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
      }
    }, {
      key: "getLengthSq",
      value: function getLengthSq() {
        return this.x * this.x + this.y * this.y;
      }
    }, {
      key: "equals",
      value: function equals(v) {
        return this.x == v.x && this.y == v.y;
      }
    }, {
      key: "add",
      value: function add(v) {
        return Vector.add(this, v);
      }
    }, {
      key: "sub",
      value: function sub(v) {
        return Vector.sub(this, v);
      }
    }, {
      key: "mul",
      value: function mul(v) {
        return Vector.mul(this, v);
      }
    }, {
      key: "div",
      value: function div(v) {
        return Vector.divl(this, v);
      }
    }]);

    return Vector;
  }();

  exports.default = Vector;
  ;

  // Adds a vector to a vector
  Vector.add = function (v1, v2) {
    return new Vector(v1.x + v2.x, v1.y + v2.y);
  };

  // Subtracts vector 2 from vector 1
  Vector.sub = function (v1, v2) {
    return new Vector(v1.x - v2.x, v1.y - v2.y);
  };

  // Multiplies a vector by a scalar
  Vector.mul = function (v, s) {
    return new Vector(v.x * s, v.y * s);
  };

  // Divides a vector by a scalar
  Vector.div = function (v, s) {
    return new Vector(v.x / s, v.y / s);
  };

  // returns true if the components of the vectors are equal
  Vector.compare = function (v1, v2) {
    return v1.x == v2.x && v1.y == v2.y;
  };
});