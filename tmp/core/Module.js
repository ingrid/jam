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

  var Module = function () {
    // This class exists so we can call hooks without them being implmented.

    function Module() {
      _classCallCheck(this, Module);

      this.sprite = {
        init: function init() {},
        update: undefined,
        render: undefined };
      this.game = {
        init: function init() {},
        update: undefined,
        render: undefined };

      // Default name, can be overwritten.
      this.name = "";
    }

    _createClass(Module, [{
      key: "preLoad",
      value: function preLoad() {}
      // Makes sure any required modules are loaded beforehand.

      // Do we need modLevel? ModGroup? Do we need hooks fod deconstruct or delete?

    }]);

    return Module;
  }();

  exports.default = Module;
});