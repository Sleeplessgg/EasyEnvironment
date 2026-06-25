const messageService = require('../services/messageService');
const groupService = require('../services/groupService');

const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
  StringSelectMenuBuilder
} = require('discord.js');

// -----------------------------
// TEMP STATE STORAGE (EDIT FLOW)
// -----------------------------
const pendingEdits = new Map();

module.exports = {
  name: 'interactionCreate',
  once: false,

  async execute(interaction, client) {

    try {

      const guildId = interaction.guild?.id;

      // ======================================================
      // SLASH COMMANDS
      // ======================================================
      if (interaction.isChatInputCommand()) {
        const command = client.commands.get(interaction.commandName);
        if (!command) return;
        return command.execute(interaction, client);
      }

      // ======================================================
      // BUTTONS
      // ======================================================
      if (interaction.isButton()) {

        if (!interaction.inGuild()) return;

        // ---------------- ADD MESSAGE ----------------
        if (interaction.customId === 'add_message') {

          const groups = await groupService.getGuildGroups(guildId) || [];

          const options = [
            { label: 'Default (0)', value: '0' },
            ...groups.map(g => ({
              label: g.name.slice(0, 100),
              value: String(g.groupId)
            }))
          ].slice(0, 25);

          const select = new StringSelectMenuBuilder()
            .setCustomId('add_message_select_group')
            .setPlaceholder('Select group')
            .addOptions(options);

          return interaction.reply({
            content: '📂 Choose group:',
            components: [new ActionRowBuilder().addComponents(select)],
            ephemeral: true
          });
        }

        // ---------------- EDIT MESSAGE ----------------
        if (interaction.customId === 'edit_message') {

          const messages = await messageService.getAllMessagesForGuild(guildId) || [];

          const select = new StringSelectMenuBuilder()
            .setCustomId('edit_select_message')
            .setPlaceholder('Select message')
            .addOptions(
              messages.slice(0, 25).map(m => ({
                label: m.content.slice(0, 80),
                value: String(m.messageId)
              }))
            );

          return interaction.reply({
            components: [new ActionRowBuilder().addComponents(select)],
            ephemeral: true
          });
        }

        // ---------------- DELETE MESSAGE ----------------
        if (interaction.customId === 'delete_message') {

          const messages = await messageService.getAllMessagesForGuild(guildId) || [];

          const select = new StringSelectMenuBuilder()
            .setCustomId('delete_select_message')
            .setPlaceholder('Select message')
            .addOptions(
              messages.slice(0, 25).map(m => ({
                label: m.content.slice(0, 80),
                value: String(m.messageId)
              }))
            );

          return interaction.reply({
            components: [new ActionRowBuilder().addComponents(select)],
            ephemeral: true
          });
        }

        // ---------------- DELETE GROUP ----------------
        if (interaction.customId === 'delete_group') {

          const groups = await groupService.getGuildGroups(guildId) || [];

          const select = new StringSelectMenuBuilder()
            .setCustomId('delete_select_group')
            .setPlaceholder('Select group')
            .addOptions(
              groups.slice(0, 25).map(g => ({
                label: g.name,
                value: String(g.groupId)
              }))
            );

          return interaction.reply({
            components: [new ActionRowBuilder().addComponents(select)],
            ephemeral: true
          });
        }
      }

      // ======================================================
      // SELECT MENUS
      // ======================================================
      if (interaction.isStringSelectMenu()) {

        // ---------------- ADD MESSAGE GROUP SELECT ----------------
        if (interaction.customId === 'add_message_select_group') {

          const groupId = Number(interaction.values[0]);

          const modal = new ModalBuilder()
            .setCustomId(`addMessageModal:${groupId}`)
            .setTitle('Add Message');

          const input = new TextInputBuilder()
            .setCustomId('content')
            .setLabel('Message Content')
            .setStyle(TextInputStyle.Paragraph)
            .setRequired(true);

          modal.addComponents(new ActionRowBuilder().addComponents(input));

          return interaction.showModal(modal);
        }

        // ---------------- EDIT MESSAGE SELECT ----------------
        if (interaction.customId === 'edit_select_message') {

          const messageId = Number(interaction.values[0]);
          const message = await messageService.getMessageById(messageId);

          if (!message) {
            return interaction.reply({
              content: '❌ Message not found.',
              ephemeral: true
            });
          }

          // store edit session
          pendingEdits.set(interaction.user.id, {
            messageId,
            guildId
          });

          const modal = new ModalBuilder()
            .setCustomId(`editMessageModal:${messageId}`)
            .setTitle('Edit Message');

          const input = new TextInputBuilder()
            .setCustomId('content')
            .setLabel('Message Content')
            .setStyle(TextInputStyle.Paragraph)
            .setValue(message.content)
            .setRequired(true);

          modal.addComponents(new ActionRowBuilder().addComponents(input));

          return interaction.showModal(modal);
        }

        // ---------------- DELETE MESSAGE SELECT ----------------
        if (interaction.customId === 'delete_select_message') {

          await messageService.deleteExistingMessage(Number(interaction.values[0]));

          return interaction.reply({
            content: '✅ Message deleted!',
            ephemeral: true
          });
        }

        // ---------------- DELETE GROUP SELECT ----------------
        if (interaction.customId === 'delete_select_group') {

          const groupId = Number(interaction.values[0]);

          await groupService.clearGroupFromMessages(groupId, guildId);
          await groupService.removeGroup(groupId, guildId);

          return interaction.update({
            content: '✅ Group deleted!',
            components: []
          });
        }

        // ---------------- EDIT GROUP UPDATE ----------------
        if (interaction.customId.startsWith('edit_group_select:')) {

          const messageId = Number(interaction.customId.split(':')[1]);
          const groupId = Number(interaction.values[0]);

          await messageService.updateMessageGroup(messageId, groupId);

          pendingEdits.delete(interaction.user.id);

          return interaction.update({
            content: '✅ Group updated!',
            components: []
          });
        }
      }

      // ======================================================
      // MODALS
      // ======================================================
      if (interaction.isModalSubmit()) {

        // ---------------- ADD MESSAGE ----------------
        if (interaction.customId.startsWith('addMessageModal:')) {

          const groupId = Number(interaction.customId.split(':')[1]);
          const content = interaction.fields.getTextInputValue('content');

          await messageService.addNewMessage(guildId, groupId, content);

          return interaction.reply({
            content: '✅ Message added!',
            ephemeral: true
          });
        }

        // ---------------- EDIT MESSAGE ----------------
        if (interaction.customId.startsWith('editMessageModal:')) {

          const messageId = Number(interaction.customId.split(':')[1]);
          const content = interaction.fields.getTextInputValue('content');

          await messageService.editExistingMessage(messageId, content);

          // now ask for optional group change AFTER modal
          const session = pendingEdits.get(interaction.user.id);

          if (!session) {
            return interaction.reply({
              content: '✅ Message updated!',
              ephemeral: true
            });
          }

          const groups = await groupService.getGuildGroups(guildId) || [];

          const select = new StringSelectMenuBuilder()
            .setCustomId(`edit_group_select:${messageId}`)
            .setPlaceholder('Optional: change group')
            .addOptions([
              { label: 'Default (0)', value: '0' },
              ...groups.map(g => ({
                label: g.name,
                value: String(g.groupId)
              }))
            ].slice(0, 25));

          return interaction.reply({
            content: '✅ Message updated! Optional group change:',
            components: [new ActionRowBuilder().addComponents(select)],
            ephemeral: true
          });
        }

        // ---------------- ADD GROUP ----------------
        if (interaction.customId === 'addGroupModal') {

          const name = interaction.fields.getTextInputValue('groupName');

          await groupService.createGroup(guildId, name);

          return interaction.reply({
            content: '✅ Group created!',
            ephemeral: true
          });
        }
      }

    } catch (err) {
      console.error('❌ Interaction error:', err);

      if (interaction.replied || interaction.deferred) return;

      return interaction.reply({
        content: '❌ Something went wrong.',
        ephemeral: true
      });
    }
  }
};