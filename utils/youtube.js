const ytdl = require('ytdl-core');
const { promisify } = require('util');
const ytpl = require('ytpl');

const validateURL = promisify(ytdl.validateURL);

/**
 * Searches for a video on YouTube and returns its information.
 *
 * @param {string} query The search query.
 * @returns {Promise<ytdl.videoInfo>} The video information.
 */
async function search(query) {
  const videos = await ytpl(query, { limit: 1 });
  if (videos.items.length > 0) {
    const video = videos.items[0];
    return await ytdl.getInfo(video.url);
  }
  return null;
}

/**
 * Gets the video information from a YouTube URL.
 *
 * @param {string} url The YouTube URL.
 * @returns {Promise<ytdl.videoInfo>} The video information.
 */
async function getVideoInfo(url) {
  try {
    const isValid = await validateURL(url);
    if (isValid) {
      return await ytdl.getInfo(url);
    }
    return null;
  } catch (error) {
    console.error(`Error getting video info: ${error}`);
    return null;
  }
}

/**
 * Downloads a YouTube video as an audio stream.
 *
 * @param {string} url The YouTube URL.
 * @param {object} options Download options.
 * @returns {Readable} The audio stream.
 */
function downloadAudio(url, options) {
  return ytdl(url, {
    filter: 'audioonly',
    quality: 'highestaudio',
    ...options,
  });
}

module.exports = {
  search,
  getVideoInfo,
  downloadAudio,
};