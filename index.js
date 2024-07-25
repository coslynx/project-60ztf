const Discord = require('discord.js');
const { config } = require('dotenv');
const logger = require('./utils/logger');
const events = require('./events');
const commands = require('./commands');

config();

const client = new Discord.Client({ intents: [Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES, Discord.Intents.FLAGS.GUILD_VOICE_STATES] });
const token = process.env.DISCORD_TOKEN;

client.on('ready', () => {
  logger.info(`Logged in as ${client.user.tag}!`);
  client.user.setActivity('Music', { type: 'LISTENING' });
});

client.on('messageCreate', events.messageCreate);
client.on('interactionCreate', events.interactionCreate);
client.on('voiceStateUpdate', events.voiceStateUpdate);
client.on('guildMemberAdd', events.guildMemberAdd);

for (const command of commands) {
  client.commands.set(command.data.name, command);
}

client.login(token).catch((err) => {
  logger.error(`Error logging in: ${err}`);
});