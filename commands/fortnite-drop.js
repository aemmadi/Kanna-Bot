const Discord = require('discord.js');

module.exports.run = async (bot, message, args) => {
  let places = ["Lazy Links", "Dusty Divot", "Fatal Fields", "Flush Factory", "Greasy Grove", "Haunted Hills", "Junk Junction", "Lonely Lodge", "Lucky Landing", "Paradise Palms", "Pleasant Park", "Retail Row", "Risky Reels", "Shifty Shafts", "Snobby Shores", "Tilted Towers", "Tomato Town", "Wailing Woods", "Loot Lake", "Salty Springs"];

  let picker = Math.floor(Math.random() * places.length);

  return message.channel.send(places[picker]);
}

module.exports.help = {
  name: "drop"
}