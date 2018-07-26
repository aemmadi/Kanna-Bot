const Discord = require("discord.js");
const config = require("../config.json");
const superagent = require('superagent');
const rlApi = config.rlApi;

module.exports.run = async (bot, message, args) => {
  let { body } = await superagent.get(`https://api.rocketleaguestats.com/v1/data/platforms?apikey=${rlApi}`);
 console.log(body);
};

module.exports.help = {
  name: "rl"
};
