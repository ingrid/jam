var lib;
export default lib = {};

lib.mixinOn = function (o) {
  o.on = function (fnName, doFn) {
    var old = o[fnName];
    o[fnName] = function () {
      old.apply(o, arguments);
      return doFn.apply(o, arguments);
    };
  };
};
