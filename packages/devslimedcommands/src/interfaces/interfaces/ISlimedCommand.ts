import {
  ApplicationCommandOption,
  CommandInteraction,
  CommandInteractionOptionResolver,
  PermissionResolvable,
  TextInputStyle,
} from 'discord.js'
import { SlimedClient } from '../../structures'

export interface ISlimedCommand {
  name: string
  description: string
  permissions?: PermissionResolvable[]
  defaultMemberPermissions?: PermissionResolvable[]
  options?: ApplicationCommandOption[]
  cooldown?: number
  modal?: IModal
  developer?: boolean
  run?: ({
    client,
    interaction,
    args,
    modalData,
  }: {
    client: SlimedClient
    interaction: CommandInteraction
    args?: CommandInteractionOptionResolver
    modalData?: any
  }) => Promise<void>
}

export interface IModal {
  id: string
  title: string
  components: IComponents[]
}

interface IComponents {
  id: string
  label: string
  style: TextInputStyle
  maxLength?: number
  minLenght?: number
  placeholder?: string
  value?: string
  required?: boolean
}
