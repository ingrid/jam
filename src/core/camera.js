import Vector from "./vector";

export default class camera{
  constructor(w, h) {
    this.scroll = new Vector(0, 0);
    this.size = new Vector(w, h);
    this.follow = null;
    this.update = this.update.bind(this);
  }

  update(elapsed) {
    // Follow code here.
    if (this.follow !== null) {
      this.scroll.x = this.follow.x - this.size.x / 2;
      this.scroll.y = this.follow.y - this.size.y / 2;
    };
  }
}
