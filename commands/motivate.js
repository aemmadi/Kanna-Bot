const Discord = require("discord.js");
const superagent = require("superagent");

//.motivate - shows a random motivation post from reddit
module.exports.run = async (bot, message, args) => {
  let motivate = await getMotivate();

  if (motivate.again) {
    console.log("hit");
    motivate = await getMotivate();
  }
  if (motivate.text) {
    if (motivate.content === "") {
      return message.channel.send(`**${motivate.title}**`);
    }
    return message.channel.send(`**${motivate.title}**\n${motivate.content}`);
  } else if (motivate.image) {
    //prettier-ignore
    let embed = new Discord.RichEmbed()
      .setTitle("## MOTIVATIONAL IMAGE FROM REDDIT ##")
      .setDescription(`**${motivate.title}** | Scraped from [r/GetMotivated](https://www.reddit.com/r/GetMotivated)`)
      .setImage(motivate.content);

    return message.channel.send(embed);
  }

  async function getMotivate() {
    let { body } = await superagent
      .get(`https://www.reddit.com/r/GetMotivated/hot.json?limit=100`)
      .on("error", err => {
        //console.error(err);
        return message.channel.send(
          "Error while retrieving a motivation quote. Try again `.motivate`\n\n **If this problem keeps arising, make sure you use the `.issue` command to report any issues with the bot**"
        );
      });

    let number = randomNumber(3);
    let motivateTitle = body.data.children[number].data.title;
    if (motivateTitle.charAt(1).toLowerCase() == "t") {
      let motivateContent = body.data.children[number].data.selftext;
      let correctedTitle = motivateTitle.slice(6);

      return {
        text: true,
        image: false,
        again: false,
        title: correctedTitle,
        content: motivateContent
      };
    } else if (motivateTitle.charAt(1).toLowerCase() == "i") {
      let motivateImg = body.data.children[number].data.url;
      let correctedTitle = motivateTitle.slice(7);

      return {
        text: false,
        image: true,
        again: false,
        title: correctedTitle,
        content: motivateImg
      };
    } else {
      return {
        again: true
      };
    }
  }

  function randomNumber(num) {
    let picker = Math.floor(Math.random() * num); //Generates a random number
    return picker;
  }
};

module.exports.help = {
  name: "motivate"
};
