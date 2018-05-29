const Discord = require('discord.js');

module.exports.run = async (bot, message, args) =>{
  if(!message.member.hasPermission("MANAGE_MEMBERS"))
    return message.channel.send("You don't have the permission to add/rmv roles on this server.");
  let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
  if(!rMember)
    return message.channel.send(`Error. User not found, make sure you are using the right input: !role [add/rmv] <usermention> {role-name}.`);
  let role = args.join(" ").slice(26);
  if(!role)
    return message.channel.send("Please Specify a Role!");
  let rName = message.guild.roles.find(`name`, role);
  if(!rName)
    return message.channel.send("Couldn't find the role!");
  if(args[0] == 'add'){
   if(rMember.roles.has(rName.id));
    await(rMember.addRole(rName.id));

  try {
    await rMember.send(`Congrats, you have been given the role '${rName.name}' on the server '${message.guild.name}'`)
  }catch(e){
    message.channel.send(`Congrats, <@${rMember.id}>, you have been given the role ${rName.name}. We  tried to DM, but ran into an error.`);
    }
  }
  else if(args[0] == 'rmv'){
    if(rMember.roles.has(rName.id));
      await(rMember.removeRole(rName.id));
    
    try {
      await rMember.send(`You have been removed from the role '${rName.name}' on the server '${message.guild.name}'`);
    }catch(e){
      message.channel.send(`You have been removed from the role '${rName.name}' on the server '${message.guild.name}'. We tried to DM, but ran into an error`);
    }
  }
  else{
    return message.channel.send("Make sure you got the syntax right.\n!role [add/rmv] <usermention> {role-name}");
  }
}

module.exports.help = {
  name: "role"
}