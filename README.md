# Kanna Bot
An easy to use, simple multi-purpose discord bot for your server. 
<img src="https://i.imgur.com/ZOAzsBK.png" alt="Kanna Bot Logo" height = "100px" width = "100px" align="right">

`Version 0.7.3 ~ Beta`

Doesn't support music playback. (server costs :/)

## Setup
It's pretty straight forward to use the bot.
You must have the necessary permissions to invite discord bots.

This bot requires `Administrator` permissions on your server.

Follow this link to invite the bot:

[Invite Kanna Bot to your Server!](https://discordapp.com/api/oauth2/authorize?client_id=450118801816551424&permissions=8&scope=bot) 

[View Trello Board for Bot](https://trello.com/b/m81jUf4o/kanna-bot)

### Requirements
There are a certain requirements you must have on your server to ensure an enhanced experience with the bot
1. Create a role solely dedicated to the bot (Ex: The Watcher) and give it the `Administrator` role
2. Keep no restrictions for the bot
3. Create a `#textchannel` called `reports` for the report command to work
4. Create a `#textchannel` called `incidents` for the kick/ban command to work

## Commands
  ### General
   * `!help` : Lists all available commands
   * `!info` : Shows bot and server information
   * `!report <user-mention>` : Allows users to report people. Example: `!report @Drago#0542` 
   * `!kick <user-mention> [reason]` : Allows admin to kick users from server. Example: `!kick @koolDog#4932 breaking rules`
   * `!ban <user-mention> [reason]` : Allows admin to ban users from server. Example: `!ban @DaBamboozle#7190 broke several rules`
   * `!mute <user-mention> [time s/m/h/d]` : Allows admin to mute an user for a certain period of time. Example: `!mute @Pikachuu#6319 6h`
   * `!role [add/rmv] <user-mention> {role-name}` : Allows admin to add/remove an user to/from a role. Example: `!role add @hayabuzaYasuo#3552 Admin`

  ### Game Stats
  #### Fortnite
   * `!fbr <epic-username [platform pc/xbl/psn]` : Shows lifetime stats of user. Example: `!fbr Ninja pc`
   * `!fbr <epic-username> [platform pc/xbl/psn] {mode all/season}` : Shows Solo/Duo/Squad stats (all) and Season Solo/Duo/Squad stats (season). Example: `!fbr Ninja pc season`
   * `!drop` : Randomly picks a spot on the fortnite map

  #### League of Legends
  * `!lol <summoner-name>` : Shows the profile overview of user

  #### Rocket League
  * `!rl [platform pc/psn/xbl] <id>` : Shows game stats | **Note**: `<id>` refers to the user's STEAMID64 (for pc), PSN Username (for ps4), and XboxGamerTag (for XboxOne). Example: `!rl pc 76561198118691382` (the number is the STEAMID64 since I requested PC stats)

  ### Crypto
   * `!crypto` : Shows global stats for all crypto's
   * `!crypto top` : Shows top 10 crypto stats
   * `!crypto <coin-name/symbol>` : Shows specific coin stats. Example: `!crypto eth` (or) `!crypto bitcoin`

  ### Feedback
   * `!issue` : Report an issue with the bot. Any unresponsive commands.
   * `!donate` : Can keep the bot running by donating for server costs :)
   
  ### Miscellaneous
   * `!dog` : Displays a random dog image or gif
   * `!flip` : Flips a coin. Heads or Tails
   * `!roll` : Rolls a dice. 1,2,3,4,5,6  

  ### More Commands Coming Soon...

## Changelog
  [View CHANGELOG](CHANGELOG.md) for changes made to the bot over time.

## Contributing
 Feel free to fork the repository and pull request it. 
 
 All I ask of you is to `comment your code` so that it would be easy to review it, and also use the template from [CONTRIBUTING.md](CONTRIBUTING.md) for structuring your pull request.
  
### This project is still under construction. 
`Realease Date : Fall 2018`
