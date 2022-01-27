import * as fs from 'fs';
import { MartianRobotsService } from './src/application/MartianRobotsService';
import { MartianRobots } from './src/infrastructure/MartianRobots';
import { TextFileOutputWriter } from './src/infrastructure/text-file-output-writer/TextFileOutputWriter';
import { TextFileInputParser } from './src/infrastructure/text-file-input-reader/TextFileInputParser';
import { TextFileInputReader } from './src/infrastructure/text-file-input-reader/TextFileInputReader';
import { OutputTextTransformer } from './src/infrastructure/text-file-output-writer/OutputTextTransformer';

const DEBUG = false;

console.log('MARTIAN ROBOTS\n');

const textFileInputParser = new TextFileInputParser();
const textFileInputReader = new TextFileInputReader('input.txt', fs, textFileInputParser);
const outputTextTransformer = new OutputTextTransformer();
const textFileOutputWriter = new TextFileOutputWriter('output.txt', fs, outputTextTransformer, DEBUG);
const martianRobotsService = new MartianRobotsService();
const martianRobots = new MartianRobots(textFileInputReader, textFileOutputWriter, martianRobotsService);
martianRobots.run();