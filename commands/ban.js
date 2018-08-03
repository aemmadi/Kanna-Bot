const Discord = require("discord.js");

//.ban <user-mention> [reason]
module.exports.run = async (bot, message, args) => {
  //User to ban
  let bUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );

  //Checks if a usermention is provided
  if (!bUser)
    return message.channel.send(
      "Error. User not found, make sure you are using the right input: `.ban <usermention> [reason]`."
    );

  let reason = args.join(" ").slice(22); //Cuts off the user id that comes with usermention

  if (!reason)
    return message.channel.send(
      "Error. Reason for the ban must be given. `.ban <usermention> [reason]`."
    );

  //Checks permissions of user
  if (!message.member.hasPermission("BAN_MEMBERS"))
    return message.channel.send(
      "You don't have the permission to ban other users."
    );

  //Checks if soon to be banned user has any admin permissions
  if (bUser.hasPermission("BAN_MEMBERS"))
    return message.channel.send(
      `Oops, looks like ${bUser} has admin permissions or is either an equal to you or higher than you.`
    );

  let embed = new Discord.RichEmbed()
    .setTitle("## BANNED A USER FROM SERVER ##")
    .setDescription(
      "Ban > Kick. Banning a user kicks the user out for good. The user can not join back even with an invite"
    )
    .setColor("#f44141")
    .addField("Banned User", `${bUser} with ID : ${bUser.id}`)
    .addField("Banned By", `${message.author}`)
    .addField("Banned At", message.channel)
    .addField("Banned On", message.createdAt)
    .addField("Reason", reason);

  let iChannel = message.guild.channels.find("name", "incidents"); //Checks for text channel to send ban message

  //Checks if server has an incidents channel
  if (!iChannel)
    return message.channel.send(
      "This server hasn't setup kicks/bans yet. To set it up, all you have to do is make a new text channel and give it the name `incidents`."
    );

  message.guild.member(bUser).ban(reason); //Bans user
  message.delete().catch(O_o => {}); //Deletes message
  message.channel.send(
    `Banned User.\nSuccessfully Banned ${bUser}, Reason: ${reason}\nFull ban report available at '#incidents' channel`
  ); //Sends confirmation of ban

  return iChannel.send(embed); //Sends full report in incidents channel
};
module.exports.help = {
  name: "ban"
};
