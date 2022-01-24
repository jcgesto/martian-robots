import { Instruction } from "./instruction";
import { InstructionsResult } from "./instructions-result";
import { Orientation } from "./orientation";
import { Position } from "./position";
import { Scent } from "./scent";

export class Robot {

  private isLost: boolean = false

  constructor (
    private upperRightCorner: Position,
    private position: Position,
    private orientation: Orientation,
    private scents: Scent[]
  ) {}

  isOutOfBounds (upperRightCorner: Position, position: Position) {
    return position.y > upperRightCorner.y ||
           position.y < 0 ||
           position.x > upperRightCorner.x ||
           position.x < 0
  }

  isForwardAllowed (): boolean {
    return !this.scents.find(scent => {
      return scent.position.x === this.position.x &&
             scent.position.y === this.position.y &&
             scent.orientation === this.orientation
    })
  }

  forward () {

    if (this.isLost) {
      return
    }

    if (!this.isForwardAllowed()) {
      return
    }

    let newPosition: Position

    if (this.orientation === Orientation.NORTH) {
      newPosition = {
        x: this.position.x,
        y: this.position.y + 1
      }
    } else if (this.orientation === Orientation.SOUTH) {
      newPosition = {
        x: this.position.x,
        y: this.position.y - 1
      }
    } else if (this.orientation === Orientation.EAST) {
      newPosition = {
        x: this.position.x + 1,
        y: this.position.y
      }
    } else if (this.orientation === Orientation.WEST) {
      newPosition = {
        x: this.position.x - 1,
        y: this.position.y
      }
    }

    this.isLost = this.isOutOfBounds(this.upperRightCorner, newPosition)
    if (!this.isLost) {
      this.position = newPosition
    }
  }

  left () {
    if (this.orientation === Orientation.NORTH) {
      this.orientation = Orientation.WEST
    } else if (this.orientation === Orientation.SOUTH) {
      this.orientation = Orientation.EAST
    } else if (this.orientation === Orientation.EAST) {
      this.orientation = Orientation.NORTH
    } else if (this.orientation === Orientation.WEST) {
      this.orientation = Orientation.SOUTH
    }
  }

  right () {
    if (this.orientation === Orientation.NORTH) {
      this.orientation = Orientation.EAST
    } else if (this.orientation === Orientation.SOUTH) {
      this.orientation = Orientation.WEST
    } else if (this.orientation === Orientation.EAST) {
      this.orientation = Orientation.SOUTH
    } else if (this.orientation === Orientation.WEST) {
      this.orientation = Orientation.NORTH
    }
  }

  instruction (instruction: Instruction) {
    if (instruction === Instruction.FORWARD) {
      this.forward()
    } else if (instruction === Instruction.RIGHT) {
      this.right()
    } else if (instruction === Instruction.LEFT) {
      this.left()
    }
  }

  execute (instructions: Instruction[]): InstructionsResult {
    instructions.forEach(this.instruction.bind(this))
    return {
      finalPosition: this.position,
      isLost: this.isLost,
      orientation: this.orientation
    }
  }
}