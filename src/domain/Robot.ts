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

    if (position.x > upperRightCorner.x || position.y > upperRightCorner.y) {
      throw new Error(`Robot - Robot position not valid: upper right corner ${upperRightCorner.toString()}, robot position ${position.toString()}`)
    }

    this.upperRightCorner = upperRightCorner
    this.position = position
    this.orientation = orientation
    this.scents = scents
    this.isLost = isLost
  }
}