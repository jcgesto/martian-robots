import { Instruction } from "../../domain/Instruction"
import { InstructionExecuterFactory } from "./InstructionExecuterFactory"
import { LeftExecuter } from "./LeftExecuter"

describe('InstructionExecuterFactory', () => {
  describe('getInstance', () => {
    it('Should return the expected instruction executer', () => {
      const result = InstructionExecuterFactory.getInstance(Instruction.LEFT)
      expect(result).toEqual(new LeftExecuter())
    })

    it('Should throw if the instruction is not valid', () => {
      function getInvalid () {
        InstructionExecuterFactory.getInstance('invalid' as any)
      }
      expect(getInvalid).toThrow()
    })
  })
})