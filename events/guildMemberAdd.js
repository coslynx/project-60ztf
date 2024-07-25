const { GuildMember } = require('discord.js');

/**
 * @param {GuildMember} member
 */
module.exports = async (member) => {
  // Welcome message upon new member joining
  member.guild.channels.cache.get('YOUR_CHANNEL_ID').send(`Welcome to the server, ${member}!`);
};