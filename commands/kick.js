const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!kUser)
     return message.channel.send("Error. User not found, make sure you are using the right input: `!kick <usermention> [reason]`.");
  let reason = args.join(" ").slice(22);
  if(!message.member.hasPermission('KICK_MEMBERS'))
    return message.channel.send("You don't have the permission to kick other users.");
  if(kUser.hasPermission('KICK_MEMBERS'))
    return message.channel.send(`Oops, looks like ${kUser} has admin permissions or is either an  equal to you or higher than you.`);
  let embed = new Discord.RichEmbed()
    .setTitle("## KICKED A USER FROM SERVER ##")
    .setDescription("kick != ban. Kicking an user does not mean banning the user, the user can join back if given another invite.")
    .setColor("#f44e42")
    .addField("Kicked User", `${kUser} with ID : ${kUser.id}`)
    .addField("Kicked By", `${message.author}`)
    .addField("Kicked At", message.channel)
    .addField("Kicked On", message.createdAt)  
    .addField("Reason", reason);

  let iChannel = message.guild.channels.find('name', "incidents");
  if(!iChannel)
      return message.channel.send("This server hasn't setup kicks/bans yet. To set it up, all you have to do is make a new text channel and give it the name `incidents`.")
  message.guild.member(kUser).kick(reason);
  message.delete().catch(O_o => {});
  message.channel.send(`Kicked User.\nSuccessfully kicked ${kUser}, Reason: ${reason}\nFull kick report available at '#incidents' channel`);
  return iChannel.send(embed);
} 

module.exports.help = {
  name: "kick"
}
