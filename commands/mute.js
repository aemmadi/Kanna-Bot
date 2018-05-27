const Discord = require('discord.js');
const ms = require('ms');

module.exports.run = async(bot, message, args) => {
  let mute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!mute)
    return message.reply("Error. User not found, make sure you are using the right input: !mute <usermention> [time s/m/h/d].")
  if(!message.member.hasPermission('MANAGE_MESSAGES'))
    return message.channel.send("You don't have the permission to mute other users.");
  if(mute.hasPermission("MANAGE_MESSAGES"))
    return message.channel.send(`Oops, looks like ${mute} has admin permissions or is either an  equal to you or higher than you.`);
  let muteRole = message.guild.roles.find(`name`, "muted");

  //Creates a mute role, if one doesn't exist already
  if(!muteRole){
    try{
      muteRole = await message.guild.createRole({
        name: "muted",
        color: "#000000",
        permissions: []
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muteRole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch(e){
      console.log(e.stack);
    }
  }
  let muteTime = args[1];
  if(!muteTime)
    return message.reply("You need to specify a time. Syntax: !mute <usermention> [time s/m/h/d");
  await(mute.addRole(muteRole.id));
  message.channel.send(`<@${mute.id}> has been muted for ${ms(ms(muteTime))}`);
  setTimeout(function(){
    mute.removeRole(muteRole.id);
    message.channel.send(`<@${mute.id}> has been unmuted!`);
  }, ms(muteTime));
}

module.exports.help = {
  name: "mute"
}