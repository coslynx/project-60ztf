const { VoiceState } = require('discord.js');
const { player } = require('../utils/player');

/**
 * @param {VoiceState} oldState
 * @param {VoiceState} newState
 */
module.exports = async (oldState, newState) => {
  if (oldState.channel === newState.channel) return;

  if (newState.channel) {
    // Bot joins the same channel as the user
    const queue = player.getQueue(newState.guild);
    if (!queue && !player.getQueue(newState.guild)) {
      try {
        await player.join(newState.channel);
      } catch (error) {
        console.error(error);
        return;
      }
    }
  }

  if (oldState.channel && !newState.channel) {
    // User leaves the voice channel
    const queue = player.getQueue(oldState.guild);
    if (queue && queue.connection.channel.members.size === 1) {
      // Bot is the only one left in the channel
      queue.destroy();
    }
  }
};