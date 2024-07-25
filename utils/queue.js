const { Queue } = require('discord-player');

/**
 * Manages the music queue for a Discord guild.
 */
class MusicQueue extends Queue {
  /**
   * Constructs a new MusicQueue instance.
   *
   * @param {Guild} guild The Discord guild.
   * @param {Player} player The Discord player instance.
   * @param {VoiceChannel} voiceChannel The voice channel to play music in.
   * @param {Interaction} interaction The Discord interaction object that triggered the queue creation.
   */
  constructor(guild, player, voiceChannel, interaction) {
    super(guild, player, voiceChannel);
    this.metadata = { interaction };
  }

  /**
   * Adds a song to the queue.
   *
   * @param {string} query The song query (URL or search term).
   * @returns {Promise<void> | void}
   */
  add(query) {
    return super.add(query, {
      requestedBy: this.metadata.interaction.user,
    });
  }

  /**
   * Skips the current song.
   *
   * @returns {Promise<void> | void}
   */
  skip() {
    return super.skip();
  }

  /**
   * Sets the volume level.
   *
   * @param {number} volume The volume level (0-1).
   * @returns {Promise<void> | void}
   */
  setVolume(volume) {
    return super.setVolume(volume);
  }

  /**
   * Toggles song looping.
   *
   * @returns {Promise<void> | void}
   */
  toggleLoop() {
    return super.setRepeatMode(this.repeatMode === 1 ? 0 : 1);
  }

  /**
   * Clears the queue.
   *
   * @returns {Promise<void> | void}
   */
  clear() {
    return super.stop();
  }
}

module.exports = {
  MusicQueue,
};