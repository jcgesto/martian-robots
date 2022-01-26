
export class Position {
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  static fromString(string: string): Position {
    const array = string.split(/ /g);
    return {
      x: Number(array[0]),
      y: Number(array[2])
    };
  }

  toString(): string {
    return `x:${this.x}, y:${this.y}`;
  }
}
