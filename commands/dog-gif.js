const Discord = require('discord.js');
const superagent = require('superagent');

//!dog
module.exports.run = async (bot, message, args) => {
  //Access API
  let { body } = await superagent.get(`https://random.dog/woof.json`).on('error', err => {
      //console.log(err);
      return message.channel.send("Unknown Error Occurred.\n\n**If this problem keeps arising, make sure you use the `!issue` command to report any issues with the bot**");
    }); //gets the JSON for random dog

  const link = body.url; //url of dog

  //Checks if the url is an image
  if (link[link.length - 3] == "j" || link[link.length - 3] == "J" || link[link.length - 3] == "p") {
    let embed = new Discord.RichEmbed()
      .setColor("#f4b342")
      .setTitle("## DOG IMAGE ##")
      .setImage(link);

    return message.channel.send(embed); //Sends image
  }
  //Checks if url is a video
  else if (link[link.length - 3] == "m") {
    return message.channel.send("Error Occurred. Try again."); //Sends error message, discord.js doesnt allow video embeds right now
  }
  //Checks for any GIFS 
  else if (link[link.length - 3] == "g" || link[link.length - 3] == "G") {
    let embed = new Discord.RichEmbed()
      .setColor("#f4b342")
      .setTitle("## DOG GIF ##")
      .setImage(link);

    return message.channel.send(embed); //Sends GIF
  }
  else {
    return message.channel.send("Error Occurred. Try again later.\n\n **If this problem keeps arising, make sure you use the `!issue` command to report any issues with the bot**"); //Catches any unknown error
  }
}

module.exports.help = {
  name: "dog"
}  