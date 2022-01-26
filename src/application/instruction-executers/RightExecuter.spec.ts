import { Orientation } from "../../domain/Orientation"
import { Position } from "../../domain/Position"
import { Robot } from "../../domain/robot"
import { RightExecuter } from './RightExecuter'

const rightExecuter = new RightExecuter()

describe('RightExecuter', () => {
  describe('execute', () => {
    it('Should change robot as expected', () => {
      const robot = new Robot(
        new Position(1, 1),
        new Position(0, 0),
        Orientation.NORTH,
        []
      )
      rightExecuter.execute(robot)
      expect(robot.orientation).toBe(Orientation.EAST)
    })

    it('Once a robot is lost it should ignore additional instructions', () => {
      const robot = new Robot(
        new Position(1, 1),
        new Position(0, 0),
        Orientation.NORTH,
        []
      )
      robot.isLost = true
      rightExecuter.execute(robot)
      expect(robot.orientation).toBe(Orientation.NORTH)
    })
  })
})