import System from "./system";

export default class ScriptSystem extends System{
  constructor(){
    super();
    // I'm actually not sure if update is the best component or script is the best system name.
    this.required = ['update'];
  }

  update_entity(entity, game){
    entity.update(game.elapsed);
  }
}
