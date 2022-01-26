import { InputData } from "./input-data";

export interface InputReader {
  read (): InputData
}