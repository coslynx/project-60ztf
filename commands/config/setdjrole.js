const { Interaction } = require('discord.js');
const { config } = require('../../utils/config');

/**
 * @param {Interaction} interaction
 */
module.exports = {
  data: {
    name: 'setdjrole',
    description: 'Set a DJ role for the server.',
  },
  async execute(interaction) {
    if (!interaction.guild) return;

    if (!interaction.member.permissions.has('ADMINISTRATOR')) {
      return interaction.reply({
        content: 'You do not have permission to use this command.',
      });
    }

    const djRole = interaction.options.get('role').value;
    if (!interaction.guild.roles.cache.get(djRole)) {
      return interaction.reply({
        content: 'Invalid role.',
      });
    }

    await config.setDJRole(interaction.guild, djRole);

    return interaction.reply({
      content: `DJ role set to <@&${djRole}>`,
    });
  },
};