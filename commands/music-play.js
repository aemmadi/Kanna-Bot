const Discord = require('discord.js');
const config = require('../config.json');
const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args) =>{
  //Checks if user in voice channel
  if(!message.member.voiceChannel)
    return message.channel.send("You must be in a voice channel for me to start playing music");
  //Checks if bot is already being used in the server
  if(message.guild.me.voiceChannel)
    return message.channel.send("Im busy at a different voice channel on the server. Try again later.");
  
  //Checks if user provided an URL/Search string for song
  if(!args[0])
    return message.channel.send("Please enter a youtube URL for me to load the song from.");

  //Checks if the URL is valid youtube URL
  let validate = await ytdl.validateURL(args[0]);
  if(!validate)
    return message.channel.send("Whoops, re-check the URL you gave me, I am getting an error while trying to play the song. ");
  
  //Music playback
  let info = await ytdl.getInfo(args[0]); //Gets info like song title, artist, channel name, etc
  let voiceChannel = message.member.voiceChannel;
  let connection = await voiceChannel.join();
  let stream = await ytdl.downloadFromInfo(info, {filter: 'audioonly'}); //Playback fails without this line. Uknown reasons.
  let dispatcher = await connection.playStream(stream, {filter: 'audioonly'}) //Plays audio from youtube video
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
