import { OutputWriter } from "../domain/OutputWriter"
import { Robot } from "../domain/robot"

export class TextFileOutputWriter implements OutputWriter {
  
  constructor (
    private readonly fileUrl: string,
    private readonly fileSystem: any
  ) {}

  write(instructionsResults: Robot[]) {
    const content = instructionsResults.toString().replace(/,/g, '\n')
    this.fileSystem.writeFile(this.fileUrl, content, err => {
      if (err) {
        console.error(err)
        return
      }
      //file written successfully
    })
  }
}