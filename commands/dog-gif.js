const Discord = require('discord.js');
const superagent = require('superagent');

module.exports.run = async (bot, message, args) => {
  let { body } = await superagent
    .get(`https://random.dog/woof.json`); //gets the JSON for random dog

  const link = body.url;

  //Checks if the url is an image or video
  if (link[link.length - 3] == "j" || link[link.length - 3] == "J" || link[link.length - 3] == "p") {
    let embed = new Discord.RichEmbed()
      .setColor("#f4b342")
      .setTitle("## DOG IMAGE ##")
      .setImage(link);

    return message.channel.send(embed);
  }
  else if (link[link.length - 3] == "m") {
    return message.channel.send("Error Occurred. Try again.");
  }

  //Checks for any GIFS 
  else if (link[link.length - 3] == "g" || link[link.length - 3] == "G") {
    let embed = new Discord.RichEmbed()
      .setColor("#f4b342")
      .setTitle("## DOG GIF ##")
      .setImage(link);

    return message.channel.send(embed);
  }
  else {
    return message.channel.send("Error Occurred. Try again later.");
  }
}

module.exports.help = {
  name: "dog"
}  