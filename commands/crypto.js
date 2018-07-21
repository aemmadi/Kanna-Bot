const Discord = require('discord.js');
const CoinMarketCap = require('coinmarketcap-api');
const client = new CoinMarketCap();

//!crypto - Show global stats
//!crypto 10 - Show top 10
//!crypto 25 - Show top 25
module.exports.run = async (bot, message, args) =>{
  if(!args[0]){
    let global = client.getGlobal().then( global => {
      let totalCrypto = global.data.active_cryptocurrencies;
      let totalMarket = global.data.active_markets;
      let bitcoinPercent = global.data.bitcoin_percentage_of_market_cap;

      let embed = new Discord.RichEmbed()
        .setTitle("## CRYPTOCURRENCY GLOBAL STATS ##")
        .setThumbnail("https://blog.digitexfutures.com/wp-content/uploads/2018/05/CoinMarketCap.png")
        .setDescription("These are the global crypto stats from coinmarketcap's API")
        .setColor('#f98e22')
        .addField("Number of Active Cryptocurrencies: ", totalCrypto)
        .addField("Total Active Markets: ", totalMarket)
        .addField("Percentage of Bitcoin in the Market: ", `${bitcoinPercent}%`);

       return message.channel.send(embed);
    }).catch(err => {
      message.channel.send("Oops an error occurred. Try again later.");
      console.error(err);
    });
  }

  if(args[0] == '10'){
    let data = client.getTicker({ start: 0, limit: 10, structure: 'array', convert: 'USD' }).then(data => {
      //console.log(data['data'][0]['name']);
      let rank1 = data['data'][0];
        let rank1_name = rank1.name;
        let rank1_symbol = rank1.symbol;
        let rank1_rank = rank1.rank;
        let rank1_24hr_supply = rank1.circulating_supply;
        let rank1_total_supply = rank1.max_supply;
      let rank2 = data['data'][1];
        let rank2_name = rank2.name;
        let rank2_symbol = rank2.symbol;
        let rank2_rank = rank2.rank;
        let rank2_24hr_supply = rank2.circulating_supply;
        let rank2_total_supply = rank2.max_supply;
      let rank3 = data['data'][2];
        let rank3_name = rank3.name;
        let rank3_symbol = rank3.symbol;
        let rank3_rank = rank3.rank;
        let rank3_24hr_supply = rank3.circulating_supply;
        let rank3_total_supply = rank3.max_supply;
      let rank4 = data['data'][3];
        let rank4_name = rank4.name;
        let rank4_symbol = rank4.symbol;
        let rank4_rank = rank4.rank;
        let rank4_24hr_supply = rank4.circulating_supply;
        let rank4_total_supply = rank4.max_supply;
      let rank5 = data['data'][4];
        let rank5_name = rank5.name;
        let rank5_symbol = rank5.symbol;
        let rank5_rank = rank5.rank;
        let rank5_24hr_supply = rank5.circulating_supply;
        let rank5_total_supply = rank5.max_supply;
      let rank6 = data['data'][5];
        let rank6_name = rank6.name;
        let rank6_symbol = rank6.symbol;
        let rank6_rank = rank6.rank;
        let rank6_24hr_supply = rank6.circulating_supply;
        let rank6_total_supply = rank6.max_supply;
      let rank7 = data['data'][6];
        let rank7_name = rank7.name;
        let rank7_symbol = rank7.symbol;
        let rank7_rank = rank7.rank;
        let rank7_24hr_supply = rank7.circulating_supply;
        let rank7_total_supply = rank7.max_supply;
      let rank8 = data['data'][7];
        let rank8_name = rank8.name;
        let rank8_symbol = rank8.symbol;
        let rank8_rank = rank8.rank;
        let rank8_24hr_supply = rank8.circulating_supply;
        let rank8_total_supply = rank8.max_supply;
      let rank9 = data['data'][8];
        let rank9_name = rank9.name;
        let rank9_symbol = rank9.symbol;
        let rank9_rank = rank9.rank;
        let rank9_24hr_supply = rank9.circulating_supply;
        let rank9_total_supply = rank9.max_supply;
      let rank10 = data['data'][9];
        let rank10_name = rank10.name;
        let rank10_symbol = rank10.symbol;
        let rank10_rank = rank10.rank;
        let rank10_24hr_supply = rank10.circulating_supply;
        let rank10_total_supply = rank10.max_supply;

      let embed = new Discord.RichEmbed()
        .setTitle("## CRYPTOCURRENCY TOP 10 STATS ##")
        .setThumbnail("https://blog.digitexfutures.com/wp-content/uploads/2018/05/CoinMarketCap.png")
        .setDescription("These are the top 10 crypto stats from coinmarketcap's API")
        .setColor('#f98e22')
        .addField("Rank 1", `Name: ${rank1_name}, Symbol: ${rank1_symbol}, Circulating Supply (24Hrs): ${rank1_24hr_supply}, Total Supply: ${rank1_total_supply}`);

      return message.channel.send(embed);
    }).catch(console.error)
  }
  }

module.exports.help = {
  name: "crypto"
}
