var Sound = function() {
  // Play just calls the audio tag play function, or loads it first
  // then plays it.
  var play = function play(url) {
    var sound;
    if (jam.cache[url] === undefined) {
      sound = jam.load(url, function (obj) {
        obj.play();
      });
    } else {
      sound = jam.cache[url];
      sound.play();
    }
    return sound;
  };

  return {
    play: play
  };
}();


export default Sound;
