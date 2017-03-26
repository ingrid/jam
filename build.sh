#!/bin/bash
if [ -z "$1" ]
then
    webpack jam/jam.js build/bundle.js --devtool source-map
    exit
fi

command=$1
if [ $command = 'jam' ]; then
    webpack jam/jam.js build/bundle.js --devtool source-map
elif [ $command = 'examples' ]; then
    webpack resources/examples/pong/src.js resources/examples/pong/js/pong.js --devtool source-map --output-public-path resources/examples/pong/js/
    webpack resources/examples/platformer/src.js resources/examples/platformer/js/platformer.js --devtool source-map --output-public-path resources/examples/platformer/js/
elif [ $command = 'tools' ]; then
    webpack resources/level_editor/src.js resources/level_editor/level_editor.js --devtool source-map
fi
