export default class Vector {
  constructor(x, y){
    this.x = x;
    this.y = y;
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

  dot(v){
    return Vector.dot(this, v);
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
