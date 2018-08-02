const Discord = require("discord.js");

//!report <user-mention> [reason]
module.exports.run = async (bot, message, args) => {
  //User to report
  let rUser = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );

  //Checks if usermention is provided
  if (!rUser)
    return message.channel.send(
      "Error. User not found, make sure you are using the right input: `!report <usermention> [reason]`."
    );

  let reason = args.join(" ").slice(22); //Gets rid of user id that comes after usermention

  let embed = new Discord.RichEmbed()
    .setTitle("## REPORTED DETAILS ##")
    .setDescription(
      "Report != kick/ban. Reporting a user gives admin a reason to keep an eye on the user reported"
    )
    .setColor("#f46441")
    .addField("Reported User", `${rUser} with ID : ${rUser.id}`)
    .addField("Reported By", `${message.author}`)
    .addField("Channel", message.channel)
    .addField("Reported Time", message.createdAt)
    .addField("Reason", reason);

  let rChannel = message.guild.channels.find("name", "reports"); //Finds reports channel in server

  //Checks if report channel exists
  if (!rChannel)
    return message.channel.send(
      "This server hasn't setup reports yet. To set it up, all you have to do is make a new text channel and give it the name `reports`."
    );

  message.delete().catch(O_o => {}); //Deletes message
  message.channel.send(
    `Report sent\nSuccessfully reported ${rUser}, Reason: ${reason}\nFull report available at '#reports' channel`
  ); //Sends confirmation of report

  return rChannel.send(embed); //Sends report
};

module.exports.help = {
  name: "report"
};
