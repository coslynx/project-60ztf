const { Interaction } = require('discord.js');
const fs = require('fs');

/**
 * @param {Interaction} interaction
 */
module.exports = {
  data: {
    name: 'help',
    description: 'Shows all available commands',
  },
  async execute(interaction) {
    if (!interaction.guild) return;

    const commands = fs
      .readdirSync('./commands')
      .filter((file) => file.endsWith('.js'));

    let helpText = 'Here are the available commands:\n';
    for (const commandFile of commands) {
      const command = require(`../${commandFile}`);
      helpText += `\n**${command.data.name}**: ${command.data.description}`;
    }

    return interaction.reply({
      content: helpText,
    });
  },
};