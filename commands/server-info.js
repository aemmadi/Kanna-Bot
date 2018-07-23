const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
    let embed = new Discord.RichEmbed()
      .setTitle("## SERVER INFORMATION ##")
      .setColor("#418ff4")
      .setThumbnail(message.guild.iconURL)
      .addField("Server Name", message.guild.name)
      .addField("Server ID", message.guild.id)
      .addField("Created on", message.guild.createdAt)
      .addField("Server Region", message.guild.region)
      .addField("Server Owner", message.guild.owner)
      .addField("Total Members", message.guild.memberCount);
    return message.channel.send(embed);
  }

module.exports.help = {
  name: "svinfo"
}