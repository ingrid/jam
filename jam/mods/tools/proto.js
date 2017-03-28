var proto;
export default proto = {};

var color = function(r,g,b,a){
  if (arguments.length == 3 || a == undefined){
    a = 1;
  };
  //return 'rgba('+r+','+g+','+b+','+a+')';
  return 'rgb('+r+','+g+','+b+')';
};

class du {
  constructor(x, y) {
    var width = x? x : 32;
    var height = y? y : width;

    this.can = document.createElement('canvas');
    this.ctx = this.can.getContext('2d');
    this.can.width = width;
    this.can.height = height;
  }

  img() {
    var img = new Image;
    img.src = this.can.toDataURL();
    return img;
  }

  dataUrl() {
    return this.can.toDataURL();
  }
};

proto.rect = function(width, height, r, g, b, a){
  var c = color(r, g, b ,a);
  var d = new du(width, height);

  d.ctx.fillStyle = c;
  d.ctx.fillRect(0, 0, width, height);

  return d.dataUrl();
};

proto.sq = function(size, r, g, b, a){
  return proto.rect(size, size, r, g, b, a);
};

proto.cir = function(radius, r, g, b, a){
  var c = color(r, g, b ,a);
  var d = new du(radius*2);

  d.ctx.beginPath();
  d.ctx.arc(radius, radius, radius, 0, 2 * Math.PI, false);
  d.ctx.fillStyle = c;
  d.ctx.fill();

  return d.dataUrl();
};

var angle = {
  up: 0,
  down: 180,
  left: 270,
  right: 90
};

proto.tri = function(width, height, direction, r, g, b, a){
  // Isosceles
  var c = color(r, g, b ,a);
  var d;
  var hw = Math.round(width/2);
  var hh = Math.round(height/2);
  if (direction == 'up' || direction == 'down'){
    d = new du(width, height);
    d.ctx.translate(hw, hh);
  } else if (direction == 'left' || direction == 'right'){
    d = new du(height, width);
    d.ctx.translate(hh, hw);
  }
  var ang = angle[direction];
  d.ctx.rotate(ang*Math.PI/180);

  d.ctx.beginPath();
  // d.ctx.moveTo(0, height);
  // d.ctx.lineTo(Math.round(width/2), 0);
  // d.ctx.lineTo(width, height);
  d.ctx.moveTo(-hw, hh);
  d.ctx.lineTo(0, -hh);
  d.ctx.lineTo(hw, hh);

  d.ctx.fillStyle = c;
  d.ctx.fill();

  return d.dataUrl();
};
