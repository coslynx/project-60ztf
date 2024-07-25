const { Interaction } = require('discord.js');
const { player } = require('../../utils/player');

/**
 * @param {Interaction} interaction
 */
module.exports = {
  data: {
    name: 'play',
    description: 'Plays a song in the voice channel',
  },
  async execute(interaction) {
    if (!interaction.guild) return;

    const query = interaction.options.get('song').value;

    const voiceChannel = interaction.member.voice.channel;
    if (!voiceChannel) {
      return interaction.reply({
        content: 'You need to be in a voice channel to use this command!',
      });
    }

    const queue = player.getQueue(interaction.guild);
    if (!queue) {
      try {
        await player.join(voiceChannel);
        player.play(interaction.guild, query);
        return interaction.reply({
          content: `Playing ${query}!`,
        });
      } catch (error) {
        console.error(error);
        return interaction.reply({
          content: 'Could not join the voice channel or play the song.',
        });
      }
    }

    queue.add(query);
    return interaction.reply({
      content: `Added ${query} to the queue!`,
    });
  },
};