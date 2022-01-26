import { Robot } from "../../domain/robot";

export interface InstructionExecuter {
  execute (robot: Robot): Robot
}