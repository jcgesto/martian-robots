import { OutputWriter } from "../../domain/OutputWriter"
import { Robot } from "../../domain/robot"
import { OutputTextTransformer } from "./OutputTextTransformer"

export class TextFileOutputWriter implements OutputWriter {
  
  constructor (
    private readonly fileUrl: string,
    private readonly fileSystem: any,
    private readonly outputTextTransformer: OutputTextTransformer,
    private readonly debug: boolean = false
  ) {}

  write (robots: Robot[]) {
    const content = this.outputTextTransformer.toText(robots)
    this.fileSystem.writeFile(this.fileUrl, content, (err: any) => {
      if (err) {
        console.error(err)
        return
      }
      this.log(content)
    })
  }

  private log (content: string) {
    console.log(`Output file "${this.fileUrl}" written succesfully`)
    if (this.debug) {
      console.log('Output file content:')
      console.log('´´´')
      console.log(content)
      console.log('´´´\n')
    }
  }
}