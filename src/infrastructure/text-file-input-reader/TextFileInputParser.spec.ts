import { InputData } from "../../domain/InputData"
import { Instruction } from "../../domain/Instruction"
import { Orientation } from "../../domain/Orientation"
import { TextFileInputParser } from "./TextFileInputParser"

describe('TextFileInputReader', () => {

  const textFileInputReader = new TextFileInputParser()

  describe('parse', () => {
    it('Should return the expected result data', () => {
      const content = `5 3
1 1 E 
RFR
  
3 2 N 
LF
  
0 3 W
FFF`

      const result = textFileInputReader.parse(content)
      const expected: InputData = {
        upperRightCorner: {
          x: 5,
          y: 3
        },
        robotSequences: [
          {
            initialOrientation: Orientation.EAST,
            initialPosition: {
              x: 1,
              y: 1
            },
            instructions: [
              Instruction.RIGHT,
              Instruction.FORWARD,
              Instruction.RIGHT
            ]
          },
          {
            initialOrientation: Orientation.NORTH,
            initialPosition: {
              x: 3,
              y: 2
            },
            instructions: [
              Instruction.LEFT,
              Instruction.FORWARD
            ]
          },
          {
            initialOrientation: Orientation.WEST,
            initialPosition: {
              x: 0,
              y: 3
            },
            instructions: [
              Instruction.FORWARD,
              Instruction.FORWARD,
              Instruction.FORWARD
            ]
          }
        ]
      }
      expect(result).toEqual(expected)
    })
  })

  describe('parseInitialPosition', () => {
    it('Should return the expected initial position', () => {
      expect(textFileInputReader.parsePosition('5 3')).toEqual({
        x: 5,
        y: 3
      })
    }) 
  })

  describe('parseInstruction', () => {
    it('Should return the expected instruction', () => {
      expect(textFileInputReader.parseInstruction('F')).toBe(Instruction.FORWARD)
    })
  
    it('Should throw if the string is not valid', () => {
      function parseInvalidInstruction() {
        textFileInputReader.parseInstruction('o')
      }
      expect(parseInvalidInstruction).toThrow()
    })  
  })

  describe('parseOrientation', () => {
    it('Should return the expected instruction', () => {
      expect(textFileInputReader.parseOrientation('N')).toBe(Orientation.NORTH)
    })
  
    it('Should throw if the orientation is not valid', () => {
      function parseInvalidOrientation() {
        textFileInputReader.parseOrientation('o')
      }
      expect(parseInvalidOrientation).toThrow()
    })  
  })
})