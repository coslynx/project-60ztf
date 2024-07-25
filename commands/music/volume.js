const { Interaction } = require('discord.js');
const { player } = require('../../utils/player');

/**
 * @param {Interaction} interaction
 */
module.exports = {
  data: {
    name: 'volume',
    description: 'Adjusts the volume of the music',
  },
  async execute(interaction) {
    if (!interaction.guild) return;

    const queue = player.getQueue(interaction.guild);
    if (!queue) {
      return interaction.reply({
        content: 'There is no music currently playing.',
      });
    }

    const newVolume = interaction.options.get('volume').value;
    if (newVolume < 0 || newVolume > 100) {
      return interaction.reply({
        content: 'Volume must be between 0 and 100.',
      });
    }

    queue.setVolume(newVolume / 100);

    return interaction.reply({
      content: `Volume set to ${newVolume}%`,
    });
  },
};