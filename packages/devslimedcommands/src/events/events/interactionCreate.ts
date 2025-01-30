import {
  CommandInteractionOptionResolver,
  ChatInputCommandInteraction,
  StringSelectMenuInteraction,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  ModalSubmitInteraction,
} from 'discord.js'
import { IExtendedInteraction, ISlimedClient, IEvent } from '../../interfaces'

const interactionCreate: IEvent = {
  event: 'interactionCreate',
  once: false,
  run: async (interaction, client: ISlimedClient) => {
    if (interaction.isModalSubmit()) {
      const modalData = {
        fields: new Map(),
        originalOptions:
          interaction.options as CommandInteractionOptionResolver,
      }
      const command = client.commands.get(interaction.customId)
      for (const component of command?.modal?.components ?? []) {
        const value = interaction.fields.getTextInputValue(component.id)
        modalData.fields.set(component.id, value)
      }
      command?.run({
        args: interaction.options as CommandInteractionOptionResolver,
        client,
        interaction: interaction as IExtendedInteraction,
        modalData: modalData,
      })
    }
    if (interaction.isChatInputCommand()) {
      console.log('Chat input command')
      if (interaction.isCommand()) {
        const command = client.commands.get(interaction.commandName)
        if (!command) {
          return interaction.reply(`This command was not found.`)
        }
        if (command.developer && interaction.user.id != '372840998918684672') {
          return interaction.reply({
            content: `This command is only for the developer.`,
            ephemeral: true,
          })
        }
        const isSubcommand = interaction.options.getSubcommand(false)
        if (isSubcommand && command.options) {
          const subcommandFile = client.subCommands.get(
            `${interaction.command?.name}.${isSubcommand}`
          )
          if (!subcommandFile) {
            return interaction.reply(`This subcommand was not found.`)
          }
          subcommandFile.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as IExtendedInteraction,
          })
        } else {
          command.run({
            args: interaction.options as CommandInteractionOptionResolver,
            client,
            interaction: interaction as IExtendedInteraction,
          })
        }
      }
    }
  },
}

module.exports = interactionCreate
