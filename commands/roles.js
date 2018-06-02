const Discord = require('discord.js');

//Start Command
module.exports.run = async (bot, message, args) =>{
  if(!message.member.hasPermission("MANAGE_MEMBERS"))
    return message.channel.send("You don't have the permission to add/rmv roles on this server.");
  let rMember = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[1]));
  if(!rMember)
    return message.channel.send("Error. User not found, make sure you are using the right input: `!role [add/rmv] <usermention> {role-name}`.");
  let role = args.join(" ").slice(26);
  if(!role)
    return message.channel.send("Please Specify a Role!");
  let rName = message.guild.roles.find(`name`, role);
  if(!rName)
    return message.channel.send("Couldn't find the role!");

  //Checks if its addRole or removeRole
  if(args[0] == 'add'){
   if(rMember.roles.has(rName.id));
    await(rMember.addRole(rName.id));

  try {
    await rMember.send(`Congrats, you have been given the role '${rName.name}' on the server '${message.guild.name}'`)
  }catch(e){
    message.channel.send(`Congrats, <@${rMember.id}>, you have been given the role ${rName.name}. We  tried to DM, but ran into an error.`);
    }
  }

  //Checks if its addRole or removeRole
  else if(args[0] == 'rmv'){
    if(!rMember.roles.has(rName.id))
      return message.channel.send(`Sorry, ${rMember} doesn't have the role ${rName}`);
    await(rMember.removeRole(rName.id));
    
    try {
      await rMember.send(`You have been removed from the role '${rName.name}' on the server '${message.guild.name}'`);
    }catch(e){
      message.channel.send(`You have been removed from the role '${rName.name}' on the server '${message.guild.name}'. We tried to DM, but ran into an error`);
    }
  }

  //Asks user to check the syntax
  else{
    return message.channel.send("Make sure you got the syntax right.\n`!role [add/rmv] <usermention> {role-name}`");
  }
}
//End Command
//Prefix
module.exports.help = {
  name: "role"
}