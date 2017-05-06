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

  var mtv = o[1].normalize(o[0]);

  var dir;

  var te1c = e1.body._centroid().add(e1.position);
  var te2c = e2.body._centroid().add(e2.position);

  var e1toe2 = te1c.sub(te2c);

  if (mtv.dot(e1toe2) < 0){
    // Pointing towards body 1.
    e1.position = e1.position.add(mtv.mul(-sco1));
    e2.position = e2.position.add(mtv.mul(sco2));
  }else{
    e1.position = e1.position.add(mtv.mul(sco1));
    e2.position = e2.position.add(mtv.mul(-sco2));
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
    if (overlap < 0) { return false; } // Some axis exists where they do not overlap, return.
    if (min == undefined || min[0] > overlap){
      // Store minimum for resolution.
      min = [overlap, axis];
    }
  }
  return min;
};
