const { Interaction } = require('discord.js');
const { player } = require('../../utils/player');

/**
 * @param {Interaction} interaction
 */
module.exports = {
  data: {
    name: 'queue',
    description: 'Displays the current song queue',
  },
  async execute(interaction) {
    if (!interaction.guild) return;

    const queue = player.getQueue(interaction.guild);
    if (!queue) {
      return interaction.reply({
        content: 'There is no music currently playing.',
      });
    }

    const currentSong = queue.current;
    const queueItems = queue.tracks.map((song, index) => `${index + 1}. ${song.title}`);

    return interaction.reply({
      embeds: [
        {
          title: 'Music Queue',
          description: `**Currently Playing:** ${currentSong.title}\n\n${queueItems.join('\n')}`,
        },
      ],
    });
  },
};