import { OutputWriter } from "../domain/OutputWriter"
import { Robot } from "../domain/robot"

export class TextFileOutputWriter implements OutputWriter {
  
  constructor (
    private readonly fileUrl: string,
    private readonly fileSystem: any
  ) {}

  write (robots: Robot[]) {
    const content = robots.toString().replace(/,/g, '\n')
    this.fileSystem.writeFile(this.fileUrl, content, (err: any) => {
      if (err) {
        console.error(err)
        return
      }
      this.log(content)
    })
  }

  private log (content: string) {
    console.log('Output file content:')
    console.log('´´´')
    console.log(content)
    console.log('´´´\n')
  }
}