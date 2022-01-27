export class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    
    if (x < 0 || x > 50 || y < 0 || y > 50) {
      throw new Error(`Position - Invalid coordinates: (${x}, ${y})`)
    }
    
    this.x = x;
    this.y = y;
  }

  toString(): string {
    return `(${this.x}, ${this.y})`
  }
}
