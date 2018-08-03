const Discord = require("discord.js");
const superagent = require("superagent");

//.8ball <question?>
module.exports.run = async (bot, message, args) => {
  if (!args[0])
    return message.channel.send(
      "Error. Please ask a question. `.8ball <question>`"
    );

  let question = args.slice(0).join(" ");

  if (question.length < 2)
    return message.channel.send("Error. Please ask a **valid** question");

  let { body } = await superagent
    .get(`https://8ball.delegator.com/magic/JSON/${question}`)
    .on("error", err => {
      //console.error(err);
      return message.channel.send(
        "Error while retrieving answers. Try again. `.8ball <question?>`\n\n **If this problem keeps arising, make sure you use the `.issue` command to report any issues with the bot**"
      );
    });
  let answer = body.magic.answer;

  let embed = new Discord.RichEmbed()
    .setTitle("## 8BALL ##")
    .setThumbnail("https://8ball.delegator.com/images/8ball.png")
    .setColor("#FFFFFF")
    .addField("Question", `**${question}**`)
    .addField("Answer", `**${answer}**`);

  return message.channel.send(embed);
};

module.exports.help = {
  name: "8ball"
};
