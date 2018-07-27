const Discord = require("discord.js");
const config = require("../config.json");
const superagent = require('superagent');
const rlApi = config.rlApi;

module.exports.run = async (bot, message, args) => {
  if(!args[0])
    return message.channel.send("Error. Make sure you specify a platform. `!rl [platform pc/psn/xbl] <id>`\n**<id>** is your STEAMID64/PSN Username/XboxGamerTag.");
  if (!args[1])
    return message.channel.send("Error. Make sure you specify an user id. `!rl [platform pc/psn/xbl] <id>`\n**<id>** is your STEAMID64/PSN Username/XboxGamerTag.");
  let username = args[1];
  
  if(args[0].toLowerCase() == 'steam' || args[0].toLowerCase() == 'pc'){
    let platformId = '1';
    getPlayerStats(platformId, username, rlApi);

  }else if(args[0].toLowerCase() == 'psn' || args[0].toLowerCase() == 'ps4'){
    let platformId = '2';
  }else if(args[0].toLowerCase() == 'xbl' || args[0].toLowerCase() == 'xboxone' || args[0].toLowerCase() == 'xbox'){
    let platformId = '3';
  }

  async function getPlayerStats(platformId, username, rlApi){
    let { body } = await superagent.get(`https://api.rocketleaguestats.com/v1/player?unique_id=${username}&platform_id=${platformId}`).set('Authorization', rlApi);

    let embed = new Discord.RichEmbed()
      .setColor("#4286f4")
      .setTitle(`## ROCKET LEAGUE STATS FOR ${body.displayName.toUpperCase()} ##`)
      .setImage(body.signatureUrl);
    return message.channel.send(embed);
  }


 //link command
 //!rl link <platform> [id] ~ stores 
 //message.author.tag
 //stores in db
 //next time request
 //get id from db
 //use api and display stats.
};

module.exports.help = {
  name: "rl"
};
