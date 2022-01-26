import { Instruction } from '../../domain/Instruction';
import { ForwardExecuter } from './ForwardExecuter';
import { InstructionExecuter } from './InstructionExecuter';
import { LeftExecuter } from './LeftExecuter'
import { RightExecuter } from './RightExecuter'

export class InstructionExecuterFactory {
  
  private static instructionexecutersMap = {
    [Instruction.FORWARD]: ForwardExecuter,
    [Instruction.LEFT]: LeftExecuter,
    [Instruction.RIGHT]: RightExecuter
  };

  static getInstance(instruction: Instruction): InstructionExecuter {
    const type = this.instructionexecutersMap[instruction]
    if (!type) {
      throw new Error(`InstructionExecuterFactory - Invalid instruction: ${instruction}`)
    }
    return new type();
  }
}