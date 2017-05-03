import System from "./system";

// An attempted SAT collision system.
export default class CollisionSystem extends System{
  constructor(){
    super();
    this.required = ['position',
                     'angle',
                     'body'];
  }

  update(e_list, game){
  }

  update_entity(entity, game){
  }
}

CollisionSystem.collide_single = function(e1, e2){
  // Uses direct placement to rectify collisions.
  var o = CollisionSystem.overlap_single(e1, e2);
  if (o == false){ return false; }

  if (e1.immovable & e2.immovable){ return; }

  var sco1, sco2; // Static coefficients.
  if (e1.immovable) { sco1 = 0.0; sco2 = 1.0; }
  else if (e2.immovable) { sco1 = 1.0; sco2 = 0.0; }
  else { sco1 = 0.5; sco2 = 0.5; }

  var mtv = o[1].normalize(o[0] * sco1);

  var dir;
  if (mtv.dot(e1.body._centroid()) > 0){
    // Pointing towards body 1.
    e1.position.add(mtv.mul(-1));
    e2.position.add(mtv);
  }else{
    e1.position.add(mtv);
    e2.position.add(mtv.mul(-1));
  }

  return true;
};

CollisionSystem.overlap_single = function (e1, e2){
  var s1 = e1.body.transform(e1.position);
  var s2 = e2.body.transform(e2.position);

  var axes = s1.normals.concat(s2.normals);
  var i;
  var min = undefined;
  for (i=0; i<axes.length; i++){
    var axis = axes[i];

    var p1 = s1.project(axis);
    var p2 = s2.project(axis);
    var overlap = p1.overlap(p2);
    if (overlap < 0) {
      // Some axis exists where they do not overlap, return.
      return false;
    }
    if (min == undefined || min > overlap){
      min = [overlap, axis];
    }
  }
  return min;
};
