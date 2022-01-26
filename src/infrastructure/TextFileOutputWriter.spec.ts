import { Orientation } from "../domain/Orientation"
import { Position } from "../domain/Position"
import { Robot } from "../domain/robot"
import { TextFileOutputWriter } from "./TextFileOutputWriter"

describe('TextFileOutputWriter', () => {
  describe('write', () => {
    it('Should return the expected string', () => {
      const expected = `1 1 E
3 3 N LOST
2 3 S`
      let output = ''
      const fs = {
        writeFile: (_, content) => {
          output = content
        }
      }
      const textFileInputReader = new TextFileOutputWriter('fake.txt', fs)

      const upperRightCorner = new Position(5, 5)
      const input: Robot[] = [
        new Robot(upperRightCorner, new Position(1, 1), Orientation.EAST, []),
        new Robot(upperRightCorner, new Position(3, 3), Orientation.NORTH, [], true),
        new Robot(upperRightCorner, new Position(2, 3), Orientation.SOUTH, [])
      ]
      textFileInputReader.write(input)
      expect(output).toBe(expected)
    })
  })
})