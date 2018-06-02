const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!bUser)
    return message.channel.send("Error. User not found, make sure you are using the right input: `!ban <usermention> [reason]`.");
  let reason = args.join(" ").slice(22);
  if(!message.member.hasPermission('BAN_MEMBERS'))
    return message.channel.send("You don't have the permission to ban other users.");
  if(bUser.hasPermission('BAN_MEMBERS'))
    return message.channel.send(`Oops, looks like ${bUser} has admin permissions or is either an equal to you or higher than you.`);
  let embed = new Discord.RichEmbed()
    .setTitle("## BANNED A USER FROM SERVER ##")
    .setDescription("Ban > Kick. Banning a user kicks the user out for good. The user can not join back even with an invite")
    .setColor("#f44141")
    .addField("Banned User", `${bUser} with ID : ${bUser.id}`)
    .addField("Banned By", `${message.author}`)
    .addField("Banned At", message.channel)
    .addField("Banned On", message.createdAt)
    .addField("Reason", reason);

  let iChannel = message.guild.channels.find('name', "incidents");
  if(!iChannel)
      return message.channel.send("This server hasn't setup kicks/bans yet. To set it up, all you have to do is make a new text channel and give it the name `incidents`.")
  message.guild.member(bUser).ban(reason);
  message.delete().catch(O_o => {});
  message.channel.send(`Banned User.\nSuccessfully Banned ${bUser}, Reason: ${reason}\nFull ban report available at '#incidents' channel`);
  return iChannel.send(embed);
}
module.exports.help = {
  name: "ban"
}
