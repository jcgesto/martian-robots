import { Orientation } from "./orientation";
import { Position } from "./position";

export type InstructionsResult = {
  isLost: boolean,
  finalPosition: Position,
  orientation: Orientation
}