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

    //Variable declarations
    let prefix = botconfig.prefix;
    let msgarray = message.content.split(' '); //Splits the msg everytime there is a space
    let cmd = msgarray[0]; //Assigns the first word in msg to cmd variable. Ex: "!play"
    let args = msgarray.slice(1); //Cuts off the cmd part of the msg and assigns the rest to args variable

    //Commands
    if(cmd == `${prefix}hello`){
        return message.channel.send("Hello!");
    }

    if(cmd == `${prefix}botinfo`){
        let embed = new Discord.RichEmbed()
            .setTitle("## Bot Information ##")
            .setColor("#f4a442")
            .setThumbnail(bot.user.displayAvatarURL)
            .addField("Bot Name", bot.user.username)
            .addField("Created on", bot.user.createdAt);
            return message.channel.send(embed);
    }

    if(cmd == `${prefix}serverinfo` || cmd == `${prefix}svinfo`){
        let embed = new Discord.RichEmbed()
            .setTitle("## Server Information ##")
            .setColor("#418ff4")
            .setThumbnail(message.guild.iconURL)
            .addField("Server Name", message.guild.name)
            .addField("Server ID", message.guild.id)
            .addField("Created on", message.guild.createdAt)
            .addField("Server Region", message.guild.region)
            .addField("Server Owner", message.guild.owner)
            .addField("Server Roles", message.guild.roles)
            .addField("Total Members", message.guild.memberCount);
            return message.channel.send(embed);
    }
})
bot.login(botconfig.token);
