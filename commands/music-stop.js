const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  //Checks if user is in voice channel
  if (!message.member.voiceChannel)
    return message.channel.send("You must be in a voice channel for me to start playing music");
  //Checks if user in different voice channel than bot
  if(message.guild.me.voiceChannelID !== message.member.voiceChannelID)
    return message.channel.send("Im busy at a different voice channel on the server. Try again later.");
  
  //Leaves voice channel
  message.guild.me.voiceChannel.leave();
  return message.channel.send('Stopped playing music.');
}

module.exports.help = {
  name: "stop"
}