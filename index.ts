import * as fs from 'fs';
import { MartianRobotsService } from './src/application/MartianRobotsService';
import { MartianRobots } from './src/infrastructure/MartianRobots';
import { TextFileInputReader } from './src/infrastructure/TextFileInputReader';
import { TextFileOutputWriter } from './src/infrastructure/TextFileOutputWriter';
import { TextFileInputParser } from './src/infrastructure/TextFileInputParser';
import { OutputTextTransformer } from './src/infrastructure/OutputTextTransformer';

console.log('MARTIAN ROBOTS\n')

const textFileInputParser = new TextFileInputParser()
const textFileInputReader = new TextFileInputReader('input.txt', fs, textFileInputParser)
const outputTextTransformer = new OutputTextTransformer()
const textFileOutputWriter = new TextFileOutputWriter('output.txt', fs, outputTextTransformer)
const martianRobotsService = new MartianRobotsService()
const martianRobots = new MartianRobots(textFileInputReader, textFileOutputWriter, martianRobotsService)
martianRobots.run()