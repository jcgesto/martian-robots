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
    console.log(`Input file "${this.fileUrl}" read succesfully`)
    return this.textInputFileParser.parse(content)
  }
}
