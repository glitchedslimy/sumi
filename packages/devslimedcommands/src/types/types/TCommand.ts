import {
  ChatInputApplicationCommandData,
  PermissionResolvable,
} from 'discord.js'
import { TRunFunction } from './TRunFunction'
import { IModal } from '../../interfaces'

export type TCommand = {
  permissions?: PermissionResolvable[]
  cooldown?: number
  modal?: IModal
  run: TRunFunction
  developer: boolean
} & ChatInputApplicationCommandData
