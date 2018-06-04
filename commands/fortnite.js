const Discord = require('discord.js');
const config = require('../config.json');
const Fortnite = require('fortnite');
const ftnApi = new Fortnite(config.ftnApi);

module.exports.run = async (bot, message, args) =>{
  let username = args[0];
  let platform = args[1] || "pc";

  if(!username)
    return message.channel.send("Username not provided. Use the right syntax: `!fbr <epic-username> [platform pc/xbl/psn]`");

  let data = ftnApi.user(username, platform).then(data => {
    let stats = data.stats;
   // let solo = stats.solo;
   //   let solo_score = solo.Mode["score"];
   //   console.log(solo_score);
  //  let seasonSolo = stats.current_solo;
   // let duo = stats.duo;
   // let seasonDuo = stats.current_duo;
   // let squad = stats.squad;
  //  let seasonSquad = stats.current_squad;
    let lifetime = stats.lifetime;
      let score = lifetime[6]['Score'];
      let matches = lifetime[7]['Matches Played'];
      let wins = lifetime[8]['Wins'];
      let winPercent = lifetime[9]['Win%'];
      let kills = lifetime[10]['Kills'];
      let kd = lifetime[11]['K/d'];

    let embed = new Discord.RichEmbed()
      .setTitle("## FORTNITE STATS ##")
      .setThumbnail("https://fortnitetracker.com/Images/General/logo.png")
      .setDescription(`Lifetime stats for ${data.username}`)
      .setColor("#42b6f4")
      .addField("Wins", wins, true)
      .addField("Kills", kills, true)
      .addField("K/D", kd, true)
      .addField("Matches Played", matches, true)
      .addField("Score", score, true)
      .addField("Win Percentage", winPercent, true);

      return message.channel.send(embed);
  }).catch(e => {
    console.log(e);
    message.channel.send("Error. User not found, make sure you are using the right syntax: `!fbr <epic-username> [platform pc/xbl/psn]`.");
  })
}

module.exports.help = {
  name: "fbr"
}