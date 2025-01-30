import { SlimedClient } from '../../packages/devslimedcommands/src/index'
import config from '../config/config'
import { ActivityType, Partials } from 'discord.js'

export const client = new SlimedClient({
  token: config.token,
  botOptions: {
    intents: [3276799],
    partials: [
      Partials.Channel,
      Partials.GuildMember,
      Partials.GuildScheduledEvent,
      Partials.Message,
      Partials.Reaction,
      Partials.User,
      Partials.ThreadMember,
    ],
  },
  guildId: config.guildId,
  activity: {
    name: 'some good tunes 😎',
    type: ActivityType.Playing,
  },
})

client.start()
