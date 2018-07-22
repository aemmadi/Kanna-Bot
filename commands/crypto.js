const Discord = require('discord.js');
const CoinMarketCap = require('coinmarketcap-api');
const client = new CoinMarketCap();

//!crypto - Show global stats
//!crypto top - Show top 10
//!crypto <coin-name> - Show <coin-name> stats
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

  if(args[0].toLowerCase() == 'top'){
    let data = client.getTicker({ start: 0, limit: 10, structure: 'array', convert: 'USD' }).then(data => {
      //Name
      //Current Price
      //Past Hour
      //Past Day
      //Past Week
      let rank1 = data['data'][0];
        let rank1_name = rank1.name;
        let rank1_price = rank1.quotes.USD.price;
        let rank1_price_change_hr = rank1.quotes.USD.percent_change_1h; 
        let rank1_price_change_day = rank1.quotes.USD.percent_change_24h; 
        let rank1_price_change_week = rank1.quotes.USD.percent_change_7d; 
      let rank2 = data['data'][1];
        let rank2_name = rank2.name;
        let rank2_price = rank2.quotes.USD.price;
        let rank2_price_change_hr = rank2.quotes.USD.percent_change_1h; 
        let rank2_price_change_day = rank2.quotes.USD.percent_change_24h; 
        let rank2_price_change_week = rank2.quotes.USD.percent_change_7d; 
      let rank3 = data['data'][2];
        let rank3_name = rank3.name;
        let rank3_price = rank3.quotes.USD.price;
        let rank3_price_change_hr = rank3.quotes.USD.percent_change_1h; 
        let rank3_price_change_day = rank3.quotes.USD.percent_change_24h; 
        let rank3_price_change_week = rank3.quotes.USD.percent_change_7d; 
      let rank4 = data['data'][3];
        let rank4_name = rank4.name;
        let rank4_price = rank4.quotes.USD.price;
        let rank4_price_change_hr = rank4.quotes.USD.percent_change_1h; 
        let rank4_price_change_day = rank4.quotes.USD.percent_change_24h; 
        let rank4_price_change_week = rank4.quotes.USD.percent_change_7d; 
      let rank5 = data['data'][4];
        let rank5_name = rank5.name;
        let rank5_price = rank5.quotes.USD.price;
        let rank5_price_change_hr = rank5.quotes.USD.percent_change_1h; 
        let rank5_price_change_day = rank5.quotes.USD.percent_change_24h; 
        let rank5_price_change_week = rank5.quotes.USD.percent_change_7d; 
      let rank6 = data['data'][5];
        let rank6_name = rank6.name;
        let rank6_price = rank6.quotes.USD.price;
        let rank6_price_change_hr = rank6.quotes.USD.percent_change_1h; 
        let rank6_price_change_day = rank6.quotes.USD.percent_change_24h; 
        let rank6_price_change_week = rank6.quotes.USD.percent_change_7d; 
      let rank7 = data['data'][6];
        let rank7_name = rank7.name;
        let rank7_price = rank7.quotes.USD.price;
        let rank7_price_change_hr = rank7.quotes.USD.percent_change_1h; 
        let rank7_price_change_day = rank7.quotes.USD.percent_change_24h; 
        let rank7_price_change_week = rank7.quotes.USD.percent_change_7d; 
      let rank8 = data['data'][7];
        let rank8_name = rank8.name;
        let rank8_price = rank8.quotes.USD.price;
        let rank8_price_change_hr = rank8.quotes.USD.percent_change_1h; 
        let rank8_price_change_day = rank8.quotes.USD.percent_change_24h; 
        let rank8_price_change_week = rank8.quotes.USD.percent_change_7d; 
      let rank9 = data['data'][8];
        let rank9_name = rank9.name;
        let rank9_price = rank9.quotes.USD.price;
        let rank9_price_change_hr = rank9.quotes.USD.percent_change_1h; 
        let rank9_price_change_day = rank9.quotes.USD.percent_change_24h; 
        let rank9_price_change_week = rank9.quotes.USD.percent_change_7d; 
      let rank10 = data['data'][9];
        let rank10_name = rank10.name;
        let rank10_price = rank10.quotes.USD.price;
        let rank10_price_change_hr = rank10.quotes.USD.percent_change_1h; 
        let rank10_price_change_day = rank10.quotes.USD.percent_change_24h; 
        let rank10_price_change_week = rank10.quotes.USD.percent_change_7d; 

      let embed = new Discord.RichEmbed()
        .setTitle("## CRYPTOCURRENCY TOP 10 STATS ##")
        .setThumbnail("https://blog.digitexfutures.com/wp-content/uploads/2018/05/CoinMarketCap.png")
        .setDescription("These are the top 10 crypto's from Coinmarketcap")
        .setColor("#f98e22")
        .addField(`Rank 1 ~ \`${rank1_name}\``, `\`Price\` at \`\$${rank1_price}\`\n\`1Hr Change\` at \`${rank1_price_change_hr}%\`\n\`24Hr Change\` at \`${rank1_price_change_day}%\`\n\`7d Change\` at \`${rank1_price_change_week}%\``)
        .addField(`Rank 2 ~ \`${rank2_name}\``, `\`Price\` at \`\$${rank2_price}\`\n\`1Hr Change\` at \`${rank2_price_change_hr}%\`\n\`24Hr Change\` at \`${rank2_price_change_day}%\`\n\`7d Change\` at \`${rank2_price_change_week}%\``)
        .addField(`Rank 3 ~ \`${rank3_name}\``, `\`Price\` at \`\$${rank3_price}\`\n\`1Hr Change\` at \`${rank3_price_change_hr}%\`\n\`24Hr Change\` at \`${rank3_price_change_day}%\`\n\`7d Change\` at \`${rank3_price_change_week}%\``)
        .addField(`Rank 4 ~ \`${rank4_name}\``, `\`Price\` at \`\$${rank4_price}\`\n\`1Hr Change\` at \`${rank4_price_change_hr}%\`\n\`24Hr Change\` at \`${rank4_price_change_day}%\`\n\`7d Change\` at \`${rank4_price_change_week}%\``)
        .addField(`Rank 5 ~ \`${rank5_name}\``, `\`Price\` at \`\$${rank5_price}\`\n\`1Hr Change\` at \`${rank5_price_change_hr}%\`\n\`24Hr Change\` at \`${rank5_price_change_day}%\`\n\`7d Change\` at \`${rank5_price_change_week}%\``)
        .addField(`Rank 6 ~ \`${rank6_name}\``, `\`Price\` at \`\$${rank6_price}\`\n\`1Hr Change\` at \`${rank6_price_change_hr}%\`\n\`24Hr Change\` at \`${rank6_price_change_day}%\`\n\`7d Change\` at \`${rank6_price_change_week}%\``)
        .addField(`Rank 7 ~ \`${rank7_name}\``, `\`Price\` at \`\$${rank7_price}\`\n\`1Hr Change\` at \`${rank7_price_change_hr}%\`\n\`24Hr Change\` at \`${rank7_price_change_day}%\`\n\`7d Change\` at \`${rank7_price_change_week}%\``)
        .addField(`Rank 8 ~ \`${rank8_name}\``, `\`Price\` at \`\$${rank8_price}\`\n\`1Hr Change\` at \`${rank8_price_change_hr}%\`\n\`24Hr Change\` at \`${rank8_price_change_day}%\`\n\`7d Change\` at \`${rank8_price_change_week}%\``)
        .addField(`Rank 9 ~ \`${rank9_name}\``, `\`Price\` at \`\$${rank9_price}\`\n\`1Hr Change\` at \`${rank9_price_change_hr}%\`\n\`24Hr Change\` at \`${rank9_price_change_day}%\`\n\`7d Change\` at \`${rank9_price_change_week}%\``)
        .addField(`Rank 10 ~ \`${rank10_name}\``, `\`Price\` at \`\$${rank10_price}\`\n\`1Hr Change\` at \`${rank10_price_change_hr}%\`\n\`24Hr Change\` at \`${rank10_price_change_day}%\`\n\`7d Change\` at \`${rank10_price_change_week}%\``);

      return message.channel.send(embed);
    }).catch(err => {
      return message.channel.send("An unknown error occurred. Try again later after `Kanna` takes care of the bug.");
      //console.error();
    });
  }
}

module.exports.help = {
  name: "crypto"
}
