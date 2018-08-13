const Discord = require("discord.js");
const superagent = require("superagent");

//.reddit <r/subreddit> - Gets a random hot post from <r/subreddit>
//.reddit <r/subreddit> top - Gets the top post from <r/subreddit>
//.reddit <r/subreddit> new - Gets the newest post from <r/subreddit>
module.exports.run = async (bot, message, args) => {
  if (!args[0])
    return message.channel.send(
      "Please specify a subreddit.\n`.reddit <r/subreddit>` - Gets a random hot post from <r/subreddit>\n`.reddit <r/subreddit> top` - Gets the top post from <r/subreddit>\n`.reddit <r/subreddit> new` - Gets the newest post from <r/subreddit>"
    );

  let subReddit = args[0].replace("r/", "");
  let subCheck = await subRedditChecker(subReddit);

  if (!subCheck)
    return message.channel.send(
      "Please specify a **valid** subreddit.\n`.reddit <r/subreddit>` - Gets a random hot post from <r/subreddit>\n`.reddit <r/subreddit> top` - Gets the top post from <r/subreddit>\n`.reddit <r/subreddit> new` - Gets the newest post from <r/subreddit>"
    );

  let type = "hot";

  if (args[1] == "top") {
    type = "top";
  } else if (args[1] == "new") {
    type = "new";
  }

  let post = await getRedditPost(subReddit, type);

  async function getRedditPost(subReddit) {
    let { body } = await superagent
      .get(`https://www.reddit.com/r/${subReddit}/${type}.json?limit=100`)
      .on("error", err => {
        //console.error(err);
        return message.channel.send(
          "Error occurred while checking the subreddit. Try again. `.help reddit`.\n\n **If this problem keeps arising, make sure you use the `.issue` command to report any issues with the bot**"
        );
      });
  }

  async function subRedditChecker(subReddit) {
    let { body } = await superagent
      .get(`https://www.reddit.com/r/${subReddit}/hot.json?limit=100`)
      .on("error", err => {
        //console.error(err);
        return message.channel.send(
          "Error occurred while checking the subreddit. Try again. `.help reddit`.\n\n **If this problem keeps arising, make sure you use the `.issue` command to report any issues with the bot**"
        );
      });

    if (
      body.data.dist == 0 ||
      body.data.after == null ||
      body.data.before == null
    )
      return false;
    return true;
  }
};

module.exports.help = {
  name: "reddit"
};
