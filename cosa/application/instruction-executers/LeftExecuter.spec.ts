import { Orientation } from '../../domain/Orientation'
import { Position } from '../../domain/Position'
import { Robot } from '../../domain/robot'
import { LeftExecuter } from './LeftExecuter'

const leftExecuter = new LeftExecuter()

describe('LeftExecuter', () => {
  describe('execute', () => {
    it('Should change robot as expected', () => {
      const robot = new Robot(
        new Position(1, 1),
        new Position(0, 0),
        Orientation.NORTH,
        []
      )
      leftExecuter.execute(robot)
      expect(robot.orientation).toBe(Orientation.WEST)
    })

    it('Once a robot is lost it should ignore additional instructions', () => {
      const robot = new Robot(
        new Position(1, 1),
        new Position(0, 0),
        Orientation.NORTH,
        []
      )
      robot.isLost = true
      leftExecuter.execute(robot)
      expect(robot.orientation).toBe(Orientation.NORTH)
    })
  })
})