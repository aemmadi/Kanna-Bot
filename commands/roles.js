const Discord = require("discord.js");

//.role [add/rmv] <usermention> {role-name} - adds/removes user to/from role
module.exports.run = async (bot, message, args) => {
  //Checks user permissions
  if (!message.member.hasPermission("MANAGE_MEMBERS"))
    return message.channel.send(
      "You don't have the permission to add/rmv roles on this server."
    );

  //User to add/rmv role
  let rMember = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[1])
  );

  //Checks if usermention is specified
  if (!rMember)
    return message.channel.send(
      "Error. User not found, make sure you are using the right input: `.role [add/rmv] <usermention> {role-name}`."
    );

  let role = args.join(" ").slice(26); //Gets rid of user id that comes after usermention

  //Checks if role is provided
  if (!role) return message.channel.send("Please Specify a Role!");

  let rName = message.guild.roles.find(`name`, role); //Gets the role

  //Checks if role exists in server
  if (!rName)
    return message.channel.send(
      `Couldn't find the role ${role} on this server!`
    );

  //Checks if its addRole or removeRole
  if (args[0] == "add") {
    if (rMember.roles.has(rName.id)); //Checks if role is in server
    await rMember.addRole(rName.id); //Adds user to role

    try {
      await rMember.send(
        `Congrats, you have been given the role **'${
          rName.name
        }'** on the server **'${message.guild.name}'**`
      ); //Informs added user of his new role (DM)
    } catch (e) {
      message.channel.send(
        `Congrats, <@${rMember.id}>, you have been given the role ${
          rName.name
        }. We tried to DM, but ran into an error.`
      ); //Send message in server if DM fails
    }
  }

  //Checks if its addRole or removeRole
  else if (args[0] == "rmv") {
    //Checks if user is in role
    if (!rMember.roles.has(rName.id))
      return message.channel.send(
        `Sorry, ${rMember} doesn't have the role ${rName}`
      );
    await rMember.removeRole(rName.id); //Removes user from role

    try {
      await rMember.send(
        `You have been removed from the role **'${
          rName.name
        }'** on the server **'${message.guild.name}'**`
      ); //Informs user of his removal from role (DM)
    } catch (e) {
      message.channel.send(
        `You have been removed from the role '${rName.name}' on the server '${
          message.guild.name
        }'. We tried to DM, but ran into an error`
      ); //Sends message in server if DM fails
    }
  } else {
    return message.channel.send(
      "Make sure you got the syntax right.\n`.role [add/rmv] <usermention> {role-name}`"
    ); //Error message
  }
};

module.exports.help = {
  name: "role"
};
