// I should look into pooling for this class.

var pool = [];

export default class Vector {
  constructor(x, y){
    if (typeof x === 'string' || x instanceof String){
      var vals = x.split(",");
      x = vals[0];
      x = x.substring(1, x.length);
      x = parseInt(x);
      y = vals[1];
      y = y.substring(0, y.length-1);
      y = parseInt(y);
    }

    this.x = x || 0;
    this.y = y || 0;
  }

  // Returns a nice string representation of the vector
  toString(){
    return "<" + this.x + ", " + this.y + ">";
  }

  getLength(){
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  getLengthSq(){
    return this.x * this.x + this.y * this.y;
  }

  equals(v){
    return this.x == v.x && this.y == v.y;
  }

  add(v){
    return Vector.add(this, v);
  }

  sub(v){
    return Vector.sub(this, v);
  }

  mul(v){
    return Vector.mul(this, v);
  }

  div(v){
    return Vector.div(this, v);
  }

  floor(){
    return new Vector(Math.floor(this.x), Math.floor(this.y));
  }

  dot(v){
    return Vector.dot(this, v);
  }

  normalize(scale) {
    if (!scale){ scale = 1; }
    var norm = Math.sqrt(this.x * this.x + this.y * this.y);

    if (norm != 0) { // This is (0,0)
      return  new Vector(scale * this.x / norm,
                         scale * this.y / norm);
    }else{ return new Vector(0, 0); }
  }
}

Vector.dot = function(v1, v2){
  return (v1.x * v2.x) + (v1.y * v2.y);
};

// Adds a vector to a vector
Vector.add = function (v1, v2){
  return new Vector(v1.x + v2.x, v1.y + v2.y);
};

// Subtracts vector 2 from vector 1
Vector.sub = function (v1, v2){
  return new Vector(v1.x - v2.x, v1.y - v2.y);
};

// Multiplies a vector by a scalar
Vector.mul = function (v, s){
  return new Vector(v.x * s, v.y * s);
};

// Divides a vector by a scalar
Vector.div = function (v, s){
  return new Vector(v.x / s, v.y / s);
};

// returns true if the components of the vectors are equal
Vector.compare = function (v1, v2){
  return v1.x == v2.x && v1.y == v2.y;
};
