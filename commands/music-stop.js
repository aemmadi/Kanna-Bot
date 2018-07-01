const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  //Checks for valid commands
  if (!message.member.voiceChannel)
    return message.channel.send("You must be in a voice channel for me to start playing music");
  if (message.guild.me.voiceChannel)
    return message.channel.send("Im busy at a different voice channel on the server. Try again later.");
  
  //Checks if the user is in the same voice channel as the bot
  if(message.guild.me.voiceChannelID !== message.member.voiceChannelID)
    return message.channel.send("Sorry, you are not in the same voice channel as me.");
  
  //leaves channel
  message.channel.send("Stopping and Leaving Channel");
  message.guild.me.voiceChannel.leave();
}

module.exports.help = {
  name: "stop"
}