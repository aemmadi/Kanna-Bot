const Discord = require("discord.js");
const superagent = require("superagent");

//.ow <username#battletag> [platform pc/psn/xbl] - Shows basic overwatch profile stats
module.exports.run = async (bot, message, args) => {
  //Checks if username is provided
  if (!args[0])
    return message.channel.send(
      "Error. Please specify a username with a battleTag. `.ow <username#battleTag> [platform pc/psn/xbl]`"
    );

  let username = args[0];
  let result = checkUsername(username); //Converts username to API requirement. Ex: Kanna6501#1110 => Kanna6501-1110

  //Checks if battleTag is provided
  if (!result)
    return message.channel.send(
      "Error. Please provide your battle tag right after your username. `.ow <username#battleTag> [platform pc/psn/xbl]`"
    );

  username = username.replace("#", "-");

  //Checks if platform is provided
  if (!args[1])
    return message.channel.send(
      "Error. Please specify a platform pc/psn/xbl. `.ow <username#battleTag> [platform pc/psn/xbl]`"
    );

  let platform = "wrong";

  //Sets platform
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
    let profileStats = await getProfileStats(platform, username); //Gets basic stats
    let playerStats = await getPlayerStats(platform, username); //Gets detailed stats

    //prettier-ignore
    let embed = new Discord.RichEmbed()
      .setTitle(`## OVERWATCH STATS FOR ${profileStats.username.toUpperCase()} ##`)
      .setThumbnail(`${profileStats.portrait}`)
      .setColor("#f4d442")
      .addField(`Username`, `${profileStats.username}`, true)
      .addField(`Levels`, `**Game Level** : ${profileStats.level}\n**Endorsement Level** : ${profileStats.endorsement.level}`, true)
      .addBlankField()
      .addField(`Quickplay`, `${profileStats.username} has **Won ${profileStats.games.quickplay.won} games!**`)
      .addField(`Eliminations`, `${playerStats.stats.combat.quickplay[11].value}`, true)
      .addField(`Damage Done`, `${playerStats.stats.combat.quickplay[12].value}`, true)
      .addField(`Deaths`, `${playerStats.stats.combat.quickplay[4].value}`, true)
      .addField(`Final Blows`, `${playerStats.stats.combat.quickplay[10].value}`, true)
      .addField(`Solo Kills`, `${playerStats.stats.combat.quickplay[7].value}`, true)
      .addField(`Healing Done`, `${playerStats.stats.assists.quickplay[3].value}`, true)
      .addField(`Objective Kills`, `${playerStats.stats.combat.quickplay[9].value}`, true)
      .addField(`Objective Time`, `${playerStats.stats.combat.quickplay[8].value}`, true)
      .addBlankField()
      .addField(`Competitive`, `${profileStats.username} has **Won ${profileStats.games.competitive.won} games out of ${profileStats.games.competitive.played} total games!** and has a **Rank of ${profileStats.competitive.rank}** with a **Win Rate of ${profileStats.games.competitive.win_rate}%**`)
      .addField(`Eliminations`, `${playerStats.stats.combat.competitive[11].value}`, true)
      .addField(`Damage Done`, `${playerStats.stats.combat.competitive[12].value}`, true)
      .addField(`Deaths`, `${playerStats.stats.combat.competitive[4].value}`, true)
      .addField(`Final Blows`, `${playerStats.stats.combat.competitive[10].value}`, true)
      .addField(`Solo Kills`, `${playerStats.stats.combat.competitive[7].value}`, true)
      .addField(`Healing Done`, `${playerStats.stats.assists.competitive[3].value}`, true)
      .addField(`Objective Kills`, `${playerStats.stats.combat.competitive[9].value}`, true)
      .addField(`Objective Time`, `${playerStats.stats.combat.competitive[8].value}`, true)
      .addBlankField()
      .addField("Note", "If you like the bot and want it to be active, use the **`.donate`** command to support the bot's server costs. ");

    return message.channel.send(embed); //Sends stats
  }
  //.ow <username#battleTag> [platform pc/psn/xbl] top/heroes - Shows top heroes stats
  else if (args[2] == "top" || args[2] == "heroes") {
    let playerStats = await getPlayerStats(platform, username); //Gets basic stats
    let heroStats = await getHeroStats(playerStats); //Gets top heroes

    //prettier-ignore
    let embed = new Discord.RichEmbed()
      .setTitle(`## OVERWATCH TOP HEROES FOR ${playerStats.username.toUpperCase()} ##`)
      .setDescription("Hero Name - Games Won - Time Played")
      .setColor("#f4d442")
      .addField(`Quickplay`, `Main Heroes - Fluent Heroes`)
      .addField(`Main Heroes`, `1. **${heroStats.quickName[0]}** - ${heroStats.quickGames[0]} wins - ${heroStats.quickTime[0]}\n2. **${heroStats.quickName[1]}** - ${heroStats.quickGames[1]} wins - ${heroStats.quickTime[1]}\n3. **${heroStats.quickName[2]}** - ${heroStats.quickGames[2]} wins - ${heroStats.quickTime[3]}`, true)
      .addField(`Fluent Heroes`, `4. **${heroStats.quickName[3]}** - ${heroStats.quickGames[3]} wins - ${heroStats.quickTime[3]}\n5. **${heroStats.quickName[4]}** - ${heroStats.quickGames[4]} wins - ${heroStats.quickTime[4]}`, true)
      .addBlankField()
      .addField(`Competitive`, `Main Heroes - Fluent Heroes`)
      .addField(`Main Heroes`, `1. **${heroStats.compName[0]}** - ${heroStats.compGames[0]} wins - ${heroStats.compTime[0]}\n2. **${heroStats.compName[1]}** - ${heroStats.compGames[1]} wins - ${heroStats.compTime[1]}\n3. **${heroStats.compName[2]}** - ${heroStats.compGames[2]} - ${heroStats.compTime[3]}`, true)
      .addField(`Fluent Heroes`, `4. **${heroStats.compName[3]}** - ${heroStats.compGames[3]} wins - ${heroStats.compTime[3]}\n5. **${heroStats.compName[4]}** - ${heroStats.compGames[4]} wins - ${heroStats.compTime[4]}`, true)
      .addBlankField()
      .addField("Note", "If you like the bot and want it to be active, use the **`.donate`** command to support the bot's server costs. ");

    return message.channel.send(embed); //Sends stats
  }
  // else if (args[2] == "full") {
  //   let playerStats = await getPlayerStats(platform, username);
  //   //FULL COMBAT REPORT
  // }

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
    //API Access
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

  async function getHeroStats(body) {
    //QUICKPLAY
    let quickMainHeroes_name = []; //Names of heroes
    let quickMainHeroes_games = []; //Games won
    let quickMainHeroes_time = []; //Time played

    for (let i = 0; i < 5; i++) {
      quickMainHeroes_name.push(
        body.stats.top_heroes.quickplay.games_won[i].hero
      );
      quickMainHeroes_games.push(
        body.stats.top_heroes.quickplay.games_won[i].games_won
      );
    }
    for (let k = 0; k < 5; k++) {
      for (let i = 0; i < 100; i++) {
        if (
          body.stats.top_heroes.quickplay.played[i].hero ==
          quickMainHeroes_name[k]
        ) {
          quickMainHeroes_time.push(
            body.stats.top_heroes.quickplay.played[i].played
          );
          break;
        }
      }
    }
    //COMPETITIVE
    let compMainHeroes_name = []; //Names of heroes
    let compMainHeroes_games = []; //Games won
    let compMainHeroes_time = []; //Time played

    for (let i = 0; i < 5; i++) {
      compMainHeroes_name.push(
        body.stats.top_heroes.competitive.games_won[i].hero
      );
      compMainHeroes_games.push(
        body.stats.top_heroes.competitive.games_won[i].games_won
      );
    }
    for (let k = 0; k < 5; k++) {
      for (let i = 0; i < 100; i++) {
        if (
          body.stats.top_heroes.competitive.played[i].hero ==
          compMainHeroes_name[k]
        ) {
          compMainHeroes_time.push(
            body.stats.top_heroes.competitive.played[i].played
          );
          break;
        }
      }
    }
    return {
      quickName: quickMainHeroes_name,
      quickGames: quickMainHeroes_games,
      quickTime: quickMainHeroes_time,
      compName: compMainHeroes_name,
      compGames: compMainHeroes_games,
      compTime: compMainHeroes_time
    };
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
