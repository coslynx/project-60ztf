const { Interaction } = require('discord.js');

/**
 * @param {Interaction} interaction
 */
module.exports = {
  data: {
    name: 'ping',
    description: 'Measures the bot\'s latency',
  },
  async execute(interaction) {
    if (!interaction.guild) return;

    const sentAt = Date.now();
    await interaction.reply('Pinging...');

    const receivedAt = Date.now();

    return interaction.editReply(`Pong! Latency is ${receivedAt - sentAt}ms.`);
  },
};