import System from "./system";

// An attempted SAT collision system.
export default class CollisionSystem extends System{
  constructor(){
    super();
    this.required = ['position',
                     'angle'
                     //shape
                    ];
  }

  update(e_list, game){
  }

  update_entity(entity, game){
  }
}

CollisionSystem.overlap_single = function (e1, e2){
  var s1 = e1.shape.transform(e1.position);
  var s2 = e2.shape.transform(e2.position);

  var axes = s1.normals.concat(s2.normals);
  var i;

  for (i=0; i<axes.length; i++){
    var axis = axes[i];

    var p1 = s1.project(axis);
    var p2 = s2.project(axis);

    if (!p1.overlaps(p2)) {
      // Some axis exists where they do not overlap, return.
      return false;
    }
  }
  return true;
};
