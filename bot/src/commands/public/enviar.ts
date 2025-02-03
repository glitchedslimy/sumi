import {
  ActionRowBuilder,
  ApplicationCommandOptionType,
  Attachment,
  EmbedBuilder,
  ModalBuilder,
  TextChannel,
  TextInputBuilder,
  TextInputStyle,
  ThreadAutoArchiveDuration,
} from 'discord.js'
import { ISlimedCommand } from '../../../../packages/devslimedcommands/src/interfaces'
import { Vibrant } from 'node-vibrant/node'

const submit: ISlimedCommand = {
  name: 'enviar',
  description: 'Sube un dibujo al canal de arte.',
  attachment: new Map<string, Attachment>(), // Store attachments per user
  options: [
    {
      name: 'dibujo',
      description: 'El dibujo a subir.',
      type: ApplicationCommandOptionType.Attachment,
      required: true,
    },
  ],
  run: async ({ client, interaction, args }): Promise<void> => {
    if (interaction.isChatInputCommand()) {
      const attachment = args?.get('dibujo')?.attachment
      if (!attachment) {
        await interaction.reply({
          content: 'No se ha proporcionado ningún dibujo.',
          ephemeral: true,
        })
      }
      submit.attachment?.set(interaction.user.id, attachment ?? null)
      const modalSubmit = new ModalBuilder()
        .setCustomId('enviar')
        .setTitle('Subir dibujo')

      const titleInput = new TextInputBuilder()
        .setCustomId('titulo')
        .setLabel('Título')
        .setPlaceholder('Ex: El gato en la noche')
        .setStyle(TextInputStyle.Short)

      const descriptionInput = new TextInputBuilder()
        .setCustomId('descripcion')
        .setLabel('Descripción')
        .setPlaceholder('Ex: Un gato en la noche debajo de la luna')
        .setStyle(TextInputStyle.Paragraph)

      const titleRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
        titleInput
      )

      const descriptionRow =
        new ActionRowBuilder<TextInputBuilder>().addComponents(descriptionInput)

      modalSubmit.addComponents(titleRow, descriptionRow)

      await interaction.showModal(modalSubmit)
    }
  },
  modalRun: async ({ client, interaction, args }): Promise<void> => {
    await interaction.deferReply({ ephemeral: true })
    const attachment = submit.attachment?.get(interaction.user.id)
    const title = interaction.fields.getTextInputValue('titulo')
    const description = interaction.fields.getTextInputValue('descripcion')

    const artChannelPattern = /(?:hilos|arte|art|dibujos|draws)/i
    const channel = client.channels.cache
      .filter((channel) => channel instanceof TextChannel)
      .find((channel) => artChannelPattern.test(channel.name)) as TextChannel

    if (!channel) {
      await interaction.editReply({
        content: 'No se ha encontrado el canal de arte.',
      })
    }

    const response = await fetch(attachment?.url ?? '')
    const arrayBuffer = await response.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const palette = await Vibrant.from(buffer).getPalette()
    const dominantColor = palette.Vibrant?.hex

    const colorNumber = dominantColor
      ? parseInt(dominantColor.replace('#', ''), 16)
      : Math.floor(Math.random() * 16777215)

    const delay = (ms: number) =>
      new Promise((resolve) => setTimeout(resolve, ms))

    const embed = new EmbedBuilder()
      .setTitle(title)
      .setDescription(description)
      .setImage(attachment?.url ?? '')
      .setColor(colorNumber)
      .setTimestamp(new Date())
      .setAuthor({
        name: interaction.user.username ?? 'Unknown user',
        iconURL: interaction.user.avatarURL() ?? undefined,
      })

    const initialMessage = await channel.send({
      embeds: [embed],
    })

    initialMessage.react('❤️')

    initialMessage.startThread({
      name: `${title} - ${interaction.user.username}`,
      autoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays,
    })

    submit.attachment?.delete(interaction.user.id)

    await interaction.editReply({
      content: `Dibujo subido con éxito. [Ver dibujo](${initialMessage.url})`,
    })
  },
}

module.exports = submit
