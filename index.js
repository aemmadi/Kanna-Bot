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
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser)
            return message.channel.send("Error. User not found, make sure you are using the right input: !report <usermention> [reason].");
        let reason = args.join(" ").slice(22);
        let embed = new Discord.RichEmbed()
            .setTitle("## REPORTED DETAILS ##")
            .setDescription("Report != kick/ban. Reporting a user gives admin a reason to keep an eye on the user reported")
            .setColor("#f46441")
            .addField("Reported User", `${rUser} with ID : ${rUser.id}`)
            .addField("Reported By", `${message.author}`)
            .addField("Channel", message.channel)
            .addField("Reported Time", message.createdAt)
            .addField("Reason", reason);

            let rChannel = message.guild.channels.find('name', "reports");
            if(!rChannel)
                return message.channel.send("This server hasn't setup reports yet. To set it up, all you have to do is make a new text channel and give it the name 'reports'.");
            message.delete().catch(O_o => {});
            message.channel.send(`Report sent\nSuccessfully reported ${rUser}, Reason: ${reason}\nFull report available at '#reports' channel`);
            return rChannel.send(embed);
    }

    //!kick : Allows an admin to kick an user
    if(cmd == `${prefix}kick`){
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser)
            return message.channel.send("Error. User not found, make sure you are using the right input: !kick <usermention> [reason].");
        let reason = args.join(" ").slice(22);
        if(!message.member.hasPermission('KICK_MEMBERS'))
            return message.channel.send("You don't have the permission to kick other users.");
        if(kUser.hasPermission('KICK_MEMBERS'))
            return message.channel.send(`Oops, looks like ${kUser} has admin permissions or is either an equal to you or higher than you.`);
        let embed = new Discord.RichEmbed()
            .setTitle("## KICKED A USER FROM SERVER ##")
            .setDescription("kick != ban. Kicking an user does not mean banning the user, the user can join back if given another invite.")
            .setColor("#f44e42")
            .addField("Kicked User", `${kUser} with ID : ${kUser.id}`)
            .addField("Kicked By", `${message.author}`)
            .addField("Kicked At", message.channel)
            .addField("Kicked On", message.createdAt)
            .addField("Reason", reason);

            let iChannel = message.guild.channels.find('name', "incidents");
            if(!iChannel)
                return message.channel.send("This server hasn't setup kicks/bans yet. To set it up, all you have to do is make a new text channel and give it the name 'incidents'.")
            message.guild.member(kUser).kick(reason);
            message.delete().catch(O_o => {});
            message.channel.send(`Kicked User.\nSuccessfully kicked ${kUser}, Reason: ${reason}\nFull kick report available at '#incidents' channel`);
            return iChannel.send(embed);
    }

    //!ban : Allows an admin to ban an user
    if(cmd == `${prefix}ban`){
        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser)
            return message.channel.send("Error. User not found, make sure you are using the right input: !ban <usermention> [reason].");
        let reason = args.join(" ").slice(22);
        if(!message.member.hasPermission('BAN_MEMBERS'))
            return message.channel.send("You don't have the permission to ban other users.");
        if(bUser.hasPermission('BAN_MEMBERS'))
            return message.channel.send(`Oops, looks like ${bUser} has admin permissions or is either an equal to you or higher than you.`);
        let embed = new Discord.RichEmbed()
            .setTitle("## BANNED A USER FROM SERVER ##")
            .setDescription("Ban > Kick. Banning a user kicks the user out for good. The user can not join back even with an invite")
            .setColor("#f44141")
            .addField("Banned User", `${bUser} with ID : ${bUser.id}`)
            .addField("Banned By", `${message.author}`)
            .addField("Banned At", message.channel)
            .addField("Banned On", message.createdAt)
            .addField("Reason", reason);

            let iChannel = message.guild.channels.find('name', "incidents");
            if(!iChannel)
                return message.channel.send("This server hasn't setup kicks/bans yet. To set it up, all you have to do is make a new text channel and give it the name 'incidents'.")
            message.guild.member(bUser).ban(reason);
            message.delete().catch(O_o => {});
            message.channel.send(`Banned User.\nSuccessfully Banned ${bUser}, Reason: ${reason}\nFull ban report available at '#incidents' channel`);
            return iChannel.send(embed);
    }
})
bot.login(botconfig.token);
//bot.login(process.env.BOT_TOKEN); //For Heroku Deployment
