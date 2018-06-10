const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let places = ["Anarchy Acres", "Dusty Divot", "Fatal Fields", "Flush Factory", "Greasy Grove", "Haunted Hills", "Junk Junction", "Lonely Lodge", "Loot Lake", "Lucky Landing", "Moisty Mire", "Pleasant Park", "Retail Row", "Risky Reels", "Salty Springs", "Shifty Shafts", "Snobby Shores", "Tilted Towers", "Tomato Town", "Wailing Woods"];

  let picker = Math.floor(Math.random() * places.length);

  return message.channel.send(places[picker]);
}

module.exports.help = {
  name: "drop"
}