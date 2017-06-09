#!/bin/bash
if [ -z "$1" ]
then
    webpack jam/jam.js build/bundle.js --devtool source-map
    exit
fi

command=$1
--resolve-alias jam=$PWD/jam
if [ $command = 'jam' ]; then
    webpack jam/jam.js build/bundle.js --devtool source-map
elif [ $command = 'examples' ]; then
    #webpack resources/examples/pong/src/game.js resources/examples/pong/js/game.js --devtool source-map --output-public-path js/ --resolve-alias jam=$PWD/jam
    #webpack resources/examples/platformer/src/game.js resources/examples/platformer/js/game.js --devtool source-map --output-public-path js/ --resolve-alias jam=$PWD/jam
    #webpack resources/examples/snake/src/game.js resources/examples/snake/js/game.js --devtool source-map --output-public-path js/ --resolve-alias jam=$PWD/jam
    #webpack resources/examples/sokoban/src/game.js resources/examples/sokoban/js/game.js --devtool source-map --output-public-path js/ --resolve-alias jam=$PWD/jam
    webpack resources/examples/maze/src/game.js resources/examples/maze/js/game.js --devtool source-map --output-public-path js/ --resolve-alias jam=$PWD/jam
elif [ $command = 'tools' ]; then
    webpack resources/level_editor/src.js resources/level_editor/level_editor.js --devtool source-map
elif [ $command = 'test' ]; then
    webpack test/src/test.js test/js/test.js --devtool source-map --output-public-path js/
fi
