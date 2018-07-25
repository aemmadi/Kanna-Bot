const Discord = require('discord.js');
const superagent = require('superagent');
const config = require('../config.json');
const lolApi = config.lolApi;

// !lol <region> [summoner-name] - Player Stats
// !lol <champion-name> - Champion Info/Stats
// !lol <item-name> - Item Info
module.exports.run = async (bot, message, args) => {
  //Level, true
  //Region, true
  //Past Games
  //Top Champions
  //Ranked Stats
  //Last Game
  //Live Game

  let region = args[0];
  let name = args[1];

  //TODO: FUNCTIONS

  let { body } = await superagent.get(`https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=${lolApi}`);
  let userInfo = body;
    let summonerId = userInfo.id;
    let summonerName = userInfo.name;
    let summonerLevel = userInfo.summonerLevel;
 
  let { body } = await superagent.get(`https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/${summonerId}?api_key=${lolApi}`);
  let masteryInfo = body;
  console.log(masteryInfo);
  

  
}

module.exports.help = {
  name: "lol"
}