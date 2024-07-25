const { Interaction } = require('discord.js');
const { config } = require('../../utils/config');

/**
 * @param {Interaction} interaction
 */
module.exports = {
  data: {
    name: 'setprefix',
    description: 'Change the bot\'s prefix for a server.',
  },
  async execute(interaction) {
    if (!interaction.guild) return;

    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      return interaction.reply({
        content: 'You do not have permission to use this command.',
      });
    }

    const newPrefix = interaction.options.get('prefix').value;
    if (newPrefix.length > 5) {
      return interaction.reply({
        content: 'Prefix must be 5 characters or less.',
      });
    }

    await config.setPrefix(interaction.guild, newPrefix);

    return interaction.reply({
      content: `Prefix set to \`${newPrefix}\``,
    });
  },
};