//Importing modules and required files
const botconfig = require('./config.json');
const Discord = require('discord.js');
const bot = new Discord.Client({disableEveryone: true});

//Command Handler
const fileSys = require('fs');
bot.commands = new Discord.Collection();

fileSys.readdir("./commands/", (err, files) => {
    if(err)
        console.log(err);
    let jsFile = files.filter(f => f.split(".").pop() == "js");
    if(jsFile.length <= 0){
        console.log("Couldn't Find Commands In Commands Folder");
        return;
    }
    jsFile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        console.log(`${f} loaded!`);
        bot.commands.set(props.help.name, props);
    })
})
//Ready message when bot successfully loads
bot.on("ready", async() => {
    console.log(`${bot.user.username} is online! Running on ${bot.guilds.size} servers!`);
    bot.user.setActivity("from Kanna's laptop", {type: "Watching"});
})

bot.on("message", async message => {
    if(message.author.bot)
        return; //Don't respond to messages made by the bot
    if(message.channel.type ==  'dm')
        return; //Don't respond to dm's sent to the bot

    //Variable declarations
    let prefix = botconfig.prefix;
    let msgarray = message.content.split(' '); //Splits the msg everytime there is a space
    let cmd = msgarray[0]; //Assigns the first word in msg to cmd variable. Ex: "!play"
    let args = msgarray.slice(1); //Cuts off the cmd part of the msg and assigns the rest to args variable

    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if(commandFile)
        commandFile.run(bot, message, args); //Run commands
})
bot.login(botconfig.token);
