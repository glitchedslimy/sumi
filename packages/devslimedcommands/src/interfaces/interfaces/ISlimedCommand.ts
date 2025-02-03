import {
  ApplicationCommandOption,
  Attachment,
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
  attachment?: Map<string, Attachment | null>
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
  modalRun?: ({
    client,
    interaction,
    args,
  }: {
    client: SlimedClient
    interaction: CommandInteraction
    args?: CommandInteractionOptionResolver
  }) => Promise<void>
}
