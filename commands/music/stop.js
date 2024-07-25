const { Interaction } = require('discord.js');
const { player } = require('../../utils/player');

/**
 * @param {Interaction} interaction
 */
module.exports = {
  data: {
    name: 'stop',
    description: 'Stops the current music and clears the queue',
  },
  async execute(interaction) {
    if (!interaction.guild) return;

    const queue = player.getQueue(interaction.guild);
    if (!queue) {
      return interaction.reply({
        content: 'There is no music currently playing.',
      });
    }

    queue.destroy();
    return interaction.reply({
      content: 'Music stopped and the queue has been cleared.',
    });
  },
};