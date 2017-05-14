var lib;
// This is one of the parts of jam that is global now but should be changed later.

export default lib = {};
lib._cache = [];
lib.data_dir = "";
// Maybe later we can make separate image and audio prefixes too.

class SubCache{
  // Breaks down caching progress if you want to load in chunks, perhaps load between levels.
  constructor(){
    this.total = 0; // Total objects to preload.
    this.current = 0; // Number of objects that completely loaded.
    this.start_time = new Date().getTime();
  }

  preload(url){
    console.log("Preloading: " + url);
    this.total++;
    lib.load(url, function (obj){
      this.current++;
      console.log("Finished preloading: " + url);
    }.bind(this));
  }

  _draw_preloader(can, callback){
    var ctx = can.getContext("2d");
    if (this.current < this.total){
      window.setTimeout(function(){
        this._draw_preloader(ctx, callback);
      }, 50);
      ctx.clearRect(0, 0, can.width, can.height);
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fillRect(can.width/2 - 102, can.height/2 - 12, 204, 24);
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.fillRect(ctx.canvas.width/2 - 100, ctx.canvas.height/2 - 10, 200, 20);
      ctx.fillStyle = "rgba(0,255,128,1)";
      ctx.fillRect(ctx.canvas.width/2 - 100, ctx.canvas.height/2 - 10,
                   this.current * 200.0 / this.total, 20);
    }else{
      ctx.clearRect(0, 0, can.width, can.height);
      lib.reset_subcache();
      callback();
    }
  }
}

lib.reset_subcache = function(){
  lib.sub_cache = new SubCache();
  lib.preload = lib.sub_cache.preload;
};
lib.reset_subcache();
lib.show_preloader = function(can, callback){
    lib.sub_cache._draw_preloader(can, callback);
};
lib.load = function(url, onload){
  url = lib.data_dir + url;
  if (lib._cache[url] !== undefined) {
    // This asset has already been loaded.
    onload(lib._cache[url]);
    return;
  }

  onload = onload || function (){};

  var obj;
  if (url.match(/\.(jpeg|jpg|png|gif)(\?.*)?$/) || url.match(/^data:image/)){
    // image
    obj = new Image(url);
    obj.onload = function (){
      onload(obj);
    };
    obj.src = url;
    lib._cache[url] = obj;
  }else if (url.match(/\.(mp3|ogg|wav)(\?.*)?$/) || url.match(/^data:audio/)){
      // audio
    obj = new Audio();
    obj.addEventListener("loadeddata", function (){
      onload(obj);
    }, false);
    obj.src = url;
    lib._cache[url] = obj;
  }//else if (/*jam proto config object*/)){}

  return obj;
};
