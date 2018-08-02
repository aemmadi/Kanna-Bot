const Discord = require("discord.js");
const superagent = require("superagent");

//!meme - generates random meme
//!meme <number> - generates <number> random memes
module.exports.run = async (bot, message, args) => {
  //Checks is <number> has been provided
  if (args[0]) {
    let num = parseInt(args[0]); //Converts into <number> format.
    if (num == "NaN" || num > 10 || num < 2)
      //Checks if <number> meets requirements. b/w 2-10
      return message.channel.send(
        "Error. Spam number needs to be a **valid** number (2-10).\n`!meme` for random meme\n`!meme <number>` for generating <number> memes "
      ); //Error message

    //Generates <number> random memes
    while (num > 1) {
      await freshMeme();
      num--;
    }
  }

  await freshMeme(); //Generates only 1 random meme if user doesn't provide <number>

  async function freshMeme() {
    let subReddit = await getSubReddit(); //Gets random meme subreddit
    let meme = await getMeme(subReddit); //Gets random meme

    //Checks if meme exists
    if (meme.title != null && meme.img != null) {
      //prettier-ignore
      let embed = new Discord.RichEmbed()
        .setTitle("## RANDOM FRESH MEME FROM REDDIT ##")
        .setDescription(`**${meme.title}** | scraped from [r/${subReddit}](https://www.reddit.com/r/${subReddit}/) | ${meme.img}`)
        .setImage(meme.img);

      return message.channel.send(embed); //Sends meme
    } else {
      return message.channel.send(
        "Error. Reddit gave me a fake meme. Try again plz.\n`!meme` or `!meme <number>`"
      ); //Sends error message
    }

    async function getSubReddit() {
      let memeSubs = [
        "blackpeopletwitter",
        "MemeEconomy",
        "metal_me_irl",
        "bee_irl",
        "coaxedintoasnafu",
        "195",
        "shittyadviceanimals",
        "wholesomememes",
        "dankmemes",
        "memes",
        "Dogfort",
        "vertical",
        "AdviceAnimals",
        "fffffffuuuuuuuuuuuu",
        "treecomics"
      ]; //List of meme subreddits

      let randomSub = randomNumber(memeSubs.length); //Randomely selects a subreddit
      let subReddit = memeSubs[randomSub];
      return subReddit;
    }

    async function getMeme(subReddit) {
      //API Access
      let { body } = await superagent
        .get(`https://www.reddit.com/r/${subReddit}/hot.json?limit=100`)
        .on("error", err => {
          //console.error(err);
          return message.channel.send(
            "Error occurred while retrieving memes. Try again. `!meme`.\n\n **If this problem keeps arising, make sure you use the `!issue` command to report any issues with the bot**"
          );
        });
      let randomMeme = randomNumber(100); //Randomely selects a post out of 100 posts
      let link = body.data.children[randomMeme].data.url; //Url of post
      let checkUrl = linkChecker(link); //Checks if url contains an image or gif

      if (!checkUrl) {
        return ""; //Don't generate meme for non-images
      }

      let memeTitle = body.data.children[randomMeme].data.title; //Title of meme
      let memeImg = body.data.children[randomMeme].data.url; //Url of meme

      return {
        title: memeTitle,
        img: memeImg
      };
    }
  }

  function linkChecker(link) {
    return link.match(/\.(jpeg|jpg|gif|png)$/) != null; //TRUE or FALSE. if url ends with .jpeg, .jpg, .png, or .gif
  }

  function randomNumber(num) {
    let picker = Math.floor(Math.random() * num); //Generates a random number
    return picker;
  }
};

module.exports.help = {
  name: "meme"
};
