import { Robot } from "../domain/robot";

export class OutputTextTransformer {

  toText(output: Robot[]): string {
    return output.map(robot => this.robotToString(robot)).join('\n')
  }

  private robotToString (robot: Robot): string {
    // Format: 3 3 N LOST
    return `${robot.position.x} ${robot.position.y} ${robot.orientation}${robot.isLost ? ' LOST' : ''}`
  }
}