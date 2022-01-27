import { Orientation } from "../../domain/Orientation"
import { Position } from "../../domain/Position"
import { Robot } from "../../domain/Robot"
import { OutputTextTransformer } from "./OutputTextTransformer"

describe('OutputTextTransformer', () => {
  
  const outputTextTransformer = new OutputTextTransformer()

  describe('toText', () => {

    it('Should return the expected string', () => {
      const expected = `1 1 E
3 3 N LOST
2 3 S`

      const upperRightCorner = new Position(5, 5)
      const input: Robot[] = [
        new Robot(upperRightCorner, new Position(1, 1), Orientation.EAST, []),
        new Robot(upperRightCorner, new Position(3, 3), Orientation.NORTH, [], true),
        new Robot(upperRightCorner, new Position(2, 3), Orientation.SOUTH, [])
      ]
      const output = outputTextTransformer.toText(input)
      expect(output).toBe(expected)
    })
  })
})