//Importing modules and required files
const botconfig = require('./config.json');
const Discord = require('discord.js');
const bot = new Discord.Client();

//Ready message when bot successfully loads
bot.on("ready", async() => {
    console.log(`${bot.user.username} is online!`);
    bot.user.setActivity("from Kanna's laptop", {type: "Watching"});
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

    //!help : Lists all the available commands in categories
    if(cmd == `${prefix}help`){
        let embed = new Discord.RichEmbed()
            .setTitle("## COMMANDS ##")
            .setColor("#7ff441")
            .addField("General", "!botinfo : Shows bot info\n!svinfo : Shows server info\n!report <username> : Allows user to report users\n!kick <username> : Allows admin to kick another user")
            .addField("Music", "!play <youtube-url> : Plays the song from youtube servers");
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

    //!report : Allows user to report other users
    if(cmd == `${prefix}report`){
        let user = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!user)
            return message.channel.send("Error. User not found, make sure you are using the right input: !report <usermention> [reason].");
        let reason = args.join(" ").slice(22);
        let embed = new Discord.RichEmbed()
            .setTitle("## REPORTED DETAILS ##")
            .setDescription("Report != kick/ban. Reporting a user gives admin a reason to keep an eye on the user reported")
            .setColor("#f46441")
            .addField("Reported User", `${user} with ID : ${user.id}`)
            .addField("Reported By", `${message.author}`)
            .addField("Channel", message.channel)
            .addField("Reported Time", message.createdAt)
            .addField("Reason", reason);

            let channel = message.guild.channels.find('name', "reports");
            if(!channel)
                return message.channel.send("This server hasn't setup reports yet. To set it up, all you have to do is make a new text channel and give it the name 'reports'.")
            message.delete().catch(O_o => {});
            message.channel.send(`Report sent\nSuccessfully reported ${user}, Reason: ${reason}\nFull report available at '#reports' channel`);
            return channel.send(embed);
    }
})
//bot.login(botconfig.token);
bot.login(process.env.BOT_TOKEN); //For Heroku Deployment
