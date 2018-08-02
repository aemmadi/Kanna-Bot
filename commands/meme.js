const Discord = require("discord.js");
const superagent = require("superagent");

//!meme - generates random meme
//!meme <number> - generates <number> random memes
module.exports.run = async (bot, message, args) => {
  if (args[0]) {
    let num = parseInt(args[0]);
    if (num == "NaN" || num > 10 || num < 2)
      return message.channel.send(
        "Error. Spam number needs to be a **valid** number (2-10).\n`!meme` for random meme\n`!meme <number>` for generating <number> memes "
      );
    while (num > 1) {
      await freshMeme();
      num--;
    }
  }

  await freshMeme();

  async function freshMeme() {
    let subReddit = await getSubReddit();
    let meme = await getMeme(subReddit);
    let embed = new Discord.RichEmbed()
      .setTitle("## RANDOM FRESH MEME FROM REDDIT ##")
      .setDescription(
        `**${
          meme.title
        }** | scraped from [r/${subReddit}](https://www.reddit.com/r/${subReddit}/) | ${
          meme.img
        }`
      )
      .setImage(meme.img);

    return message.channel.send(embed);

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
        "memes"
      ];
      let randomSub = randomNumber(memeSubs.length);
      let subReddit = memeSubs[randomSub];
      return subReddit;
    }

    async function getMeme(subReddit) {
      let { body } = await superagent
        .get(`https://www.reddit.com/r/${subReddit}/hot.json?limit=100`)
        .on("error", err => {
          //console.error(err);
          return message.channel.send(
            "Error occurred while retrieving memes. Try again. `!meme`.\n\n **If this problem keeps arising, make sure you use the `!issue` command to report any issues with the bot**"
          );
        });
      let randomMeme = randomNumber(100);
      let link = body.data.children[randomMeme].data.url;
      let checkUrl = linkChecker(link);

      if (!checkUrl) {
        let repeat = await freshMeme();
      }
      let memeTitle = body.data.children[randomMeme].data.title;
      let memeImg = body.data.children[randomMeme].data.url;

      return {
        title: memeTitle,
        img: memeImg
      };
    }
  }

  function linkChecker(link) {
    if (
      link[link.length - 3].toLowerCase() == "j" || //jpg
      link[link.length - 3].toLowerCase() == "p" || //png
      link[link.length - 3].toLowerCase() == "g" //gif
    ) {
      return true;
    }
    return false;
  }

  function randomNumber(num) {
    let picker = Math.floor(Math.random() * num);
    return picker;
  }
};

module.exports.help = {
  name: "meme"
};
