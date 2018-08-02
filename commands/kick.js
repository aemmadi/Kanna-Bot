const Discord = require("discord.js");

//!kick <user-mention> [reason]
module.exports.run = async (bot, message, args) => {
  //User to kick
  let kUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );

  //Checks if a usermention is provided
  if (!kUser)
    return message.channel.send(
      "Error. User not found, make sure you are using the right input: `!kick <usermention> [reason]`."
    );

  let reason = args.join(" ").slice(22); //Cuts off the user id that comes with usermention

  //Checks permissions of user
  if (!message.member.hasPermission("KICK_MEMBERS"))
    return message.channel.send(
      "You don't have the permission to kick other users."
    );

  //Checks if soon to be kicked user has any admin permissions
  if (kUser.hasPermission("KICK_MEMBERS"))
    return message.channel.send(
      `Oops, looks like ${kUser} has admin permissions or is either an  equal to you or higher than you.`
    );

  let embed = new Discord.RichEmbed()
    .setTitle("## KICKED A USER FROM SERVER ##")
    .setDescription(
      "kick != ban. Kicking an user does not mean banning the user, the user can join back if given another invite."
    )
    .setColor("#f44e42")
    .addField("Kicked User", `${kUser} with ID : ${kUser.id}`)
    .addField("Kicked By", `${message.author}`)
    .addField("Kicked At", message.channel)
    .addField("Kicked On", message.createdAt)
    .addField("Reason", reason);

  let iChannel = message.guild.channels.find("name", "incidents"); //Checks for text channel to send kick message

  //Checks if server has an incidents channel
  if (!iChannel)
    return message.channel.send(
      "This server hasn't setup kicks/bans yet. To set it up, all you have to do is make a new text channel and give it the name `incidents`."
    );

  message.guild.member(kUser).kick(reason); //Kicks user
  message.delete().catch(O_o => {}); //Deletes nessage
  message.channel.send(
    `Kicked User.\nSuccessfully kicked ${kUser}, Reason: ${reason}\nFull kick report available at '#incidents' channel`
  ); //Sends comfirmation of kick

  return iChannel.send(embed); //Sends full report in incidents channel
};

module.exports.help = {
  name: "kick"
};
