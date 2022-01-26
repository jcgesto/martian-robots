import { Position } from "./Position";
import { Scent } from "./Scent";
import { Orientation } from "./Orientation";

export class Robot {

  isLost: boolean = false;
  position: Position;
  orientation: Orientation;
  scents: Scent[];
  upperRightCorner: Position; 

  constructor (
    upperRightCorner: Position,
    position: Position,
    orientation: Orientation,
    scents: Scent[],
    isLost: boolean = false
  ) {
    this.upperRightCorner = upperRightCorner
    this.position = position
    this.orientation = orientation
    this.scents = scents
    this.isLost = isLost
  }

  toString (): string {
    // 3 3 N LOST
    return `${this.position.x} ${this.position.y} ${this.orientation}${this.isLost ? ' LOST' : ''}`
  }
}