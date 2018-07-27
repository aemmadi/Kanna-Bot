const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setTitle("## COMMANDS ##")
    .setColor("#7ff441")
    .addField("General", "`!info` : Shows bot and server info\n`!report <usermention>` : Allows user to report users\n`!kick <usermention> [reason]` : Allows admin to kick another user\n`!ban <usermention> [reason]` : Allows admin to ban users\n`!mute <usermention> [time s/m/h/d]` : Allows admin to mute an user for a certain period\n`!role [add/rmv] <usermention> {role-name}` : Allows admin to add or remove an user from a role")
    .addField("Fortnite", "`!fbr <epic-username> [platform pc/xbl/psn]` : Shows lifetime stats.\n`!fbr <epic-username> [platform pc/xbl/psn] {mode all/season}` : Looks up stats for solo/duo/squad or season stats.\n`!drop` : Randomly picks a spot on the fortnite map")
    .addField("League of Legends", "`!lol <summoner-name>` : Shows a basic profile overview of user.")
    .addField("Rocket League", "`!rl [platform pc/psn/xbl] <id>`  **<id>** refers to your STEAMID64, PSN Username, XboxGamerTag respectively : Shows Rocket League Stats")
    .addField("Crypto", "`!crypto` : Shows global statistics of crpytocurrencies\n`!crypto top` : Shows Top 10 crypto stats")
    .addField("Feedback", "`!issue` : Report an issue with the bot. Any unresponsive commands.\n`!donate` : Can keep the bot running by donating for server costs :)")
    .addField("Misc.", "`!flip` : Flips a coin and replies HEADS or TAILS\n`!dog` : Random dog image or gif\n`!roll` : Rolls a dice");
  return message.channel.send(embed);
}

module.exports.help = {
  name: "help"
}