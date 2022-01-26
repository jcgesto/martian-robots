import * as fs from 'fs';
import { MartianRobotsService } from './src/application/MartianRobotsService';
import { MartianRobots } from './src/infrastructure/MartianRobots';
import { TextFileInputReader } from './src/infrastructure/TextFileInputReader';
import { TextFileOutputWriter } from './src/infrastructure/TextFileOutputWriter';

console.log('MARTIAN ROBOTS\n')

const textFileInputReader = new TextFileInputReader('input.txt', fs)
const textFileOutputWriter = new TextFileOutputWriter('output.txt', fs)
const martianRobotsService = new MartianRobotsService()
const martianRobots = new MartianRobots(textFileInputReader, textFileOutputWriter, martianRobotsService)
martianRobots.run()