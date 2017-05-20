import jam from "jam/jam";
var PLAYER_WIDTH = 20;
var PLAYER_HEIGHT = 20;
var ANIM_RATE = 8;
var WALK_SPEED = 200;

export default class Player extends jam.e{
  constructor(x, y){
    super(['script',
           'physics',
           'animation',
           'render'], {
             position : new jam.v(x, y),
             body : new jam.g.Shape([new jam.v(0, 0), new jam.v(PLAYER_WIDTH, 0),
                                     new jam.v(PLAYER_WIDTH, PLAYER_HEIGHT), new jam.v(0, PLAYER_HEIGHT)]),
             velocity : new jam.v(0, 0),
             image : null,
             visible : true
           });
    var anim_base = {src : jam.cache._cache['./data/player.png'],
                     size : new jam.v(64, 64),
                     padding : new jam.v(0, 0),
                     offset : new jam.v(0, 0),
                     wrap : 0};
    this.animations = {'idle_up' : new jam.Animation(anim_base, [3], 0),
                       'idle_down' : new jam.Animation(anim_base, [0], 0),
                       'idle_left' : new jam.Animation(anim_base, [6], 0),
                       'idle_right' : new jam.Animation(anim_base, [9], 0),
                       'walk_up' : new jam.Animation(anim_base, [4,3,5,3], ANIM_RATE),
                       'walk_down' : new jam.Animation(anim_base, [1,0,2,0], ANIM_RATE),
                       'walk_left' : new jam.Animation(anim_base, [7,6,8,6], ANIM_RATE),
                       'walk_right' : new jam.Animation(anim_base, [10,9,11,9], ANIM_RATE)};
    this.current_animation = 'idle_down';
    this.dir = 'down';
  }

  update(e){
    this.velocity.x = 0;
    this.velocity.y = 0;
    if (jam.Input.buttonDown('UP')){
      this.velocity.y = -WALK_SPEED;
      this.dir = 'up';
    }else if (jam.Input.buttonDown('DOWN')){
      this.velocity.y = WALK_SPEED;
      this.dir = 'down';
    }else if (jam.Input.buttonDown('LEFT')){
      this.velocity.x = -WALK_SPEED;
      this.dir = 'left';
    }else if (jam.Input.buttonDown('RIGHT')){
      this.velocity.x = WALK_SPEED;
      this.dir = 'right';
    }
    if (this.velocity.equals({x:0,y:0})){
      this.current_animation = 'idle_' + this.dir;
    }else{
      this.current_animation = 'walk_' + this.dir;
    }
  }
}
