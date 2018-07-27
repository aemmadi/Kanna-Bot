const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let botinfo = new Discord.RichEmbed()
    .setTitle("## BOT INFORMATION ##")
    .setColor("#f4a442")
    .setThumbnail(bot.user.displayAvatarURL)
    .addField("Bot Name", `[${bot.user.username}](https://www.github.com/KannaDev/Kanna-Bot/)`)
    .addField("Running on", `${bot.guilds.size} servers`)
    .addField("Developed by", `[Anirudh Emmadi](http://www.anirudhemmadi.com)`)
    .addField("Created on", bot.user.createdAt);
  message.channel.send(botinfo);

  let svinfo = new Discord.RichEmbed()
    .setTitle("## SERVER INFORMATION ##")
    .setColor("#418ff4")
    .setThumbnail(message.guild.iconURL)
    .addField("Server Name", message.guild.name)
    .addField("Server ID", message.guild.id)
    .addField("Created on", message.guild.createdAt)
    .addField("Server Region", message.guild.region)
    .addField("Server Owner", message.guild.owner)
    .addField("Total Members", message.guild.memberCount);
  return message.channel.send(svinfo);
}

module.exports.help = {
  name: "info"
}