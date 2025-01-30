import {
  ApplicationCommandOption,
  CommandInteraction,
  CommandInteractionOptionResolver,
  PermissionResolvable,
} from 'discord.js'
import { SlimedClient } from '../../structures'

export interface ISlimedCommand {
  name: string
  description: string
  permissions?: PermissionResolvable[]
  defaultMemberPermissions?: PermissionResolvable[]
  options?: ApplicationCommandOption[]
  cooldown?: number
  developer?: boolean
  run?: ({
    client,
    interaction,
    args,
  }: {
    client: SlimedClient
    interaction: CommandInteraction
    args?: CommandInteractionOptionResolver
  }) => Promise<void>
}
