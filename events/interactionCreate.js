const { Interaction } = require('discord.js');
const { player } = require('../utils/player');

/**
 * @param {Interaction} interaction
 */
module.exports = async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) {
    return interaction.reply({ content: 'This command does not exist.' });
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: 'There was an error while executing this command!' });
  }
};