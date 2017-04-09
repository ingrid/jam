import System from './system';

// Basic physics, may want to rename this later.
export default class MovementSystem extends System{
  comstructor(){
    super();
    this.required = ['position',
                     'velocity',
                     'acceleration'
                    ];
  }

  update_entity(e, game){
    e.velocity = e.velocity.add(e.acceleration.mul(game.elapsed));
    e.position = e.velocity.mul(game.elapsed);
  }
}
