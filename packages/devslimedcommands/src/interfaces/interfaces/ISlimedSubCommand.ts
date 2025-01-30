import {
  CommandInteraction,
  CommandInteractionOptionResolver,
} from 'discord.js'
import { SlimedClient } from '../../structures'

export interface ISlimedSubCommand {
  subCommand: string
  run: ({
    client,
    interaction,
    args,
  }: {
    client: SlimedClient
    interaction: CommandInteraction
    args?: CommandInteractionOptionResolver
  }) => Promise<void>
}
