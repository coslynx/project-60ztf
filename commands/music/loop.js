const { Interaction } = require('discord.js');
const { player } = require('../../utils/player');

/**
 * @param {Interaction} interaction
 */
module.exports = {
  data: {
    name: 'loop',
    description: 'Toggle song looping',
  },
  async execute(interaction) {
    if (!interaction.guild) return;

    const queue = player.getQueue(interaction.guild);
    if (!queue) {
      return interaction.reply({
        content: 'There is no music currently playing.',
      });
    }

    const isLooping = queue.repeatMode === 1;
    queue.setRepeatMode(!isLooping ? 1 : 0);

    return interaction.reply({
      content: `Looping is now ${!isLooping ? 'enabled' : 'disabled'}.`,
    });
  },
};