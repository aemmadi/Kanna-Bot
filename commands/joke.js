const Discord = require("discord.js");
const superagent = require("superagent");

//.joke - Gets a random joke from reddit
module.exports.run = async (bot, message, args) => {
  let joke = await getJoke(); //Gets joke

  if (joke.nsfw == "nsfw_in_sfw") {
    message.channel.send(
      "**This joke cointains NSFW content, and this text channel doesn't allow NSFW content**"
    );
    message.channel.send(
      "Searching for a new joke...\n------------------------------------------------------------------"
    );
    let jokeAgain = await getJoke();
  }

  return message.channel.send(`**${joke.title}**\n\`\`\`${joke.content}\`\`\``); //Sends joke

  async function getJoke() {
    //API Access
    let { body } = await superagent
      .get(`https://www.reddit.com/r/Jokes/hot.json?limit=100`)
      .on("error", err => {
        //console.error(err);
        return message.channel.send(
          "Error occurred while retrieving jokes. Try again. `.realjoke`.\n\n **If this problem keeps arising, make sure you use the `.issue` command to report any issues with the bot**"
        );
      });

    let number = randomNumber(100); //Generates a random number
    let nsfw = nsfwChecker(body, number); //NSFW filter

    let jokeNsfw = "sfw_in_sfw";
    if (nsfw) {
      if (!message.channel.nsfw) {
        jokeNsfw = "nsfw_in_sfw";
      }
    }

    let jokeTitle = body.data.children[number].data.title; //Title
    let jokeContent = body.data.children[number].data.selftext; //Joke

    return {
      title: jokeTitle,
      content: jokeContent,
      nsfw: jokeNsfw
    };
  }

  function nsfwChecker(body, number) {
    let nsfw = body.data.children[number].data.over_18; //Gets NSFW status
    return nsfw;
  }

  function randomNumber(num) {
    let picker = Math.floor(Math.random() * num); //Generates a random number
    return picker;
  }
};

module.exports.help = {
  name: "joke"
};
