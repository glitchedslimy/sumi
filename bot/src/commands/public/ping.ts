import { ISlimedCommand } from '../../../../packages/devslimedcommands/src/index'

const ping: ISlimedCommand = {
  name: 'ping',
  description: 'Ping!',
  run: async ({ interaction }) => {
    await interaction.reply('Pong!')
  },
}

module.exports = ping
