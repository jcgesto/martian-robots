import { Instruction } from "./Instruction";
import { Orientation } from "./Orientation";
import { Position } from "./Position";

export type RobotSequence = {
  initialPosition: Position
  initialOrientation: Orientation,
  instructions: Instruction[]
}