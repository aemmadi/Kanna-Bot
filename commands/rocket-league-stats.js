const Discord = require("discord.js");
const config = require("../config.json");
const superagent = require("superagent");
const rlApi = config.rlApi;

//!rl [platform pc/psn/xbl] <id>
module.exports.run = async (bot, message, args) => {
  //Checks if platform is provided
  if (!args[0])
    return message.channel.send(
      "Error. Make sure you specify a platform. `!rl [platform pc/psn/xbl] <id>`\n**<id>** is your STEAMID64/PSN Username/XboxGamerTag."
    );

  //Checks if id is provided
  if (!args[1])
    return message.channel.send(
      "Error. Make sure you specify an user id. `!rl [platform pc/psn/xbl] <id>`\n**<id>** is your STEAMID64/PSN Username/XboxGamerTag."
    );

  let username = args[1];

  if (args[0].toLowerCase() == "steam" || args[0].toLowerCase() == "pc") {
    let platformId = "1"; //Sets platform to API required format
    getPlayerStats(platformId, username, rlApi); //Gets player stats
  } else if (args[0].toLowerCase() == "psn" || args[0].toLowerCase() == "ps4") {
    let platformId = "2"; //Sets platform to API required format
    getPlayerStats(platformId, username, rlApi); //Gets player stats
  } else if (
    args[0].toLowerCase() == "xbl" ||
    args[0].toLowerCase() == "xboxone" ||
    args[0].toLowerCase() == "xbox"
  ) {
    let platformId = "3"; //Sets platform to API required format
    getPlayerStats(platformId, username, rlApi); //Gets player stats
  }

  async function getPlayerStats(platformId, username, rlApi) {
    //API Access
    let { body } = await superagent
      .get(
        `https://api.rocketleaguestats.com/v1/player?unique_id=${username}&platform_id=${platformId}`
      )
      .set("Authorization", rlApi)
      .on("error", err => {
        return message.channel.send(
          "Error Occurred. Make sure you got the syntax right. `!rl [platform pc/psn/xbl] <id>`\n**<id>** is your STEAMID64/PSN Username/XboxGamerTag.\n\n**Make sure your profile privacy settings are set to public**\n\n **If this problem keeps arising, make sure you use the `!issue` command to report any issues with the bot**"
        ); //Error message in case API fails
      });

    let embed = new Discord.RichEmbed()
      .setColor("#4286f4")
      .setTitle(
        `## ROCKET LEAGUE STATS FOR ${body.displayName.toUpperCase()} ##`
      )
      .setImage(body.signatureUrl);
    return message.channel.send(embed); //Sends player stats
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
