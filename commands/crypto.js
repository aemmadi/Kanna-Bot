const CoinMarketCap = require('coinmarketcap-api');
const client = new CoinMarketCap();

// !crypto <top/stats>
module.exports.run = async (bot, message, args) =>{
  let request = args[0].toLowerCase();

  if(request == 'top'){
    client.getTicker({limit: 10, sort: 'rank'}).then(console.log
      // data => {
      // let embed = new Discord.RichEmbed()
      //   .setTitle("## TOP 10 CRYPTOCURRENCY STATS")
      //   .setDescription("Top 10 cryptocurrencies according to CoinMarketCap")
      //   .setThumbnail('https://en.bitcoinwiki.org/upload/en/images/9/9d/Coinmarketcap.png')
      //   .setColor("#f49e42");
    ).catch(e => {
      console.log(e);
      message.channel.send("Error. Make sure you got the syntax right `!crypto <top/global>`. If the syntax is right and still see this error, then it must be a fault at CoinMarketCap's API. Try again later.");
    });
  }

}

module.exports.help = {
  name: "crypto"
}
