const Discord = require('discord.js');
const config = require('../config.json');
const Fortnite = require('fortnite');
const ftnApi = new Fortnite(config.ftnApi);

module.exports.run = async (bot, message, args) =>{
  let username = args[0];
  let platform = args[1] || "pc";
  let mode = "life";
  if(args[2]){
    if (args[2].toLowerCase() == "all" || args[2].toLowerCase() == "season") {
      mode = args[2];
    }
  }

  // if (mode !== 'all' || mode !== 'season' || mode !== 'life'){
  //   console.log(mode);
  //   return message.channel.send("Error. Use the right syntax: `!fbr <epic-username> [platform pc/xbl/psn] {mode all/season}`");
  // }
  if(!username)
    return message.channel.send("Username not provided. Use the right syntax: `!fbr <epic-username> [platform pc/xbl/psn] {mode all/season}`");

  let data = ftnApi.user(username, platform).then(data => {
    let stats = data.stats;
    if(mode == 'life'){
      let lifetime = stats.lifetime;
        let lifeScore = lifetime[6]['Score'];
        let lifeMatches = lifetime[7]['Matches Played'];
        let lifeWins = lifetime[8]['Wins'];
        let lifeWinPercent = lifetime[9]['Win%'];
        let lifeKills = lifetime[10]['Kills'];
        let lifeKd = lifetime[11]['K/d'];

      let lifeEmbed = new Discord.RichEmbed()
        .setTitle("## FORTNITE LIFETIME STATS ##")
        .setThumbnail("https://blog.lifetime.com/imagecache/Blog/Generic%20Lifetime%20Banner%20Blog.png")
        .setDescription(`Lifetime stats for ${data.username}`)
        .setColor("#42b6f4")
        .addField("Wins", lifeWins, true)
        .addField("Kills", lifeKills, true)
        .addField("K/D", lifeKd, true)
        .addField("Matches Played", lifeMatches, true)
        .addField("Score", lifeScore, true)
        .addField("Win Percentage", lifeWinPercent, true);
      message.channel.send(lifeEmbed);
    }
    
    if(mode == 'all'){
      let solo = stats.solo;
        let soloScore = solo.score;
        let soloMatches = solo.matches;
        let soloWins = solo.wins;
        let soloKills = solo.kills;
        let soloKd = solo.kd;

      let soloEmbed = new Discord.RichEmbed()
        .setTitle("## FORTNITE SOLO STATS ##")
        .setThumbnail("https://s3.amazonaws.com/media.atp/42511_solof.png")
        .setDescription(`Solo stats for ${data.username}`)
        .setColor("#42b6f4")
        .addField("Wins", soloWins, true)
        .addField("Kills", soloKills, true)
        .addField("K/D", soloKd, true)
        .addField("Matches Played", soloMatches, true)
        .addField("Score", soloScore, true);
      message.channel.send(soloEmbed);

      let duo = stats.duo;
        let duoScore = duo.score;
        let duoMatches = duo.matches;
        let duoWins = duo.wins;
        let duoKills = duo.kills;
        let duoKd = duo.kd;

      let duoEmbed = new Discord.RichEmbed()
        .setTitle("## FORTNITE DUO STATS ##")
        .setThumbnail("http://www.dualski.com/wp-content/uploads/2015/08/Duo.png")
        .setDescription(`Duo stats for ${data.username}`)
        .setColor("#42b6f4")
        .addField("Wins", duoWins, true)
        .addField("Kills", duoKills, true)
        .addField("K/D", duoKd, true)
        .addField("Matches Played", duoMatches, true)
        .addField("Score", duoScore, true);
      message.channel.send(duoEmbed);

      let squad = stats.squad;
        let squadScore = squad.score;
        let squadMatches = squad.matches;
        let squadWins = squad.wins;
        let squadKills = squad.kills;
        let squadKd = squad.kd;

      let squadEmbed = new Discord.RichEmbed()
        .setTitle("## FORTNITE SQUAD STATS ##")
        .setThumbnail("https://images.joinsquad.com/Logos/squadlogo_black_hires.png")
        .setDescription(`Squad stats for ${data.username}`)
        .setColor("#42b6f4")
        .addField("Wins", squadWins, true)
        .addField("Kills", squadKills, true)
        .addField("K/D", squadKd, true)
        .addField("Matches Played", squadMatches, true)
        .addField("Score", squadScore, true);
      message.channel.send(squadEmbed);
    }
  }).catch(e => {
    console.log(e);
    message.channel.send("Error. User not found, make sure you are using the right syntax: `!fbr <epic-username> [platform pc/xbl/psn] {mode all/season}`.");
  })
}

module.exports.help = {
  name: "fbr"
}