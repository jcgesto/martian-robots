import { Orientation } from "../../domain/Orientation"
import { Position } from "../../domain/Position"
import { Robot } from "../../domain/robot"
import { ForwardExecuter } from './ForwardExecuter'

const forwardExecuter = new ForwardExecuter()

describe('ForwardExecuter', () => {
  describe('execute', () => {
    it('Should change robot as expected', () => {
      const robot = new Robot(
        new Position(2, 2),
        new Position(0, 0),
        Orientation.NORTH,
        []
      )
      forwardExecuter.execute(robot)
      expect(robot.position).toEqual(new Position(0, 1))
    })

    it('Should set isLost as expected', () => {
      const robot = new Robot(
        new Position(1, 1),
        new Position(0, 0),
        Orientation.NORTH,
        []
      )
      forwardExecuter.execute(robot)
      forwardExecuter.execute(robot)
      expect(robot.isLost).toBe(true)
    })

    it('Once a robot is lost it should ignore additional instructions', () => {
      const robot = new Robot(
        new Position(1, 1),
        new Position(0, 0),
        Orientation.NORTH,
        []
      )
      robot.isLost = true
      forwardExecuter.execute(robot)
      expect(robot.position).toEqual(new Position(0, 0))
    })

    it('Should ignore a forward instruction if a robot was lost on the same position and orientation', () => {
      const robot = new Robot(
        new Position(1, 1),
        new Position(1, 1),
        Orientation.NORTH,
        [
          {
            orientation: Orientation.NORTH,
            position: new Position(1, 1)
          }
        ]
      )
      forwardExecuter.execute(robot)
      expect(robot.position).toEqual(new Position(1, 1))
    })

    it('Should not ignore a forward instruction if a robot was lost on the same position but different orientation', () => {
      const robot = new Robot(
        new Position(1, 1),
        new Position(1, 1),
        Orientation.EAST,
        [
          {
            orientation: Orientation.NORTH,
            position: new Position(1, 1)
          }
        ]
      )
      forwardExecuter.execute(robot)
      expect(robot.isLost).toBe(true)
    })
  })
})