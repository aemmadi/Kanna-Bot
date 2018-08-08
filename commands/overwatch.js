const Discord = require("discord.js");
const superagent = require("superagent");

//!ow <username#battletag> [platform pc/psn/xbl]
module.exports.run = async (bot, message, args) => {
  //Checks if username is provided
  if (!args[0])
    return message.channel.send(
      "Error. Please specify a username with a battleTag. `!ow <username#battleTag> [platform pc/psn/xbl]`"
    );

  let username = args[0];
  let result = checkUsername(username); //Converts username to API requirement. Ex: Kanna6501#1110 => Kanna6501-1110

  //Checks if battleTag is provided
  if (!result)
    return message.channel.send(
      "Error. Please provide your battle tag right after your username. `!ow <username#battleTag> [platform pc/psn/xbl]`"
    );

  username = username.replace("#", "-");

  //Checks if platform is provided
  if (!args[1])
    return message.channel.send(
      "Error. Please specify a platform pc/psn/xbl. `!ow <username#battleTag> [platform pc/psn/xbl]`"
    );

  let platform = "wrong";

  if (args[1].toLowerCase() == "pc") {
    platform = "pc";
  } else if (args[1].toLowerCase() == "psn") {
    platform = "psn";
  } else if (args[1].toLowerCase() == "xbl") {
    platform = "xbl";
  }

  //Checks if provided platform matches with required platform format pc/psn/xbl
  if (platform == "wrong")
    return message.channel.send(
      "Error. Please specify a **valid** platform pc/psn/xbl. `!ow <username#battleTag> [platform pc/psn/xbl]`"
    );

  if (!args[2]) {
    let profileStats = await getProfileStats(platform, username);
    let playerStats = await getPlayerStats(platform, username);

    //prettier-ignore
    let embed = new Discord.RichEmbed()
      .setTitle(`## OVERWATCH STATS FOR ${profileStats.username.toUpperCase()} ##`)
      .setThumbnail(`${profileStats.portrait}`)
      .setColor("#f4d442")
      .addField(`Username`, `${profileStats.username}`, true)
      .addField(`Levels`, `**Game Level** : ${profileStats.level}\n**Endorsement Level** : ${profileStats.endorsement.level}`, true)
      .addBlankField()
      .addField(`Quickplay`, `**Wins** : ${profileStats.games.quickplay.won}`, true)
      .addField(`Competitive`, `**Rank** : ${profileStats.competitive.rank}\n**Wins** : ${profileStats.games.competitive.won}\n**Matches Played** : ${profileStats.games.competitive.played}\n**Win Rate** : ${profileStats.games.competitive.win_rate}%`, true)
      .addBlankField()
      .addField(`Quickplay`, `**Melee Kills** : ${playerStats.stats.combat.quickplay[0].value}\n**Environment Kills** : ${playerStats.stats.combat.quickplay[1].value}\n**Multi Kills** : ${playerStats.stats.combat.quickplay[2].value}\n**Barrier Damage** : ${playerStats.stats.combat.quickplay[3].value}\n**Deaths** : ${playerStats.stats.combat.quickplay[4].value}\n**Hero Damage** : ${playerStats.stats.combat.quickplay[5].value}\n**Solo Kills** : ${playerStats.stats.combat.quickplay[7].value}\n**Objective Time** : ${playerStats.stats.combat.quickplay[8].value}\n**Objective Kills** : ${playerStats.stats.combat.quickplay[9].value}\n**Final Blows** : ${playerStats.stats.combat.quickplay[10].value}\n**Eliminations** : ${playerStats.stats.combat.quickplay[11].value}\n**All Damage** : ${playerStats.stats.combat.quickplay[12].value}\n**Time Played** : ${playerStats.stats.game.quickplay[0].value}`, true)
      .addField(`Competitive`, `**Melee Kills** : ${playerStats.stats.combat.competitive[0].value}\n**Environment Kills** : ${playerStats.stats.combat.competitive[1].value}\n**Multi Kills** : ${playerStats.stats.combat.competitive[2].value}\n**Barrier Damage** : ${playerStats.stats.combat.competitive[3].value}\n**Deaths** : ${playerStats.stats.combat.competitive[4].value}\n**Hero Damage** : ${playerStats.stats.combat.competitive[5].value}\n**Solo Kills** : ${playerStats.stats.combat.competitive[7].value}\n**Objective Time** : ${playerStats.stats.combat.competitive[8].value}\n**Objective Kills** : ${playerStats.stats.combat.competitive[9].value}\n**Final Blows** : ${playerStats.stats.combat.competitive[10].value}\n**Eliminations** : ${playerStats.stats.combat.competitive[11].value}\n**All Damage** : ${playerStats.stats.combat.competitive[12].value}\n**Time Played** : ${playerStats.stats.game.competitive[0].value}`, true);

    return message.channel.send(embed); //Sends stats
  } else {
    if (args[2] != "heroes")
      return message.channe.send(
        "Error. Make sure you got the syntax right.\n`.ow <username#battleTag> [platform pc/psn/xbl]` - Shows player game stats\n`.ow <username#battleTag> [platform pc/psn/xbl] heroes` - Shows player hero stats"
      );

    let playerStats = await getPlayerStats(platform, username);
    //ADD TOP HEROES
  }

  async function getProfileStats(platform, username) {
    //Accesses the API
    let { body } = await superagent
      .get(`http://ow-api.herokuapp.com/profile/${platform}/global/${username}`)
      .on("error", err => {
        //console.error(err);
        return message.channel.send(
          "Error occurred while retrieving player stats. Please try again later. `!ow <username#battleTag> [platform pc/psn/xbl]`\n\n **If this problem keeps arising, make sure you use the `!issue` command to report any issues with the bot**"
        );
      });

    //API error handling
    if (Object.keys(body).length === 0)
      return message.channel.send(
        "Error occurred while retrieving player stats. Please try again later. `!ow <username#battleTag> [platform pc/psn/xbl]`\n\n **If this problem keeps arising, make sure you use the `!issue` command to report any issues with the bot**"
      );

    //Checks if profile is set to private
    if (body.private)
      return message.reply(
        "Blizzard is not letting me get the player stats. Player profile needs to be public to have access to stats. You can do it by going to **Options > Social > Change profile to public** in the game client."
      );

    return body;
  }

  async function getPlayerStats(platform, username) {
    let { body } = await superagent
      .get(`http://ow-api.herokuapp.com/stats/${platform}/global/${username}`)
      .on("error", err => {
        //console.error(err);
        return message.channel.send(
          "Error occurred while retrieving player stats. Please try again later. `!ow <username#battleTag> [platform pc/psn/xbl]`\n\n **If this problem keeps arising, make sure you use the `!issue` command to report any issues with the bot**"
        );
      });

    //API error handling
    if (Object.keys(body).length === 0)
      return message.channel.send(
        "Error occurred while retrieving player stats. Please try again later. `!ow <username#battleTag> [platform pc/psn/xbl]`\n\n **If this problem keeps arising, make sure you use the `!issue` command to report any issues with the bot**"
      );

    //Checks if profile is set to private
    if (body.private)
      return message.reply(
        "Blizzard is not letting me get the player stats. Player profile needs to be public to have access to stats. You can do it by going to **Options > Social > Change profile to public** in the game client."
      );

    return body;
  }

  function checkUsername(username) {
    let result = false;
    for (let i = 0; i < username.length; i++) {
      if (username.charAt(i) == "#") {
        result = true;
      }
    }
    return result;
  }
};

module.exports.help = {
  name: "ow"
};
