class Cell {
  constructor(x, y, alive) {
    this.x = x;
    this.y = y;
    this.alive = alive;
  }

  createElement() {
    var element = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    element.setAttributeNS(null, 'x', this.x);
    element.setAttributeNS(null, 'y', this.y);
    element.setAttributeNS(null, 'width', 1);
    element.setAttributeNS(null, 'height', 1);
    element.setAttributeNS(null, 'fill', this.alive ? 'white' : 'gray');

    return element;
  }
}

export default Cell;
