import Cell from './Cell';

class Universe {
  cells = [];

  constructor() {
    this.seed();
  }

  size() {
    var universe = document.getElementById('app');

    var scale = 8;
    var width = Math.round(window.innerWidth / scale);
    var height = Math.round(window.innerHeight / scale);
    var minX = 0 - Math.round(width / 2);
    var minY = 0 - Math.round(height / 2);

    universe.setAttribute('viewBox', `${minX} ${minY} ${width} ${height}`);
  }

  seed() {
    for (var x = -32; x < 32; x++) {
      for (var y = -32; y < 32; y++) {
        this.cells.push(
          new Cell(x, y, Math.random() > .5)
        );
      }
    }
  }

  draw() {
    var universe = document.getElementById('app');

    universe.innerHTML = '';

    this.cells.forEach(cell => {
      universe.appendChild(cell.createElement())
    });
  }

  tick() {
    this.createDeadCells();

    var cells = [];

    this.cells.forEach(cell => {
      if (this.fate(cell)) {
        cells.push(new Cell(cell.x, cell.y, true));
      }
    });

    this.cells = cells;
  }

  fate(cell) {
    var neighbours = this.neighbours(cell).length;

    return (
      (cell.alive && (neighbours === 2 || neighbours === 3)) ||
      (! cell.alive && neighbours === 3)
    );
  }

  neighbours(cell) {
    return this.cells.filter(neighbour => {
      if (! neighbour.alive) {
        return false;
      }

      if (neighbour.x === cell.x && neighbour.y === cell.y) {
        return false;
      }

      return (
        neighbour.x >= cell.x - 1 &&
        neighbour.y >= cell.y - 1 &&
        neighbour.x <= cell.x + 1 &&
        neighbour.y <= cell.y + 1
      );
    });
  }

  findOrCreateCell(x, y) {
    var cell = this.cells.find(cell => cell.x === x && cell.y === y);

    if (cell === undefined) {
      cell = new Cell(x, y, false);
      this.cells.push(cell);
    }

    return cell;
  }

  createDeadCells() {
    this.cells.forEach(cell => {
      this.findOrCreateCell(cell.x - 1, cell.y - 1); // Top left
      this.findOrCreateCell(cell.x, cell.y - 1); // Top
      this.findOrCreateCell(cell.x + 1, cell.y - 1); // Top right
      this.findOrCreateCell(cell.x - 1, cell.y); // Left
      this.findOrCreateCell(cell.x + 1, cell.y); // Right
      this.findOrCreateCell(cell.x - 1, cell.y + 1); // Bottom left
      this.findOrCreateCell(cell.x, cell.y + 1); // Bottom
      this.findOrCreateCell(cell.x + 1, cell.y + 1); // Bottom right
    });
  }
}

export default Universe;
