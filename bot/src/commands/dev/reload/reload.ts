import { ApplicationCommandOptionType, PermissionFlagsBits } from 'discord.js'
import { ISlimedCommand, loadCommands } from 'packages/devslimedcommands/src'

const reload: ISlimedCommand = {
  name: 'recargar',
  description: 'Recarga un comando.',
  defaultMemberPermissions: [PermissionFlagsBits.Administrator],
  options: [
    {
      name: 'comandos',
      description: 'Recarga todos los comandos.',
      type: ApplicationCommandOptionType.Subcommand,
    },
  ],
}

module.exports = reload
