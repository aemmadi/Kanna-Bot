# Changelog

## August 25, 2018

### Release Version : 1.0.4

**Command Changes**:

- Added new define command.

  `.def <term>`
  Gets definition of <term> from urbandictionary.com

**Bug Fixes**:

_none_

**Other Changes**:

_none_

## August 9, 2018

### Release Version : 1.0.3

**Command Changes**:

- Added motivate command.

  `.motivate`
  Gets a random motivation post from reddit

**Bug Fixes**:

_none_

**Other Changes**:

_none_

## August 12, 2018

### Release Version : 1.0.2

**Command Changes**:

- Added joke command.

  `.joke`
  Gets a random joke from reddit

- Renamed previous joke command to dadjoke

  `.dadjoke`
  Gets a random dad joke

  `.dadjoke <number 2-10>`
  Gets random <number> of dad jokes

**Bug Fixes**:

_none_

**Other Changes**:

_none_

## August 9, 2018

### Release Version : 1.0.1

**Command Changes**:

- Added new overwatch command.

  `.ow <username#battleTag> [platform pc/psn/xbl] top/heroes` Shows top 5 hero stats for user.

**Bug Fixes**:

_none_

**Other Changes**:

- Re-did the layout of the `.crypto top` command. Its more neater now.

## August 4, 2018

### Release Version : 1.0.0

**Command Changes**:

_none_

**Bug Fixes**:

_none_

**Other Changes**:

- Added more `.donate` command popups. To spread awareness for donation to keep the bot alive.
- Bot website now live [kannabot.ml](http://www.kannabot.ml/)

## August 3, 2018

### Release Version : 0.9.4

**Command Changes**:

_none_

**Bug Fixes**:

_none_

**Other Changes**:

- Changed CHANGELOG format (Getting ready for v1.0 release)
- Changed prefix from `!` to `.` (type commands faster, shift + 1 [!] takes too much time to type)

## August 2, 2018

`STABLE CHANGES (AVAILABLE FOR PUBLIC)`

- Added random meme command
  `!meme`
  Gets a random meme from meme subreddits in reddit

- Added random meme command
  `!meme <number 2-10>`
  Gets `<number>` random memes from meme subreddits in reddit

- Added cat image/gif commad
  `!cat`
  Displays a random cat image or gif

- Added 8ball command
  `!8ball <question?>`
  Replies with a 8ball response to question

## July 31, 2018

`STABLE CHANGES (AVAILABLE FOR PUBLIC)`

- Added overwatch stats command
  `!ow <username#battleTag> [platform pc/psn/xbl]`
  Gets basic stats of user

- Fixed issue #11, where `!dog` command replied "Error occurred. Try again". Now it is incredibly rare to get that error.

###July 30, 2018

`UNSTABLE CHANGES (NOT AVAILABLE FOR PUBLIC)`

- Added overwatch stats command
  `!ow <username#battleTag> [platform pc/psn/xbl]`
  Gets basic stats of user

## July 28, 2018

`STABLE CHANGES (AVAILABLE FOR PUBLIC)`

- Fixed issue #10, where `!crypto <coin-name/symbol>` command only checked the top 100 coins in the database. Now it checks every coin.

## July 27, 2018

`STABLE CHANGES (AVAILABLE FOR PUBLIC)`

- Fixed issue #9, where the prefix was being ignored. `+help`, `_help`, `ahelp`, etc, would work even though the command is `!help`.

## July 26, 2018

`STABLE CHANGES (AVAILABLE FOR PUBLIC)`

- Added rocket league command
  `!rl [platform pc/psn/xbl] <id>`
  Gets game stats of player

- Added league command
  `!lol <summoner-name>`
  Gets basic stats of player

## July 25, 2018

`UNSTABLE CHANGES (NOT AVAILABLE FOR PUBLIC)`

- Added league command
  `!lol <summoner-name>`
  Gets basic stats of player

## July 24, 2018

`STABLE CHANGES (AVAILABLE FOR PUBLIC)`

- Added random status changing.
  `Watching from Kanna's Laptop` and `Watching <active-servers> servers | !help`

## July 23, 2018

`STABLE CHANGES (AVAILABLE FOR PUBLIC)`

- Added crypto command
  `!crypto <coin-name/symbol>`
  Gets specific crypto stats

## July 22, 2018

`STABLE CHANGES (AVAILABLE FOR PUBLIC)`

- Removed all music features
  `reason: server costs`
  Maybe in the future

## July 21, 2018

`STABLE CHANGES (AVAILABLE FOR PUBLIC)`

- Added crypto command
  `!crypto`
  Gets global stats

- Added crypto command
  `!crypto top`
  Gets top 10 crypto's stats

## July 20, 2018

`STABLE CHANGES (AVAILABLE FOR PUBLIC)`

- Added roll command
  `!roll`
  Rolls a dice. 1, 2, 3, 4, 5, 6.

`UNSTABLE CHANGES (NOT AVAILABLE FOR PUBLIC)`

- Added crypto commands
  `!crypto`
  Gets global stats

- Added crypto commands
  `!crypto 10`
  Gets top 10 crypto's stats

- Added crypto commands
  `!crypto <coin-name>`
  Gets specific coin stats

## July 14, 2018

`STABLE CHANGES (AVAILABLE FOR PUBLIC)`

- Updated Fortnite Stats for season 5
  `!fbr <epic-username> [platform pc/xbl/psn] {mode: all/season}`

- Updated Fortnite Dropper for season 5
  `!drop`

## July 2, 2018

`UNSTABLE CHANGES (NOT AVAILABLE FOR PUBLIC)`

- Added music command
  `!stop`
  Stops playing song and leaves voice channel

## June 28, 2018

`UNSTABLE CHANGES (NOT AVAILABLE FOR PUBLIC)`

- Added music command
  `!play`
  Plays music requested by user. (Only youtube url support)

## June 10, 2018

`STABLE CHANGES (AVAILABLE FOR PUBLIC)`

- Deployed Bot to VPS;
  Stable alpha version released. (v0.0.1)

- Added Fortnite Dropper Command
  `!drop`
  Replies with a randomely chosen fortnite location on the map.

- Updated Coinflip command
  `!flip`
  Changed command syntax from "!coinflip" to "!flip" to make it easier to type command faster. Optimized the command code to minimize errors.

## June 9, 2018

`STABLE CHANGES (AVAILABLE FOR PUBLIC)`

- Updated Fortnite Command
  `!fbr <epic-username> [platform pc/xbl/psn] {mode all/season}`
  Replies with your fortnite stats. New arguement "mode" allows user to request for solo/duo/squad stats by using "all" and their season stats by using "season".

  Example: `!fbr Ninja pc all` ~ shows Ninja's solo, duo, and squad stats.

## Before June 9, 2018

`STABLE CHANGES (AVAILABLE FOR PUBLIC)`

- Added Ban Command
  `!ban <usermention> [reason]`
  Allows an admin to easily ban a user from the server

- Added Coinflip Command
  `!coinflip`
  Replies with a "HEADS" or "TAILS"

- Added Dog Command
  `!dog`
  Replies with a random dog image or gif.
  Dog videos are not supported (discord api doesnt allow it). When the bot finds a random dog video then it replies with "Error occurred. Please try again."

- Added Fortnite Command
  `!fbr <epic-username> {mode solo/duo/squad} [platform pc/xbl/psn]`
  Replies with the user's fortnite stats from Fortnite Tracker Network.

- Added Kick Command
  `!kick <usermention> [reason]`
  Allows an admin to easily kick any user

- Added Mute Command
  `!mute <usermention> [time s/m/h/d]`
  Allows an admin to temporarily mute any user

- Added Report Command
  `!report <usernmention> [reason]`
  Allows any user to report someone for admins to look out for.

- Added Role Command
  `!role [add/rm] <usermention> {role-name}`
  Allows user with previlege to easuly add a user or remove a user from a role.
