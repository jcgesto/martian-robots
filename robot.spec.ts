import { Instruction } from "./instruction"
import { InstructionsResult } from "./instructions-result"
import { Orientation } from "./orientation"
import { Robot } from "./robot"

describe('Robot', () => {
  it('Should move as expected', () => {
    const robot = new Robot({ x: 10, y: 10}, { x: 0, y: 0 }, Orientation.NORTH, [])
    const result = robot.execute([
      Instruction.FORWARD,
      Instruction.FORWARD,
      Instruction.RIGHT,
      Instruction.FORWARD,
      Instruction.FORWARD,
      Instruction.RIGHT,
      Instruction.FORWARD,
      Instruction.FORWARD,
      Instruction.RIGHT,
      Instruction.FORWARD,
    ])
    const expected: InstructionsResult = {
      isLost: false,
      finalPosition: {
        x: 1,
        y: 0
      },
      orientation: Orientation.WEST
    }
    expect(result).toEqual(expected)
  })

  it('Should be lost and return the last known position and orientation, if it goes out of bounds', () => {
    const robot = new Robot({ x: 2, y: 2 }, { x: 0, y: 0 }, Orientation.NORTH, [])
    const result = robot.execute([Instruction.FORWARD, Instruction.FORWARD, Instruction.FORWARD])
    const expected: InstructionsResult = {
      isLost: true,
      finalPosition: {
        x: 0,
        y: 2
      },
      orientation: Orientation.NORTH
    }
    expect(result).toEqual(expected)
  })

  it('Should ignore an instruction if a robot was previously lost in the same position', () => {
    const robot = new Robot(
      { x: 2, y: 2 },
      { x: 0, y: 0 },
      Orientation.NORTH,
      [
        {
          orientation: Orientation.NORTH,
          position: {
            x: 0,
            y: 2
          }
        }
      ]
    )
    const result = robot.execute([Instruction.FORWARD, Instruction.FORWARD, Instruction.FORWARD, Instruction.FORWARD, Instruction.FORWARD])
    const expected: InstructionsResult = {
      isLost: false,
      finalPosition: {
        x: 0,
        y: 2
      },
      orientation: Orientation.NORTH
    }
    expect(result).toEqual(expected)
  })
})