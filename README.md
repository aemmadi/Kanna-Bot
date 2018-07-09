# Kanna Bot
An easy to use simple multi-purpose discord bot for your server. 
<img src="https://pre00.deviantart.net/f86f/th/pre/f/2017/286/0/7/creepy_discord_icon___logo_remix_by_treetoadart-dbqg8wi.png" alt="Kanna Bot Logo" height = "100px" width = "100px" align="right">

`Version 0.0.1 ~ Alpha`

## Setup
It's pretty straight forward to use the bot.
You must have the necessary permissions to invite discord bots.

Follow this link to invite the bot:

[Invite Kanna Bot to your Server!](https://discordapp.com/api/oauth2/authorize?client_id=450118801816551424&permissions=8&scope=bot) 

or, if the above link doesn't work

https://discordapp.com/api/oauth2/authorize?client_id=450118801816551424&permissions=8&scope=bot

### Requirements
There are a certain requirements you must have on your server to ensure an enhanced experience with the bot
1. Create a role solely dedicated to the bot (Ex: Bot-Role) and give it the `Administrator` role
2. Keep no restrictions for the bot
3. Create a `#textchannel` called `reports` for the report command to work
4. Create a `#textchannel` called `incidents` for the kick/ban command to work

## Features
 * General (info, report, kick, ban, etc...)
 * Fortnite (Stats and random dropper)
 * Coin Flip
 * Random Dog Image/GIF
 * Music (still working on it)
 
## Changelog
  #### July 2, 2018
  `UNSTABLE CHANGES (NOT AVAILABLE FOR PUBLIC)`

  + Added music command
  `!stop`
  Stops playing song and leaves voice channel
  #### June 28, 2018
  `UNSTABLE CHANGES (NOT AVAILABLE FOR PUBLIC)`

  + Added music command 
    `!play`
    Plays music requested by user. (Only youtube url support)

  #### June 10, 2018
  `STABLE CHANGES (AVAILABLE FOR PUBLIC)`

  + Deployed Bot to VPS;
    Stable alpha version released. (v0.0.1)
  
  + Added Fortnite Dropper Command
    `!drop`
    Replies with a randomely chosen fortnite location on the map.
  
  + Updated Coinflip command
  `!flip`
  Changed command syntax from "!coinflip" to "!flip" to make it easier to type command faster. Optimized the command code to minimize errors.

  #### June 9, 2018
  `STABLE CHANGES (AVAILABLE FOR PUBLIC)`

  + Updated Fortnite Command
    `!fbr <epic-username> [platform pc/xbl/psn] {mode all/season}`
    Replies with your fortnite stats. New arguement "mode" allows user to request for solo/duo/squad stats by using "all" and their season stats by using "season".

    Example: `!fbr Ninja pc all` ~ shows Ninja's solo, duo, and squad stats.
    
  #### Before June 9, 2018
  `STABLE CHANGES (AVAILABLE FOR PUBLIC)`

  + Added Ban Command
    `!ban <usermention> [reason]`
    Allows an admin to easily ban a user from the server

  + Added Coinflip Command
    `!coinflip`
    Replies with a "HEADS" or "TAILS"

  + Added Dog Command
    `!dog`
    Replies with a random dog image or gif.
    Dog videos are not supported (discord api doesnt allow it). When the bot finds a random dog video then it replies with "Error occurred. Please try again."

  + Added Fortnite Command
    `!fbr <epic-username> {mode solo/duo/squad} [platform pc/xbl/psn]`
    Replies with the user's fortnite stats from Fortnite Tracker Network.

  + Added Kick Command
    `!kick <usermention> [reason]`
    Allows an admin to easily kick any user

  + Added Mute Command
    `!mute <usermention> [time s/m/h/d]`
    Allows an admin to temporarily mute any user

  + Added Report Command
    `!report <usernmention> [reason]`
    Allows any user to report someone for admins to look out for.

  + Added Role Command
    `!role [add/rm] <usermention> {role-name}`
    Allows user with previlege to easuly add a user or remove a user from a role.

## Contributing
 Feel free to fork the repository and pull request it. All I ask of you is to `comment your code` so that it would be easy to review it, and also make a `detailed pull request` so I will know where to look.

 ### Dependencies
 Before you clone this repository to customize the bot, here are the dependencies I used to make this bot.
 * `nodemon`
 * `discord.js`
 * `fortnite`
 * `request`
 * `heroku`
 * `ms`
 * `fs`
 * `superagent`
  
### This project is still under construction. 
`Realease Date : Fall 2018`
