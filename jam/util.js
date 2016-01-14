define(["exports"], function (exports) {
   "use strict";

   Object.defineProperty(exports, "__esModule", {
      value: true
   });
   var lib;
   exports.default = lib = {};
   var preloadCompletedObjects = 0;
   var preloadTotalObjects = 0;
   var startTime = new Date().getTime();
   lib.cache = {};
   lib.preloaded = false;
   lib.logLevel = 0;
   lib.dataDir = "";

   lib.load = function (url, onload) {
      url = lib.dataDir + url;

      if (lib.cache[url] !== undefined) {
         onload(lib.cache[url]);
         return;
      }

      onload = onload || function () {};

      var obj;

      if (url.match(/\.(jpeg|jpg|png|gif)(\?.*)?$/)) {
         obj = new Image(url);

         obj.onload = function () {
            onload(obj);
         };

         obj.src = url;
         lib.cache[url] = obj;
      } else if (url.match(/\.(mp3|ogg|wav)(\?.*)?$/)) {
         obj = new Audio();
         obj.addEventListener("loadeddata", function () {
            onload(obj);
         }, false);
         obj.src = url;
         lib.cache[url] = obj;
      }

      return obj;
   };

   lib.preload = function (url) {
      lib.log("preloading: " + url);
      preloadTotalObjects++;
      lib.load(url, function (obj) {
         preloadCompletedObjects++;
         lib.log("finished preloading: " + url);
      });
   };

   var showPreloader = function showPreloader(context, callback) {
      if (preloadCompletedObjects < preloadTotalObjects) {
         window.setTimeout(function () {
            showPreloader(context, callback);
         }, 50);
         context.fillStyle = "rgba(0,0,0,1)";
         context.fillRect(context.canvas.width / 2 - 102, context.canvas.height / 2 - 12, 204, 24);
         context.fillStyle = "rgba(255,255,255,1)";
         context.fillRect(context.canvas.width / 2 - 100, context.canvas.height / 2 - 10, 200, 20);
         context.fillStyle = "rgba(0,255,128,1)";
         context.fillRect(context.canvas.width / 2 - 100, context.canvas.height / 2 - 10, preloadCompletedObjects * 200.0 / preloadTotalObjects, 20);
      } else {
         context.canvas.parentNode.removeChild(context.canvas);
         callback();
      }
   };

   lib.showPreloader = function (element, callback) {
      if (callback === undefined) {
         callback = element;
         element = document.body;
      }

      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      element.appendChild(canvas);
      canvas.width = element.clientWidth;
      canvas.height = element.clientHeight;
      context.width = element.clientWidth;
      context.height = element.clientHeight;
      showPreloader(context, callback);
   };

   lib.logMessages = [];

   lib.log = function (text, level) {
      level = level || 0;
      lib.logMessages.push({
         time: new Date().getTime() - startTime,
         level: level,
         message: text
      });

      if (level >= lib.logLevel) {
         console.log("[" + ((new Date().getTime() - startTime) / 1000).toFixed(3) + "] " + text);
      }
   };

   lib.isArray = function (o) {
      return Object.prototype.toString.call(o) === '[object Array]';
   };

   lib.pack = function (o) {
      if (lib.isArray(o)) {
         return o;
      } else {
         return [o];
      }
   };

   lib.mixinOn = function (o) {
      o.on = function (fnName, doFn) {
         var old = o[fnName];

         o[fnName] = function () {
            old.apply(o, arguments);
            return doFn.apply(o, arguments);
         };
      };
   };
});