import Game from "../core/game";

export default class PrefabGame extends Game{
  constructor(){
    this.register(['input',
                   'physics',
                   'script',
                   'animation',
                   'text',
                   'render']);
  }
}
