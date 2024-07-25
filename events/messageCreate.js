const { Message } = require('discord.js');
const { player } = require('../utils/player');
const { config } = require('../utils/config');

/**
 * @param {Message} message
 */
module.exports = async (message) => {
  if (message.author.bot) return;
  if (!message.guild) return;

  const prefix = await config.getPrefix(message.guild);

  if (!message.content.startsWith(prefix)) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = message.client.commands.get(commandName) || message.client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return;

  try {
    await command.execute(message, args);
  } catch (error) {
    console.error(error);
    await message.reply({ content: 'There was an error while executing this command!' });
  }
};