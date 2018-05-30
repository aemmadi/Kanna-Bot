const Discord = require('discord.js');

module.exports.run = async (bot, message, args) =>{
  let heads = 1;
  let tails = 0;
  
  let result = Math.floor(Math.random() * 3);;

  if(result == 0)
    return message.channel.send("TAILS");
  else if(result == 1)
    return message.channel.send("HEADS");
  else
    return message.channel.send("Error Occurred, Flip again.");
}

module.exports.help = {
  name: "coinflip"
}