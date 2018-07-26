const Discord = require("discord.js");
const config = require("../config.json");
const superagent = require('superagent');
const rlApi = config.rlApi;

module.exports.run = async (bot, message, args) => {
  let platform = args[0].toLowerCase();
  let username = args[1];

  getPlatformId(platform, rlApi);
  getPlayerStats(platform, username, rlApi);

  async function getPlatformId(platform, rlApi) {
    let { body } = await superagent.get(`https://api.rocketleaguestats.com/v1/data/platforms?apikey=${rlApi}`);
    return {
      steam: body[0],
      psn: body[1],
      xbl: body[2]
    }
  }

  async function getPlayerStats(platform, username, rlApi){
    let platformData = await getPlatformId(platform, rlApi);
   // console.log(platformData);
    for(let i = 0; i < 3; i++){
      console.log(i);
      if(platform == platformData[Object.keys(platformData)[i]].name.toLowerCase()){
        let platformId = platformData[Object.keys(platformData)[i]].id;
      }
    }
    let { body } = await superagent.get(`https://api.rocketleaguestats.com/v1/player?unique_id=${username}&platform_id=${platformId}?apikey=${rlApi}`);
    console.log(body);
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
