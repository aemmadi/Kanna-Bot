const Discord = require("discord.js");
const superagent = require("superagent");

//!joke - gets a random dad joke
//!joke <number> - gets <number> dad jokes
module.exports.run = async (bot, message, args) => {
  if (args[0]) {
    let num = parseInt(args[0]); //Converts into <number> format.
    if (num == "NaN" || num > 10 || num < 2)
      //Checks if <number> meets requirements. b/w 2-10
      return message.channel.send(
        "Error. Spam number needs to be a **valid** number (2-10).\n`!joke` for random dad joke\n`!joke <number>` for generating `<number>` dad jokes "
      ); //Error message

    //Generates <number> random memes
    while (num > 1) {
      await dadJoke(num);
      num--;
    }
  }
  await dadJoke(1);

  async function dadJoke(num) {
    let { body } = await superagent
      .get(`https://icanhazdadjoke.com/`)
      .set("Accept", "application/json")
      .on("error", err => {
        //console.error(err);
        return message.channel.send(
          "Error while retrieving dad jokes. Try again `!joke`\n\n **If this problem keeps arising, make sure you use the `!issue` command to report any issues with the bot**"
        );
      });
    let joke = body.joke;
    return message.channel.send(`**${num}. ${joke}**`);
  }
};

module.exports.help = {
  name: "joke"
};
