import { TCommand } from '../../types'

export class SlimedCommand {
  constructor(commandOptions: TCommand) {
    Object.assign(this, commandOptions)
  }
}
