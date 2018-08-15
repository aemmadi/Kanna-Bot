//Importing modules and required files
const config = require("./config.json");
const Discord = require("discord.js");
const bot = new Discord.Client({ disableEveryone: true });

// //DISCORDBOTS.ORG SERVER COUNT API
// //-------------------------------------------------------------\\
// const DBL = require("dblapi.js");
// const dbl = new DBL(config.dblApi, bot);
// dbl.on("posted", () => {
//   console.log("Server count posted on discordbots.org!");
// });

// dbl.on("error", e => {
//   console.log(`Error connecting with discordbots.org`);
// });
// //-------------------------------------------------------------\\

//Command Handler
const fileSys = require("fs");
bot.commands = new Discord.Collection();

fileSys.readdir("./commands/", (err, files) => {
  if (err) console.log(err);
  let jsFile = files.filter(f => f.split(".").pop() == "js");
  if (jsFile.length <= 0) {
    console.log("Couldn't Find Commands In Commands Folder");
    return;
  }
  jsFile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });
});
//Ready message when bot successfully loads
bot.on("ready", async () => {
  console.log(
    `${bot.user.username} is online! Running on ${bot.guilds.size} servers!`
  );
  let status = [`from Kanna's Laptop`, `${bot.guilds.size} servers | .help`];
  status_change(status); //Random status displays
});

// This is called as, for instance:
bot.on("guildCreate", guild => {
  const defaultChannel = guild.channels.find(c =>
    c
      .type("text")
      .permissionsFor(guild.me)
      .has("SEND_MESSAGES")
  );
  defaultChannel.send(`Welcome!`);
});

bot.on("message", async message => {
  if (message.author.bot) return; //Don't respond to messages made by the bot
  if (message.channel.type == "dm") return; //Don't respond to dm's sent to the bot

  //Variable declarations
  let prefix = config.prefix;
  let msgarray = message.content.split(" "); //Splits the msg everytime there is a space
  let cmd = msgarray[0]; //Assigns the first word in msg to cmd variable. Ex: "!play"
  let args = msgarray.slice(1); //Cuts off the cmd part of the msg and assigns the rest to args variable

  if (cmd.charAt(0) == prefix) {
    let commandFile = bot.commands.get(cmd.slice(prefix.length));
    if (commandFile) commandFile.run(bot, message, args); //Run commands
  }
});
bot.login(config.devToken);

function status_change(status) {
  setInterval(function() {
    let chosen = status[Math.floor(Math.random() * status.length)];
    bot.user.setActivity(`${chosen}`, { type: "Watching" });
  }, 10000);
}
