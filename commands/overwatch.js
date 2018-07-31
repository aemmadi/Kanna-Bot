const Discord = require('discord.js');
const superagent = require('superagent');

//!ow <username#battletag> [platform pc/psn/xbl]
module.exports.run = async (bot, message, args) => {
  if(!args[0])
    return message.channel.send("Error. Please specify a username with a battleTag. `!ow <username#battleTag> [platform pc/psn/xbl]`");

  let username = args[0];
  let result = checkUsername(username);

  if(!result)
    return message.channel.send("Error. Please provide your battle tag right after your username. `!ow <username#battleTag> [platform pc/psn/xbl]`");
  
  username = username.replace('#', '-');
  
  if(!args[1])
    return message.channel.send("Error. Please specify a platform pc/psn/xbl. `!ow <username#battleTag> [platform pc/psn/xbl]`");

  let platform = "wrong";

  if(args[1].toLowerCase() == 'pc'){
    platform = "pc";
  } else if (args[1].toLowerCase() == 'psn'){
    platform = "psn";
  } else if (args[1].toLowerCase() == 'xbl'){
    platform = "xbl";
  }

  if(platform == "wrong")
    return message.channel.send("Error. Please specify a **valid** platform pc/psn/xbl. `!ow <username#battleTag> [platform pc/psn/xbl]`");
  
  let { body } = await superagent.get(`http://ow-api.herokuapp.com/profile/${platform}/global/${username}`).on("error", err => {
    //console.error(err);
    return message.channel.send("Error occurred while retrieving player stats. Please try again later. `!ow <username#battleTag> [platform pc/psn/xbl]`\n\n **If this problem keeps arising, make sure you use the `!issue` command to report any issues with the bot**");
  });

  if (Object.keys(body).length === 0)
    return message.channel.send("Error occurred while retrieving player stats. Please try again later. `!ow <username#battleTag> [platform pc/psn/xbl]`\n\n **If this problem keeps arising, make sure you use the `!issue` command to report any issues with the bot**");
  
  let embed = new Discord.RichEmbed()
    .setTitle(`## OVERWATCH STATS FOR ${body.username.toUpperCase()} ##`)
    .setThumbnail(`${body.portrait}`)
    .setColor('#f4d442')
    .addField(`Username`, `${body.username}`, true)
    .addField(`Levels`, `**Game Level** : ${body.level}\n**Endorsement Level** : ${body.endorsement.level}`, true)
    .addField(`Quickplay`, `**Wins** : ${body.games.quickplay.won}`, true)
    .addField(`Competitive`, `**Rank** : ${body.competitive.rank}\n**Wins** : ${body.games.competitive.won}\n**Matches Played** : ${body.games.competitive.played}\n**Win Rate** : ${body.games.competitive.win_rate}`, true);
  
  return message.channel.send(embed);

  function checkUsername(username){
    let result = false;
    for (let i = 0; i < username.length; i++) {
      if (username.charAt(i) == '#') {
        result = true;
      }
    }
    return result;
  }
}

module.exports.help = {
  name: "ow"
}