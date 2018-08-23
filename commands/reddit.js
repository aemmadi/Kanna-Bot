const Discord = require("discord.js");
const superagent = require("superagent");

//.reddit <r/subreddit> - Gets a random hot post from <r/subreddit>
//.reddit <r/subreddit> top - Gets the top post from <r/subreddit>
//.reddit <r/subreddit> new - Gets the newest post from <r/subreddit>
module.exports.run = async (bot, message, args) => {
  if (!args[0])
    return message.channel.send("Error. Specify a subreddit. `.help reddit`");

  let subreddit = args[0].replace("r/", "");
  let subCheck = await isSubExist(subreddit);
  console.log(subCheck);

  async function isSubExist(subreddit) {
    let { body } = await superagent
      .get(`https://www.reddit.com/r/${subreddit}/hot.json?limit=100`)
      .on("error", err => {
        return message.channel.send(
          "Error occurred while getting post. Try again. `.help reddit`.\n\n **If this problem keeps arising, make sure you use the `.issue` command to report any issues with the bot**"
        );
      });
    if (
      body.data.modhash == "" &&
      body.data.dist == 0 &&
      body.data.after == null &&
      body.data.before == null
    )
      return false;
    return true;
  }
};
module.exports.help = {
  name: "reddit"
};
