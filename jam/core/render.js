import System from "./system";

export default class RenderSystem extends System{
  constructor(){
    super();
    this.required = ['position',
                     'angle',
                     'alpha',
                     'image',
                     'facing',
                     'parallax'];
  }

  update(e_list, game){
    game._context.fillStyle = game.state.bgColor;
    game._context.fillRect(0, 0, game.width, game.height);
    super.update(e_list, game);
  }

  update_entity(entity, game){
    if (entity.image !== null && entity.visible) {
      // Avoid automatic blending if we have non-integer values
      var tx = Math.floor(entity.position.x - game.state.camera.scroll.x *
                          entity.parallax.x + entity.image.width / 2);
      var ty = Math.floor(entity.position.y - game.state.camera.scroll.y *
                          entity.parallax.y + entity.image.height / 2);
      game._context.save();

      // Set up the context transform and alpha before drawing
      game._context.translate(tx, ty);
      if (entity.angle != 0){
        // This isn't quite right.
        game._context.rotate(entity.angle * Math.PI / 180);
      }
      if (entity.alpha != 1.0){
        game._context.globalAlpha = entity.alpha;
      }
      if (entity.facing == RenderSystem.LEFT) {
        game._context.scale(-1, 1);
      }

      game._context.drawImage(entity.image.src,
                              0, 0,
                              entity.image.width, entity.image.height,
                              -entity.image.width / 2, -entity.image.height / 2,
                              entity.image.width, entity.image.height);

      game._context.restore();
    }
  }
}

RenderSystem.LEFT = 1;
RenderSystem.RIGHT = 0;
