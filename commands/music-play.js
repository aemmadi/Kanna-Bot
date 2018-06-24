const Discord = require('discord.js');
const config = require('../config.json');
const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args) =>{
  if(!message.member.voiceChannel)
    return message.channel.send("You must be in a voice channel for me to start playing music");
  if(message.guild.me.voiceChannel)
    return message.channel.send("Im busy at a different voice channel on the server. Try again later.");
  
  if(!args[0])
    return message.channel.send("Please enter a youtube URL for me to load the song from.");

  let validate = await ytdl.validateURL(args[0]);
  if(!validate)
    return message.channel.send("Whoops, re-check the URL you gave me, I am getting an error while trying to play the song. ");

  let info = await ytdl.getInfo(args[0]);
  let voiceChannel = message.member.voiceChannel;
  let connection = await voiceChannel.join();
  let dispatcher = await connection.playStream(ytdl(args[0], {filter: 'audioonly'}))
    .on("end", end => {
      message.channel.send(`Finished Playing: ${info.title}`);
      voiceChannel.leave();
    })
    .on("error", error => {
      console.error(error);
      message.channel.send("Error Occurred during playback. Try again later.");
    });
  return message.channel.send(`Now Playing: ${info.title}`);
}

module.exports.help = {
  name: "play"
}
