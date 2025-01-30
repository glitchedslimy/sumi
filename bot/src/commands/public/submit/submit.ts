import {
  ActionRowBuilder,
  AnyThreadChannel,
  ApplicationCommandOptionType,
  EmbedBuilder,
  GuildChannel,
  ModalBuilder,
  TextChannel,
  TextInputBuilder,
  TextInputStyle,
  ThreadAutoArchiveDuration,
} from 'discord.js'
import { ISlimedCommand } from '../../../../../packages/devslimedcommands/src/index'

const ping: ISlimedCommand = {
  name: 'submit',
  description: 'Sube un dibujo al canal de arte.',
  modal: {
    id: 'submit',
    title: 'Subir dibujo',
    components: [
      {
        id: 'title',
        label: '¿Qué titulo tiene tu dibujo?',
        style: TextInputStyle.Short,
        placeholder: 'Ejemplo: El gato de la suerte',
        required: true,
      },
      {
        id: 'description',
        label: 'Descripción o comentarios sobre el dibujo',
        style: TextInputStyle.Paragraph,
        placeholder:
          'Ejemplo: Este dibujo lo he realizado con una técnica de esfumado con lápices...',
      },
    ],
  },
  options: [
    {
      name: 'dibujo',
      description: 'El dibujo a subir.',
      type: ApplicationCommandOptionType.Attachment,
    },
  ],
  run: async ({ client, interaction, args, modalData }) => {
    // Modal
    const modal = new ModalBuilder()
      .setCustomId(ping.modal?.id ?? '')
      .setTitle(ping.modal?.title ?? '')

    for (const component of ping?.modal?.components ?? []) {
      const componentRow = new TextInputBuilder()
        .setCustomId(component.id)
        .setLabel(component.label)
        .setStyle(component.style)
        .setPlaceholder(component.placeholder ?? '')
        .setMaxLength(component.maxLength ?? 100)
        .setMinLength(component.minLenght ?? 0)
        .setValue(component.value ?? '')

      const actionRow = new ActionRowBuilder<TextInputBuilder>().addComponents(
        componentRow
      )
      modal.addComponents(actionRow)
    }
    // Command handling (initial interaction)
    if (!interaction.isModalSubmit()) {
      const attachment = interaction.options.get('dibujo')?.attachment?.url
      if (!attachment) {
        return interaction.reply({
          content: 'No se ha proporcionado ningún dibujo.',
          ephemeral: true,
        })
      }
      return interaction.showModal(modal)
    }

    const attachment = args?.getAttachment('dibujo')
    const title = interaction.fields.getTextInputValue('title')
    const description = interaction.fields.getTextInputValue('description')

    const artChannelPattern = /hilos|arte|dibujos/i
    const artChannel = client.channels.cache.find((channel) => {
      if (channel instanceof GuildChannel) {
        return artChannelPattern.test(channel.name)
      }
      return false
    }) as TextChannel | undefined

    if (!artChannel) {
      return interaction.reply({
        content: 'No se encontró un canal válido para subir el dibujo.',
        ephemeral: true,
      })
    }

    const embed = new EmbedBuilder()
      .setAuthor({
        name: interaction.user.tag,
        iconURL: interaction.user.displayAvatarURL(),
      })
      .setColor(0x00ff00)
      .setTitle(title)
      .setDescription(description)

    const initialMessage = await artChannel.send({
      embeds: [embed],
    })
    await initialMessage.reply({
      files: [attachment ?? ''],
    })

    await initialMessage.startThread({
      name: title,
      autoArchiveDuration: ThreadAutoArchiveDuration.ThreeDays,
    })

    await interaction.editReply({
      content: 'Dibujo subido correctamente.',
    })
  },
}

module.exports = ping
