import { IEvent } from '../../interfaces/interfaces/IEvent'
import { SlimedClient } from '../../structures'
import { registerCommands } from './RegisterCommands'
import { registerEvent } from './RegisterEvent'
import { loadFiles, loadInternalFiles } from './LoadFiles'
import { Logger } from './InternalLogger'
import { LoggerServices } from '../enums/LoggerServices'

export async function loadEvents(client: SlimedClient) {
  await client.events.clear()
  Logger.info('🎭 Loading events...', { service: LoggerServices.Events })
  const eventFiles = await loadFiles('events')
  if (eventFiles.length < 1) {
    Logger.info(
      "🎭 Didn't found any defined events, charging the internal ones...",
      { service: LoggerServices.Events }
    )
    const internalEvents = await loadInternalFiles('events')

    internalEvents.forEach((file) => {
      const event: IEvent = require(file)

      const run = (...args: any) => event.run(...args, client)

      client.events.set(event.event, event.run)

      registerEvent(client, event, run)
      Logger.info(`🎭 Loaded ${internalEvents.length} events!`, {
        service: LoggerServices.Events,
      })
      return
    })
  } else {
    eventFiles.forEach((file) => {
      const event: IEvent = require(file)

      const run = (...args: any) => event.run(...args, client)

      client.events.set(event.event, event.run)

      registerEvent(client, event, run)
    })
    Logger.info(`🎭 Loaded ${eventFiles.length} events!`, {
      service: LoggerServices.Events,
    })
  }
}

export async function loadCommands(client: SlimedClient) {
  Logger.info('📦 Loading commands...', { service: LoggerServices.Commands })
  await client.commands.clear()
  await client.subCommands.clear()

  const slashCommands: any[] = []
  const commandFiles = await loadFiles('commands')

  commandFiles.forEach((file) => {
    const command = require(file)

    if (command.subCommand) {
      return client.subCommands.set(command.subCommand, command)
    }

    if (!command.name) {
      return
    }

    client.commands.set(command.name, command)
    slashCommands.push(command)
  })
  Logger.info(`📦 Loaded ${commandFiles.length} commands!`, {
    service: LoggerServices.Commands,
  })

  await registerCommands(client, slashCommands)
}
