import { InputData } from "../../domain/InputData";
import { InputReader } from "../../domain/InputReader";
import { TextFileInputParser } from "./TextFileInputParser";


export class TextFileInputReader implements InputReader {
  
  constructor (
    private readonly fileUrl: string,
    private readonly fileSystem: any,
    private readonly textInputFileParser: TextFileInputParser
  ) {}

  read(): InputData {
    const content = this.fileSystem.readFileSync(this.fileUrl,'utf8');
    this.log(content)
    return this.textInputFileParser.parse(content)
  }

  private log (content: string) {
    console.log('Input file content:')
    console.log('´´´')
    console.log(content)
    console.log('´´´\n')
  }
}
