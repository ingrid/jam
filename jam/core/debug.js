import System from "./system";

var LOG_TIMEOUT = 8;
var old_log;

export default class DebugSystem extends System{
  constructor(g){
    super();
    old_log = console.log;
    window.setTimeout(function(){
      console.log("Disabling console.log");
      console.log = function(){};
    }, LOG_TIMEOUT * 1000);
  }

  update(e_list, game){
    game._context.fillStyle = "rgba(255, 0, 0, 1)";
    game._context.strokeStyle = "rgba(255, 0, 0, 1)";
    super.update(e_list, game);
  }

  update_entity(e, game){
    // It would be nice to store this on systems but we're just doing a big
    // switch here for now.
    if (e.systems.includes('physics')){
      // Should actually be collision, we'll deal with that later.
      var ctx = game._context;
      var i, v, n;
      ctx.beginPath();
      var b = e.body.transform(e.position);
      for (i=0; i<b.vertices.length; i++){
        v = b.vertices[i];
        n = b.vertices[i+1==b.vertices.length?0:i+1];
        ctx.fillRect(v.x-1, v.y-1, 3, 3);

        // TODO: Remove reduntant moveTos
        ctx.moveTo(v.x, v.y);
        ctx.lineTo(n.x, n.y);
      }
      ctx.stroke();
    }
  }
}
