import { Robot } from "./robot";

export interface OutputWriter {
  write (instructionsResults: Robot[])
}