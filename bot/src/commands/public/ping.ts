import { TextInputStyle } from 'discord.js'
import { ISlimedCommand } from '../../../../packages/devslimedcommands/src/index'

const ping: ISlimedCommand = {
  name: 'ping',
  description: 'Une test!',
  modal: {
    id: 'ping',
    title: 'Ping pong',
    components: [
      {
        id: 'pong',
        label: 'Pong?',
        style: TextInputStyle.Short,
        placeholder: 'Pong aqui',
      },
      {
        id: 'pong2',
        label: 'Pong 2?',
        style: TextInputStyle.Paragraph,
        placeholder: 'Pong aqui',
      },
    ],
  },
  run: async ({ interaction }) => {},
}

module.exports = ping
