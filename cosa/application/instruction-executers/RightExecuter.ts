import { Orientation } from "../../domain/Orientation";
import { Robot } from "../../domain/robot";
import { InstructionExecuter } from "./InstructionExecuter";

export class RightExecuter implements InstructionExecuter {

  execute(robot: Robot): Robot {

    if (robot.isLost) {
      return robot
    }

    if (robot.orientation === Orientation.NORTH) {
      robot.orientation = Orientation.EAST;
    } else if (robot.orientation === Orientation.SOUTH) {
      robot.orientation = Orientation.WEST;
    } else if (robot.orientation === Orientation.EAST) {
      robot.orientation = Orientation.SOUTH;
    } else if (robot.orientation === Orientation.WEST) {
      robot.orientation = Orientation.NORTH;
    }
    return robot;
  }
}
