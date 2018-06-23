const Discord = require('discord.js');
const config = require('../config.json');
const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args) =>{
  if(args[0] == 'play'){
    const voiceChannel = message.member.voiceChannel;
    if(!voiceChannel)
      return message.channel.send("You must be in a voice channel for me to play music.");

    // const permissions = voiceChannel.permissionsFor(message.bot.user);
    // if(!permissions.has('CONNECT'))
    //   return message.channel.send("I dont have the Administrator permissions on this server. I can't work without it.");
    // if(!permissions.has('SPEAK'))
    //   return message.channel.send("I dont have the Administrator permissions on this server. I can't work without it.");

    try{
      let connection = await voiceChannel.join();
    }catch(error){
      console.error(`I could not join the Voice Channel in the server : ${bot.guilds.size}, because ${error}`);
      return message.channel.send("Error occurred. Unable to join voice channel. Try again later.");
    }

    const dispatcher = connection.playStream(ytdl(args[1]))
      .on('end', () => {
        message.channel.send("Song ended, playing next song if queued.");
        voiceChannel.leave();
      })
      .on('error', error => {
        message.channel.send(`Error Ocurred. ${error}`);
      });
    dispatcher.setVolumeLogarithmic(5 / 5);
  }
}


module.exports.help = {
  name: "music"
}
