import v from "./vector";

var Geometry;
export default Geometry = {};



class Line{
  constructor(v1, v2){
  }
}

class Shape{
  constructor(vertices){
    this.vertices = vertices;
    this.edges = this._edges();
    this.normals = this._normals();
  }

  _edges(){
    var i, j;
    var edges = [];
    for (i=0;i<this.vertices.length;i++){
      var this_v = this.vertices[i];
      var next_v = this.vertices[i+1==this.vertices.length?0:i+1];
      edges.push(v.sub(this_v, next_v));
    }
    return edges;
  }

  _normals(){
    var i;
    var normals = [];
    for (i=0;i<this.edges.length;i++){
      var n = new v(-this.edges[i].x, this.edges[i].y);
      normals.push(n);
    }
    return normals;
  }

  project(a){
    var min = this.vertices[0].dot(a);
    var max = min;
    var i;
    for (i=1; i<this.vertices.length; i++){
      var p = this.vertices[i].dot(a);
      if( min > p){ min = p; }
      if( max < p){ max = p; }
    }
    return new Projection(min, max);
  }

  transform(vec){
    var i;
    var vertices = [];

    for (i=0; i<this.vertices.length; i++){
      var vert = new v(this.vertices[i].x + vec.x,
                       this.vertices[i].y + vec.y);
      vertices.push(vert);
    }

    // this.edges = this._edges();
    // this.normals = this._normals();
    return new Shape(vertices);
  }

  _centroid(){
    // This is pretty loose because we only need a rough idea of center
    // for determining mtv directions.
    var i;
    var tx = 0;
    var ty = 0;
    for (i=0; i<this.vertices.length; i++){
      tx += this.vertices.x;
      ty += this.vertices.y;
    }
    return new v(tx/i, ty/i);
  }

  map(type, f){
    // Type can be vertex or corner.
  }
}

class Projection{
  constructor(min, max){
    this.min = min;
    this.max = max;
  }

  overlap(p){
    // Return overlap for MTV.
    if (this.min >= p.min && this.min <= p.max){
      return this.min - p.min;
    }
    if (this.max >= p.min && this.max <= p.max){
      return this.max - p.min;
    }

    // No overlap.
    return -1;
  }
}
Geometry.Shape = Shape;
