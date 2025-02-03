import { ISlimedSubCommand } from 'packages/devslimedcommands/src'
import { loadCommands } from '../../../../../packages/devslimedcommands/src'
const subCommandReloadCommands: ISlimedSubCommand = {
  subCommand: 'recargar.comandos',
  async run({ client, interaction, args }) {
    try {
      await loadCommands(client)
      await interaction.reply({
        content: 'Comandos recargados.',
        ephemeral: true,
      })
    } catch (error) {
      await interaction.reply({
        content: 'Error al recargar los comandos.',
        ephemeral: true,
      })
    }
  },
}

module.exports = subCommandReloadCommands
