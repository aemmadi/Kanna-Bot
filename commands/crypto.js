const CoinMarketCap = require('coinmarketcap-api');
const client = new CoinMarketCap();

module.exports.run = async (bot, message, args) =>{
  //client.getListings().then(console.log).catch(console.error);
// client.getTicker().then(console.log).catch(console.error);
//  client.getGlobal().then(console.log).catch(console.error);

  let topList = client.getTicker({convert: 'USD'});
    let topArray = [];
    let discard = [];
    if(topList.rank >= 10){
      console.log(topList);
      for(var i = 0; i < discard.length; i++){
        discard[i] = topList.name;
        console.log(discard);
      }
    }else{
      for(var i = 0; i < topArray.length; i++){
        topArray[i] = topList.rank;
        console.log(topArray);
      }
    }
}

module.exports.help = {
  name: "crypto"
}
