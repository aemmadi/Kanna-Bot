const Discord = require("discord.js");
const superagent = require("superagent");
const config = require("../config.json");
const lolApi = config.lolApi;

// .lol <region> [summoner-name] - Player Stats
// .lol <champion-name> - Champion Info/Stats
// .lol <item-name> - Item Info
module.exports.run = async (bot, message, args) => {
  //Checks if username is provided
  if (!args[0])
    return message.channel.send(
      "Error. Make sure you specify a vaild username. `.lol <summoner-name>`"
    );

  let name = args[0];

  let summonerData = await getUserInfo(name, lolApi); //Gets summoner info
  let masteryData = await getMasteryInfo(name, lolApi); //Gets champion level
  let championData = await getChampionData(name, lolApi); //Gets champion name

  /* IGNORE THIS (Its just a RANT about my frustration with League of Legends API)
  Why RIOT why? You have decent documentation (ignoring the time spent on dev forums cuz RIOT has no explicit details). Why Can't you have a normal API like everyone else. Take rocket league for example, one call to the API and BOOM done, you have player stats. But for League, I have to call the API 5 times just to get basic stats. One for getting summoner id, cuz champion mastery level only works with id not username (stupid, considering username's are unique), and after getting mastery level guess what, they return champion id instead of the name. I mean what am I supposed to do with an id? So i have to call their API again to get the name, but wait their API is split based on versions (STATIC API). I mean who still uses a freakin STATIC API nowadays? We ain't in 2005. Anyway so I have to make another call to get the latest league version and search the champion id's for the name. Phew, 5 Calls to just get basic profile stats. Can't even imagine how many it takes for normal player stats. 
 */

  let embed = new Discord.RichEmbed()
    .setTitle(
      `## LEAGUE OF LEGENDS STATS FOR ${summonerData.summonerName.toUpperCase()} ##`
    )
    .setDescription("Profile Overview")
    .setThumbnail(
      "https://upload.wikimedia.org/wikipedia/en/7/77/League_of_Legends_logo.png"
    )
    .setColor("#e5f442")
    .addField("Name", `${summonerData.summonerName}`, true)
    .addField("Level", `${summonerData.summonerLevel}`, true)
    .addField(
      "Main Champions",
      `1. ${championData[0]} **[${masteryData[0].championLevel}]** : ${
        masteryData[0].championPoints
      }\n2. ${championData[1]} **[${masteryData[1].championLevel}]** : ${
        masteryData[1].championPoints
      }\n3. ${championData[2]} **[${masteryData[2].championLevel}]** : ${
        masteryData[2].championPoints
      }`,
      true
    )
    .addField(
      "Fluent Champions",
      `4. ${championData[3]} **[${masteryData[3].championLevel}]** : ${
        masteryData[3].championPoints
      }\n5. ${championData[4]} **[${masteryData[4].championLevel}]** : ${
        masteryData[4].championPoints
      }`,
      true
    );

  return message.channel.send(embed); //Sends player profile stats

  async function getUserInfo(name, lolApi) {
    //API Access
    let { body } = await superagent
      .get(
        `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${name}?api_key=${lolApi}`
      )
      .on("error", err => {
        return message.channel.send(
          "Error Occurred. Make sure you got the username right. `.lol <summoner-name>`\n\n **If this problem keeps arising, make sure you use the `.issue` command to report any issues with the bot**"
        ); //Error message if API fails
      });
    let userInfo = body;
    let summonerId = userInfo.id;
    let summonerName = userInfo.name;
    let summonerLevel = userInfo.summonerLevel;
    return {
      summonerId: summonerId,
      summonerName: summonerName,
      summonerLevel: summonerLevel
    };
  }

  async function getMasteryInfo(name, lolApi) {
    let info = await getUserInfo(name, lolApi); //Gets summoner stats from getUserInfo()
    let summonerId = info.summonerId;

    //API Access
    let { body } = await superagent
      .get(
        `https://na1.api.riotgames.com/lol/champion-mastery/v3/champion-masteries/by-summoner/${summonerId}?api_key=${lolApi}`
      )
      .on("error", err => {
        return message.channel.send(
          "Error Occurred. Make sure you got the username right. `.lol <summoner-name>`\n\n **If this problem keeps arising, make sure you use the `.issue` command to report any issues with the bot**"
        ); //Error message if API fails
      });
    let masteryInfo = body; //Totally unneccessary but for readability
    let rank1 = {
      championId: masteryInfo[0].championId,
      championLevel: masteryInfo[0].championLevel,
      championPoints: masteryInfo[0].championPoints,
      chestGranted: masteryInfo[0].chestGranted
    };
    let rank2 = {
      championId: masteryInfo[1].championId,
      championLevel: masteryInfo[1].championLevel,
      championPoints: masteryInfo[1].championPoints,
      chestGranted: masteryInfo[1].chestGranted
    };
    let rank3 = {
      championId: masteryInfo[2].championId,
      championLevel: masteryInfo[2].championLevel,
      championPoints: masteryInfo[2].championPoints,
      chestGranted: masteryInfo[2].chestGranted
    };
    let rank4 = {
      championId: masteryInfo[3].championId,
      championLevel: masteryInfo[3].championLevel,
      championPoints: masteryInfo[3].championPoints,
      chestGranted: masteryInfo[3].chestGranted
    };
    let rank5 = {
      championId: masteryInfo[4].championId,
      championLevel: masteryInfo[4].championLevel,
      championPoints: masteryInfo[4].championPoints,
      chestGranted: masteryInfo[4].chestGranted
    };
    return [rank1, rank2, rank3, rank4, rank5]; //Champion id, level, points, chests
  }

  async function getChampionData(name, lolApi) {
    let latestPatch = await getLatestPatch(); //Gets latest version of League
    async function getLatestPatch() {
      let { body } = await superagent.get(
        `https://ddragon.leagueoflegends.com/api/versions.json`
      );
      let latestPatch = body[0];
      return latestPatch;
    }
    //API Access for getting champion name
    let { body } = await superagent
      .get(
        `http://ddragon.leagueoflegends.com/cdn/${latestPatch}/data/en_US/champion.json`
      )
      .on("error", err => {
        return message.channel.send(
          "Error Occurred. Make sure you got the username right. `.lol <summoner-name>`\n\n **If this problem keeps arising, make sure you use the `.issue` command to report any issues with the bot**"
        ); //Error message if API fails
      });
    let championData = body.data;
    let championName = [];
    let dataLength = Object.keys(championData).length;
    let championInfo = await getMasteryInfo(name, lolApi); //Gets champion stats from getMasteryInfo()
    for (let k = 0; k < championInfo.length; k++) {
      let championId = championInfo[k].championId;
      for (let i = 0; i < dataLength + 800; i++) {
        //Checks if champion id is matched with name
        if (championData[Object.keys(championData)[i]].key == championId) {
          championName.push(championData[Object.keys(championData)[i]].name); //Adds to array
          break;
        }
      }
    }
    return championName;
  }
};

module.exports.help = {
  name: "lol"
};
