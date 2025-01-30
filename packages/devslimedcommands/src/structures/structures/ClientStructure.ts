import { ActivityType, Client, ClientOptions, Collection } from 'discord.js'
import { Logger } from '../../utils'
import { TCommand } from '../../types'
import { loadCommands, loadEvents } from '../../utils'
import { IBotActivity } from '../../interfaces'

export class SlimedClient extends Client {
  readonly botToken: string
  readonly commands: Collection<string, TCommand> = new Collection()
  readonly subCommands: Collection<string, any> = new Collection()
  readonly events = new Collection()
  readonly guildId?: string
  readonly dbEngine?: string
  readonly activity?: IBotActivity

  constructor(config: {
    token: string
    botOptions: ClientOptions
    guildId?: string
    dbEngine?: string
    activity?: IBotActivity
  }) {
    super(config.botOptions)
    this.botToken = config.token
    this.guildId = config.guildId
    this.dbEngine = config.dbEngine
    this.activity = config.activity
  }

  async start() {
    this.on('ready', async () => {
      Logger.info(`🤖 Starting the bot...`, { service: 'Client Structure' })
      this.user?.setActivity({
        name: this.activity?.name ?? 'Mixty - /help',
        type: this.activity?.type ?? ActivityType.Playing,
      })
      await this.loadCommands()
      Logger.info(`🤓☝️ The bot is up and ready!`, {
        service: 'Client Structure',
      })
    })
    await this.loadEvents()
    await this.login(this.botToken)
  }

  private async loadCommands() {
    await loadCommands(this)
  }

  private async loadEvents() {
    await loadEvents(this)
  }
}
