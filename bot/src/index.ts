import { SlimedClient } from '../../packages/devslimedcommands/src/index'
import config from '../config/config'
import { ActivityType, Partials } from 'discord.js'

export const client = new SlimedClient({
  token: config.token,
  botOptions: {
    intents: [
      'AutoModerationConfiguration',
      'AutoModerationExecution',
      'DirectMessageReactions',
      'DirectMessageTyping',
      'DirectMessages',
      'GuildBans',
      'GuildEmojisAndStickers',
      'GuildIntegrations',
      'GuildInvites',
      'GuildMembers',
      'GuildMessageReactions',
      'GuildMessageTyping',
      'GuildMessages',
      'GuildModeration',
      'GuildPresences',
      'GuildScheduledEvents',
      'GuildVoiceStates',
      'GuildWebhooks',
      'Guilds',
      'MessageContent',
    ],
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
    name: 'Realistic Paint Studio',
    type: ActivityType.Playing,
  },
})

client.start()
