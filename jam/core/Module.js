

class Module {

  constructor() {
    this.sprite = {
      init: function init() {},
      update: undefined,
      render: undefined };
    this.game = {
      init: function init() {},
      update: undefined,
      render: undefined };

    // Default name, can be overwritten.
    this.name = "";
  }

  preLoad() {
    // Makes sure any required modules are loaded beforehand.
    // Do we need modLevel? ModGroup? Do we need hooks fod deconstruct or delete?
  }
}

export default Module;
