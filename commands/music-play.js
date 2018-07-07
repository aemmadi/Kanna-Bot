const Discord = require('discord.js');
const config = require('../config.json');
const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args, map) =>{
  //Checks for valid commands
  if(!message.member.voiceChannel)
    return message.channel.send("You must be in a voice channel for me to start playing music");
  if(message.guild.me.voiceChannel)
    return message.channel.send("Im busy at a different voice channel on the server. Try again later.");

  //Checks if user gave source for music playback
  if(!args[0])
    return message.channel.send("Please enter a youtube URL for me to load the song from.");

  //Checks if the URL given by user is from YouTube
  let validate = await ytdl.validateURL(args[0]);
  if(!validate)
    return message.channel.send("Whoops, re-check the URL you gave me, I am getting an error while trying to play the song. ");
  
  let info = await ytdl.getInfo(args[0]);
  //Queue for songs requested by users
  let data = map.get({
    connection: message.member.voiceChannel.join(),
    queue: [],
    guildID: message.guild.id
  });
  // if(!data.connection)
  //   data.connection = await message.member.voiceChannel.join();
  // if(!data.queue)
  //   data.queue = [];
  // data.guildID = message.guild.id;

  data.map.get(queue).push({
    songTitle: info.title,
    requester: message.author.tag,
    url: args[0],
    channel: message.channel.id
  });

  if(!data.dispatcher){
    play(bot, map, data);
  }else{
    message.channel.send(`Added to Queue: ${info.title} || Requested by: ${message.author.tag}`);
  }

  map.set(message.guild.id, data);

  async function play(bot, map, data){
    bot.channels.get(data.queue[0].announceChannel).send(`Now Playing ${data.queue[0]} || Requested by: ${data.queue[0].requester}`);
    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {filter: 'audioonly'}));
    data.dispatcher.guildID = data.guildID;
    data.dispatcher.on('end', function() {
      finish(bot, map, data);
    })
  }

  function finish(bot, map, data){
    let fetched = map.get(dispatcher.guildID);
    fetched.queue.shift();

    if(fetched.queue.length >  0){
      map.get(dispatcher.guildID, fetched);
      play(bot, map, data);
    }else{
      map.delete(dispatcher.guildID);
      let vc = bot.guilds.get(dispatcher.guildID).me.voiceChannel;
      if(vc)
        vc.leave();
    }
  }
  // //Music playback
  // let info = await ytdl.getInfo(args[0]); 
  // let voiceChannel = message.member.voiceChannel;
  // let connection = await voiceChannel.join();
  // let stream = await ytdl.downloadFromInfo(info, {filter: 'audioonly'}); 
  // let dispatcher = await connection.playStream(stream, {filter: 'audioonly'})
  //   .on("end", end => {
  //     message.channel.send(`Finished Playing: ${info.title}`);
  //     voiceChannel.leave();
  //   })
  //   .on("error", error => {
  //     console.error(error);
  //     message.channel.send("Error Occurred during playback. Try again later.");
  //   });
  // return message.channel.send(`Now Playing: ${info.title}`);
}

module.exports.help = {
  name: "play"
}
