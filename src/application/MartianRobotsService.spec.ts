import { Orientation } from "../domain/Orientation"
import { Position } from "../domain/Position"
import { RobotSequence } from "../domain/RobotSequence"
import { MartianRobotsService } from "./MartianRobotsService"
import { Instruction } from '../domain/Instruction'
import { Robot } from "../domain/robot"

describe('MartianRobotsService', () => {
  
  const martianRobotsService = new MartianRobotsService()
  
  describe('execute', () => {
    it('Should return the expected result', () => {
      const upperRightCorner = new Position(5, 5)
      const robotSequences: RobotSequence[] = [
        {
          initialOrientation: Orientation.NORTH,
          initialPosition: new Position(0, 0),
          instructions: [
            Instruction.FORWARD,
            Instruction.RIGHT,
            Instruction.FORWARD
          ]
        },
        {
          initialOrientation: Orientation.EAST,
          initialPosition: new Position(2, 3),
          instructions: [
            Instruction.FORWARD,
            Instruction.FORWARD,
            Instruction.FORWARD
          ]
        },
        {
          initialOrientation: Orientation.NORTH,
          initialPosition: new Position(0, 5),
          instructions: [
            Instruction.FORWARD,
            Instruction.FORWARD,
            Instruction.FORWARD
          ]
        }
      ]
      const expected: Robot[] = [
        new Robot(upperRightCorner, new Position(1, 1), Orientation.EAST, [{ orientation: Orientation.NORTH, position: new Position(0, 5) }]),
        new Robot(upperRightCorner, new Position(5, 3), Orientation.EAST, [{ orientation: Orientation.NORTH, position: new Position(0, 5) }]),
        new Robot(upperRightCorner, new Position(0, 5), Orientation.NORTH, [{ orientation: Orientation.NORTH, position: new Position(0, 5) }], true)
      ]
      const result = martianRobotsService.execute(upperRightCorner, robotSequences)
      expect(result).toEqual(expected)
    })
  })
})