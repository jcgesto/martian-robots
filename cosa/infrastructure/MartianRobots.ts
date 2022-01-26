import { MartianRobotsService } from "../application/MartianRobotsService"
import { InputReader } from "../domain/InputReader"
import { OutputWriter } from "../domain/OutputWriter"

export class MartianRobots {
  
  constructor(
    private readonly inputDataReader: InputReader,
    private readonly outputDataWriter: OutputWriter,
    private readonly martianRobotsService: MartianRobotsService
  ) {}

  run () {
    const { upperRightCorner, robotSequences } = this.inputDataReader.read()
    const result = this.martianRobotsService.execute(upperRightCorner, robotSequences)
    this.outputDataWriter.write(result)
  }
}