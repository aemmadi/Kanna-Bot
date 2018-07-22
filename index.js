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
        commandFile.run(bot, message, args);
    
    //Commands
    if(cmd == `${prefix}hello`){
        return message.channel.send("Hello!");
    }

    //!help : Lists all the available commands in categories
    if(cmd == `${prefix}help`){
        let embed = new Discord.RichEmbed()
            .setTitle("## COMMANDS ##")
            .setColor("#7ff441")
            .addField("General", "`!botinfo` : Shows bot info\n`!svinfo` : Shows server info\n`!report <usermention>` : Allows user to report users\n`!kick <usermention> [reason]` : Allows admin to kick another user\n`!ban <usermention> [reason]` : Allows admin to ban users\n`!mute <usermention> [time s/m/h/d]` : Allows admin to mute an user for a certain period\n`!role [add/rmv] <usermention> {role-name}` : Allows admin to add or remove an user from a role")
            .addField("Fortnite", "`!fbr <epic-username> [platform pc/xbl/psn] {mode all/season}` : Looks up stats for fortnite.\nFOR LIFETIME STATS `!fbr <epic-username> [platform pc/xbl/psn]`\n`!drop` : Randomly picks a spot on the fortnite map")
            .addField("Misc.", "`!flip` : Flips a coin and replies HEADS or TAILS\n`!dog` : Random dog image or gif\n`!roll` : Rolls a dice");
            return message.channel.send(embed);
    }

    //!botinfo : Displays information about the bot
    if(cmd == `${prefix}botinfo`){
        let embed = new Discord.RichEmbed()
            .setTitle("## BOT INFORMATION ##")
            .setColor("#f4a442")
            .setThumbnail(bot.user.displayAvatarURL)
            .addField("Bot Name", bot.user.username)
            .addField("Created on", bot.user.createdAt);
            return message.channel.send(embed);
    }

    //!svinfo : Displays information about the server
    if(cmd == `${prefix}serverinfo` || cmd == `${prefix}svinfo`){
        let embed = new Discord.RichEmbed()
            .setTitle("## SERVER INFORMATION ##")
            .setColor("#418ff4")
            .setThumbnail(message.guild.iconURL)
            .addField("Server Name", message.guild.name)
            .addField("Server ID", message.guild.id)
            .addField("Created on", message.guild.createdAt)
            .addField("Server Region", message.guild.region)
            .addField("Server Owner", message.guild.owner)
            .addField("Total Members", message.guild.memberCount);
            return message.channel.send(embed);
    }
})

bot.login(botconfig.token);

