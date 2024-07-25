const { Interaction } = require('discord.js');
const { player } = require('../../utils/player');

/**
 * @param {Interaction} interaction
 */
module.exports = {
  data: {
    name: 'nowplaying',
    description: 'Shows the currently playing song',
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

    return interaction.reply({
      embeds: [
        {
          title: 'Now Playing',
          description: `[${currentSong.title}](${currentSong.url})`,
          thumbnail: {
            url: currentSong.thumbnail,
          },
        },
      ],
    });
  },
};