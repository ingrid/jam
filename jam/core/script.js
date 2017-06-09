import System from "./system";

export default class ScriptSystem extends System{
  constructor(){
    super();
    // I'm actually not sure if update is the best component or script is the best system name.
    this.required = ['update'];
  }


  update(e_list, game){
    // This bit is a hack because systems don't have knowledge of state at the moment
    if (game.state.update != undefined){
      game.state.update(game);
    }
    super.update(e_list, game);
  }

  update_entity(entity, game){
    entity.update(game.elapsed);
  }
}
