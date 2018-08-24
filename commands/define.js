const Discord = require("discord.js");
const superagent = require("superagent");

//.def [term] - Gets definition of term from urban dictionary
module.exports.run = async (bot, message, args) => {
  if (!args[0])
    return message.channel.send("Error. Specify a term! `.def [term]`");

  let term = args[0].toLowerCase();

  let define = await getDefine(term);
  if (define.length == '3') {
    let embed = new Discord.RichEmbed()
      .setTitle(`## DEFINITION OF ${term.toUpperCase()} FROM URBAN DICTIONARY ##`)
      .setDescription("**Note**: If you like the bot and want it to be active, use the **`.donate`** command to support the bot's server costs.")
      .setThumbnail(`https://www.digzoo.com/sites/default/files/2017-09/image1_31.jpeg`)
      .setColor("#42f498")
      .addField("Term", define.term[0])
      .addField("Definition", define.definition[0], true)
      .addField("Example", define.example[0], true)
      .addBlankField()
      .addField("Term", define.term[1])
      .addField("Definition", define.definition[1], true)
      .addField("Example", define.example[1], true)
      .addBlankField()
      .addField("Term", define.term[2])
      .addField("Definition", define.definition[2], true)
      .addField("Example", define.example[2], true);

    return message.channel.send(embed);
  }
  else {
    return message.channel.send(`**TERM**: ${define.term[0]}\n**DEFINITION**: ${define.definition[0]}\n**EXAMPLE**: ${define.example[0]}`);
  }

  async function getDefine(term) {
    let { body } = await superagent.get(`http://urbanscraper.herokuapp.com/search/${term}`).on("error", err => {
      return message.channel.send("An unknown error occurred while getting the definition. Try again. If it still doesn't work, use the **.issue** command to report the issue with the bot.");
    })

    let url = `http://www.urbandictionary.com/define.php?term=${term}`;
    let topTerms = [];
    let topDefs = [];
    let topExamples = [];

    if (body.length > 2) {
      for (let i = 0; i < 3; i++) {
        topTerms.push(body[i].term);
        topDefs.push(body[i].definition);
        topExamples.push(body[i].example);
      }
      return {
        term: topTerms,
        definition: topDefs,
        example: topExamples,
        length: "3"
      };
    }
    else {
      topTerm.push(body[0].term);
      topDefs.push(body[0].definition);
      topExamples.push(body[0].example);

      return {
        term: topTerms,
        definition: topDefs,
        example: topExamples,
        length: "1"
      };
    }
  }
};

module.exports.help = {
  name: "def"
};