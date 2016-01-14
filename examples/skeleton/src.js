import jam from "../../js/jam";

jam.config({dataDir:"data/"});

var main = function() {
	var g = new jam.Game(320, 240, document.body, 2);

    // Add your game logic here.

	g.run();
};

var preload = function() {
    // Preload your assets here.
	jam.showPreloader(main);
};

preload();
