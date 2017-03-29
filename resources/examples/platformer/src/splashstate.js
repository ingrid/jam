import proto from "../../../../jam/mods/tools/proto";
import jam from "../../../../jam/jam";
import PlayState from './playstate';

export default class SplashState extends jam.State{
  constructor(game){
    super();

    var instructions = [
      "arrow keys to move",
      "1, 2, and 3 to change color",
      "e to erase"
    ];

    var i, t, b;
    var x = 20;
    var y = 20;
    for (i=0;i<instructions.length;i++){
      b = new jam.Sprite(x, y);
      b.setImage(proto.tri(18, 18, 'right', 240, 56, 124), 18, 18);
      this.add(b);

      t = new jam.Text(x + 20, y);
      t.text = instructions[i];
      t.font = '20px Aerial';
      t.color = 'rgb(0, 0, 0)';
      this.add(t);

      y += 20;
    }

    window.setTimeout(function(){
      game.set_state(new PlayState(game));
    // }, 2000);
    }, 50);
  }
}
