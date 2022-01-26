import { InputData } from "./InputData";

export interface InputReader {
  read (): InputData
}