//Importing modules and required files
const botconfig = require('./botconfig.json');
const Discord = require('discord.js');
const bot = new Discord.Client();

//Ready message when bot successfully loads
bot.on("ready", async() => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("on Kanna's laptop")
})

bot.on("message", async message => {
    if(message.author.bot)
        return; //Don't respond to messages made by the bqot
    if(message.channel.type ==  'dm')
        return; //Don't respond to dm's sent to the bot

bot.login(botconfig.token);
