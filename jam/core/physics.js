import System from "./system";
import v from "./vector";

// Very basic 2D movement.

export default class PhysicsSystem extends System{
  constructor(){
    super();
    this.required = ["position",
                     "velocity",
                     "acceleration"];
  }

  update_entity(e, game){
    var va = v.add,
        vm = v.mul;
    e.velocity = va(e.velocity, vm(e.acceleration, game.elapsed));

    // Add to position based on velocity
    e.position.x += e.velocity.x * game.elapsed;
    e.position.y += e.velocity.y * game.elapsed;
  }
}
