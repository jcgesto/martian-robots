import { Orientation } from "../../domain/Orientation";
import { Position } from "../../domain/Position";
import { Robot } from "../../domain/robot";
import { InstructionExecuter } from "./InstructionExecuter";

export class ForwardExecuter implements InstructionExecuter {

  execute(robot: Robot): Robot {

    if (robot.isLost) {
      return;
    }

    if (!this.isForwardAllowed(robot)) {
      return;
    }

    let newPosition: Position;

    if (robot.orientation === Orientation.NORTH) {
      newPosition = {
        x: robot.position.x,
        y: robot.position.y + 1
      };
    } else if (robot.orientation === Orientation.SOUTH) {
      newPosition = {
        x: robot.position.x,
        y: robot.position.y - 1
      };
    } else if (robot.orientation === Orientation.EAST) {
      newPosition = {
        x: robot.position.x + 1,
        y: robot.position.y
      };
    } else if (robot.orientation === Orientation.WEST) {
      newPosition = {
        x: robot.position.x - 1,
        y: robot.position.y
      };
    }

    robot.isLost = this.isOutOfBounds(robot.upperRightCorner, newPosition);
    if (!robot.isLost) {
      robot.position = newPosition;
    }

    return robot;
  }

  private isForwardAllowed(robot: Robot): boolean {
    return !robot.scents.find(scent => {
      return scent.position.x === robot.position.x &&
        scent.position.y === robot.position.y &&
        scent.orientation === robot.orientation;
    });
  }

  private isOutOfBounds(upperRightCorner: Position, position: Position) {
    return position.y > upperRightCorner.y ||
      position.y < 0 ||
      position.x > upperRightCorner.x ||
      position.x < 0;
  }
}
