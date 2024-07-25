const { Player } = require('discord-player');
const { promisify } = require('util');
const { downloadAudio } = require('./youtube');

const player = new Player({
  ytdlOptions: {
    filter: 'audioonly',
    quality: 'highestaudio',
  },
});

player.on('error', (queue, error) => {
  console.error(`Error in queue ${queue.guild.id}: ${error}`);
  queue.metadata.interaction.reply({
    content: 'There was an error playing the song.',
  });
});

player.on('trackStart', (queue, track) => {
  console.log(`Started playing ${track.title} in ${queue.guild.name}`);
});

player.on('trackEnd', (queue, track) => {
  console.log(`Finished playing ${track.title} in ${queue.guild.name}`);
});

player.on('queueEnd', (queue) => {
  console.log(`Queue ended in ${queue.guild.name}`);
  queue.connection.disconnect();
});

/**
 * Joins a voice channel.
 *
 * @param {Guild} guild The Discord guild.
 * @param {VoiceChannel} voiceChannel The voice channel to join.
 * @returns {Promise<void>}
 */
async function join(guild, voiceChannel) {
  try {
    await player.join(voiceChannel);
    console.log(`Joined ${voiceChannel.name} in ${guild.name}`);
  } catch (error) {
    console.error(`Error joining ${voiceChannel.name}: ${error}`);
    throw error;
  }
}

/**
 * Plays a song in the voice channel.
 *
 * @param {Guild} guild The Discord guild.
 * @param {string} query The song query (URL or search term).
 * @returns {Promise<void>}
 */
async function play(guild, query) {
  const queue = player.getQueue(guild);
  if (!queue) {
    try {
      const voiceChannel = guild.members.me.voice.channel;
      if (!voiceChannel) {
        throw new Error('Bot is not in a voice channel.');
      }
      const searchResult = await player.search(query, {
        requestedBy: guild.members.me,
      });

      if (!searchResult || !searchResult.tracks.length) {
        throw new Error('No songs found.');
      }

      const track = searchResult.tracks[0];
      queue.add(track);

      console.log(`Added ${track.title} to queue in ${guild.name}`);
      queue.play();
    } catch (error) {
      console.error(`Error playing ${query}: ${error}`);
      throw error;
    }
  } else {
    queue.add(query);
    console.log(`Added ${query} to queue in ${guild.name}`);
  }
}

/**
 * Gets the music queue for a guild.
 *
 * @param {Guild} guild The Discord guild.
 * @returns {Queue} The music queue.
 */
function getQueue(guild) {
  return player.getQueue(guild);
}

/**
 * Skips the current song.
 *
 * @param {Guild} guild The Discord guild.
 * @returns {Promise<void>}
 */
async function skip(guild) {
  const queue = player.getQueue(guild);
  if (!queue) {
    throw new Error('There is no music currently playing.');
  }
  queue.skip();
  console.log(`Skipped current song in ${guild.name}`);
}

/**
 * Stops the music and clears the queue.
 *
 * @param {Guild} guild The Discord guild.
 * @returns {Promise<void>}
 */
async function stop(guild) {
  const queue = player.getQueue(guild);
  if (!queue) {
    throw new Error('There is no music currently playing.');
  }
  queue.destroy();
  console.log(`Stopped music and cleared queue in ${guild.name}`);
}

/**
 * Sets the volume of the music.
 *
 * @param {Guild} guild The Discord guild.
 * @param {number} volume The volume level (0-100).
 * @returns {Promise<void>}
 */
async function setVolume(guild, volume) {
  const queue = player.getQueue(guild);
  if (!queue) {
    throw new Error('There is no music currently playing.');
  }
  if (volume < 0 || volume > 100) {
    throw new Error('Volume must be between 0 and 100.');
  }
  queue.setVolume(volume / 100);
  console.log(`Set volume to ${volume} in ${guild.name}`);
}

/**
 * Toggles song looping.
 *
 * @param {Guild} guild The Discord guild.
 * @returns {Promise<void>}
 */
async function toggleLoop(guild) {
  const queue = player.getQueue(guild);
  if (!queue) {
    throw new Error('There is no music currently playing.');
  }
  queue.setRepeatMode(queue.repeatMode === 1 ? 0 : 1);
  console.log(`Looping is now ${queue.repeatMode === 1 ? 'enabled' : 'disabled'} in ${guild.name}`);
}

module.exports = {
  join,
  play,
  getQueue,
  skip,
  stop,
  setVolume,
  toggleLoop,
  player,
};