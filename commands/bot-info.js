const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
      .setTitle("## BOT INFORMATION ##")
      .setColor("#f4a442")
      .setThumbnail(bot.user.displayAvatarURL)
      .addField("Bot Name", bot.user.username)
      .addField("Created on", bot.user.createdAt);
    return message.channel.send(embed);
}

module.exports.help = {
  name: "botinfo"
}