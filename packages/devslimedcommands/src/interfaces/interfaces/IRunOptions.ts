import { CommandInteractionOptionResolver } from 'discord.js'
import { IExtendedInteraction } from './IExtendedInteraction'
import { ISlimedClient } from './ISlimedClient'

export interface IRunOptions {
  client: ISlimedClient
  interaction: IExtendedInteraction
  args: CommandInteractionOptionResolver
}
