var db = {};
export default db;

db.drawBox = function(context){
  context.lineWidth = 1;
  context.strokeStyle = "rgba(255,0,0,0.6)";
  context.strokeRect(this.x, this.y, this.width, this.height);

  if( this._collisionOffsetX || this._collisionOffsetY ||
      this._collisionOffsetWidth || this._collisionOffsetHeight) {
    context.strokeStyle = "rgba(0,255,255,0.5)";
    context.strokeRect( Math.floor(this.x + this._collisionOffsetX)+0.5,
                        Math.floor(this.y + this._collisionOffsetY)+0.5,
                        this.width + this._collisionOffsetWidth,
                        this.height + this._collisionOffsetHeight);
  }
};

var levels = {
  "None": 0,
  "Warning": 1,
  "Verbose": 2
};

var log;
var logLevel = 0;

//export log = function(str, level){
//  console.log(str);
//};
