import { Position } from "../domain/Position"
import { Robot } from "../domain/robot"
import { RobotSequence } from "../domain/RobotSequence"
import { Scent } from "../domain/Scent"
import { InstructionExecuterFactory } from './instruction-executers/InstructionExecuterFactory'

export class MartianRobotsService {
  
  constructor() {}

  execute (upperRightCorner: Position, robotSequences: RobotSequence[]): Robot[] {
    const scents: Scent[] = []
    const result: Robot[] = []
    robotSequences.forEach(robotSequence => {
      const {
        initialPosition,
        initialOrientation,
        instructions
      } = robotSequence
      const robot = new Robot(upperRightCorner, initialPosition, initialOrientation, scents)
      instructions.forEach(instruction => {
        InstructionExecuterFactory.getInstance(instruction).execute(robot)
      })
      if (robot.isLost) {
        scents.push({
          orientation: robot.orientation,
          position: robot.position
        })
      }
      result.push(robot)
    })
    return result
  }
}