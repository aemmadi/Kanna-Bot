const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!rUser)
    return message.channel.send("Error. User not found, make sure you are using the right input: `!report <usermention> [reason]`.");
  let reason = args.join(" ").slice(22);
  let embed = new Discord.RichEmbed()
    .setTitle("## REPORTED DETAILS ##")
    .setDescription("Report != kick/ban. Reporting a user gives admin a reason to keep an eye on the user reported")
    .setColor("#f46441")
    .addField("Reported User", `${rUser} with ID : ${rUser.id}`)
    .addField("Reported By", `${message.author}`)
    .addField("Channel", message.channel)
    .addField("Reported Time", message.createdAt)
    .addField("Reason", reason);

  let rChannel = message.guild.channels.find('name', "reports");
  if(!rChannel)
      return message.channel.send("This server hasn't setup reports yet. To set it up, all you have to do is make a new text channel and give it the name `reports`.");
  message.delete().catch(O_o => {});
  message.channel.send(`Report sent\nSuccessfully reported ${rUser}, Reason: ${reason}\nFull report available at '#reports' channel`);
  return rChannel.send(embed);
} 

module.exports.help = {
  name: "report"
}
