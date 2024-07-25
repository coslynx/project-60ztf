const { MessageEmbed } = require('discord.js');

/**
 * Creates a Discord message embed with the provided data.
 *
 * @param {Object} data The data to be included in the embed.
 * @returns {MessageEmbed} The created Discord message embed.
 */
function createEmbed(data) {
  const embed = new MessageEmbed();

  if (data.title) {
    embed.setTitle(data.title);
  }

  if (data.description) {
    embed.setDescription(data.description);
  }

  if (data.url) {
    embed.setURL(data.url);
  }

  if (data.author) {
    embed.setAuthor({
      name: data.author.name,
      iconURL: data.author.iconURL,
      url: data.author.url,
    });
  }

  if (data.thumbnail) {
    embed.setThumbnail(data.thumbnail);
  }

  if (data.image) {
    embed.setImage(data.image);
  }

  if (data.footer) {
    embed.setFooter({
      text: data.footer.text,
      iconURL: data.footer.iconURL,
    });
  }

  if (data.timestamp) {
    embed.setTimestamp();
  }

  if (data.fields) {
    for (const field of data.fields) {
      embed.addField(field.name, field.value, field.inline);
    }
  }

  if (data.color) {
    embed.setColor(data.color);
  }

  return embed;
}

module.exports = {
  createEmbed,
};