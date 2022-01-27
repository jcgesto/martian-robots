import { InputData } from "../../domain/InputData";
import { Instruction } from "../../domain/Instruction";
import { Orientation } from "../../domain/Orientation";
import { Position } from "../../domain/Position";
import { RobotSequence } from "../../domain/RobotSequence";

const MAX_ROBOT_INSTRUCTIONS = 100

export class TextFileInputParser {

  parse(content: string): InputData {
    const array = content.replace(/\r/g, '').split('\n');
    const upperRightCorner: Position = this.parsePosition(array[0]);

    array.splice(0, 1)
    const length = array.length
    const robotSequences: RobotSequence[] = []
    for (var i = 0; i < length; i = i + 3) {
      const robotSequence = this.parseRobotSequence(array[i], array[i + 1])
      robotSequences.push(robotSequence)
    }

    return {
      upperRightCorner,
      robotSequences
    }
  }

  parsePosition (string: string): Position {
    const array = string.split(/ /g)
    const x = Number(array[0])
    const y = Number(array[1])
    if (isNaN(x) || isNaN(y)) {
      throw new Error(`TextFileInputParser - Invalid position: x ${x}, y ${y}`)
    }
    return new Position(Number(array[0]), Number(array[1]))
  }

  parseOrientation (string: string): Orientation {
    const orientation = string as Orientation
    if (!Object.values(Orientation).includes(orientation)) {
      throw new Error(`TextFileInputParser - Invalid orientation: ${string}`)
    }
    return orientation
  }

  parseInstructions (string: string): Instruction[] {
    const chars = [...string];
    if (chars.length > MAX_ROBOT_INSTRUCTIONS) {
      throw new Error('TextFileInputParser - Parse instructions: number of instructions is greater than 100')
    }
    return chars.map((char) => this.parseInstruction(char))
  }

  parseInstruction (string: string): Instruction {
    const instruction = string as Instruction
    if (!Object.values(Instruction).includes(instruction)) {
      throw new Error(`TextFileInputParser - Invalid instruction: ${string}`)
    }
    return instruction
  }

  parseRobotSequence (initialPositionAndOrientationString: string, instructionsString: string): RobotSequence {
    const array = initialPositionAndOrientationString.split(/ /g)
    const initialPosition = this.parsePosition(initialPositionAndOrientationString)
    const initialOrientation = this.parseOrientation(array[2])
    const instructions = this.parseInstructions(instructionsString)
    return {
      initialPosition,
      initialOrientation,
      instructions
    }
  }
}