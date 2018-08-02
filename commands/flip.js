const Discord = require("discord.js");

//!flip
module.exports.run = async (bot, message, args) => {
  let heads = 1;
  let tails = 0;

  let result = Math.floor(Math.random() * 2); //Randomely selects Heads or Tails

  if (result == 0) return message.channel.send("TAILS");
  else if (result == 1) return message.channel.send("HEADS");
  else {
    return message.channel.send(
      "Error Occurred, Flip again.\n\n **If this problem keeps arising, make sure you use the `!issue` command to report any issues with the bot**"
    ); //Catches unknown errors
  }
};

module.exports.help = {
  name: "flip"
};
