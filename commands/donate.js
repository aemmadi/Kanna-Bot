const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
  let embed = new Discord.RichEmbed()
    .setTitle("## ANY DONATIONS ARE APPRECIATED! ##")
    .setDescription("Donations are the reason why this bot is still alive. :)")
    .setThumbnail(
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHOsXWZlIhn2oplPZ6f7Mwipi03UdSobACMn7y0Rop9dzEgk-Ipw"
    )
    .addField("Patreon (Primary)", "https://www.patreon.com/KannaDev")
    .addField("PayPal", "https://www.paypal.me/kanna6501")
    .addField("Bitcoin (BTC)", "3PHYokeWs7Smc7bYEy2i4tvLn7hPFgSquF")
    .addField("Ethereum (ETH)", "0xa3A65FFC89F3440553eE012f97609f2DA3C839B3");
  return message.channel.send(embed); //Sends message
};

module.exports.help = {
  name: "donate"
};
