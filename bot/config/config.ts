import convict from 'convict'
import { BotConfig } from './config.interface'

const convictConfig: convict.Config<BotConfig> = convict({
  token: {
    doc: 'The token of the bot',
    format: String,
    default: '',
    env: 'BOT_TOKEN',
  },
  guildId: {
    doc: 'The GuildId of the discord server for testing',
    format: String,
    default: '',
    env: 'GUILD_ID',
  },
})

convictConfig.validate({ allowed: 'strict' })
const config: BotConfig = convictConfig.getProperties()

export default config
