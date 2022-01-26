import { InputData } from "../domain/InputData";
import { Instruction } from "../domain/Instruction";
import { Orientation } from "../domain/Orientation";
import { Position } from "../domain/Position";
import { RobotSequence } from "../domain/RobotSequence";

export class TextFileInputParser {

  parse(content: string): InputData {
    const array = content.replace(/\r/g, '').split('\n');
    const upperRightCorner: Position = this.parseInitialPosition(array[0]);

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

  parseInitialPosition (string: string): Position {
    const array = string.split(/ /g)
    return new Position(Number(array[0]), Number(array[1]))
  }

  parseRobotSequence (initialPositionString: string, instructionsString: string): RobotSequence {
    const array = initialPositionString.split(/ /g)
    const initialPosition: Position = {
      x: Number(array[0]),
      y: Number(array[1])
    }
  
    const initialOrientation = this.parseOrientation(array[2])
    
    const instructions = this.parseInstructions(instructionsString)
    return {
      initialPosition,
      initialOrientation,
      instructions
    }
  }

  parseOrientation (string: string): Orientation {
    const orientation = string as Orientation
    if (!Object.values(Orientation).includes(orientation)) {
      throw new Error(`Invalid orientation: ${string}`)
    }
    return orientation
  }

  parseInstructions (string: string): Instruction[] {
    const chars = [...string];
    return chars.map((char) => this.parseInstruction(char))
  }

  parseInstruction (string: string): Instruction {
    const instruction = string as Instruction
    if (!Object.values(Instruction).includes(instruction)) {
      throw new Error(`Invalid instruction: ${string}`)
    }
    return instruction
  }
}