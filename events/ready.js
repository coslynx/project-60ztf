const { Client } = require('discord.js');
const { player } = require('./utils/player');
const { config } = require('./utils/config');
const logger = require('./utils/logger');

module.exports = async (client) => {
  // Load the default prefix for the bot
  const defaultPrefix = await config.getDefaultPrefix();

  // Load all commands from the 'commands' directory
  const commandFiles = client.commands.map((command) => command.data.name);

  // Set the activity of the bot to indicate it is listening to music
  client.user.setActivity('Music', { type: 'LISTENING' });

  // Log a message to the console to indicate that the bot is ready
  logger.info(`Logged in as ${client.user.tag}!`);
  logger.info(`Prefix: ${defaultPrefix}`);
  logger.info(`Loaded ${commandFiles.length} commands: ${commandFiles.join(', ')}`);
};