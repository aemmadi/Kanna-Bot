const Discord = require("discord.js");

//.roll - rolls a dice
module.exports.run = async (bot, message, args) => {
  let result = Math.floor(Math.random() * 6); //Picks a random number from 0 - 5

  if (result == 0) {
    return message.channel.send("1");
  } else if (result == 1) {
    return message.channel.send("2");
  } else if (result == 2) {
    return message.channel.send("3");
  } else if (result == 3) {
    return message.channel.send("4");
  } else if (result == 4) {
    return message.channel.send("5");
  } else if (result == 5) {
    return message.channel.send("6");
  } else {
    return message.channel.send("Error Occurred, roll again. `.roll`"); //Catches unknown error
  }
};

module.exports.help = {
  name: "roll"
};
