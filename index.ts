import { MartianRobots } from "./martian-robots"
import { readInput } from "./read-input"
import { TextFileInputReader } from "./src/infrastructure/text-file-input-reader"
import { TextFileOutputWriter } from "./src/infrastructure/text-file-output-writer"
import * as fs from 'fs';

console.log('Martian Robots')
console.log(readInput())

const textFileInputReader = new TextFileInputReader('input.txt', fs)
const textFileOutputWriter = new TextFileOutputWriter('output.txt', fs)
const martianRobots = new MartianRobots(textFileInputReader, textFileOutputWriter)
martianRobots.run()