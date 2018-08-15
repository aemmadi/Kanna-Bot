const Discord = require("discord.js");
const superagent = require("superagent");

//.reddit <r/subreddit> - Gets a random hot post from <r/subreddit>
//.reddit <r/subreddit> top - Gets the top post from <r/subreddit>
//.reddit <r/subreddit> new - Gets the newest post from <r/subreddit>
module.exports.run = async (bot, message, args) => {
  if (!args[0])
    return message.channel.send(
      "Please specify a subreddit.\n`.reddit <r/subreddit>` - Gets a random hot post from <r/subreddit>\n`.reddit <r/subreddit> top` - Gets the top post from <r/subreddit>\n`.reddit <r/subreddit> new` - Gets the newest post from <r/subreddit>"
    );

  let subReddit = args[0].replace("r/", "");
  console.log(subReddit);
  let subCheck = await subRedditChecker(subReddit);

  if (!subCheck)
    return message.channel.send(
      "Please specify a **valid** subreddit.\n`.reddit <r/subreddit>` - Gets a random hot post from <r/subreddit>\n`.reddit <r/subreddit> top` - Gets the top post from <r/subreddit>\n`.reddit <r/subreddit> new` - Gets the newest post from <r/subreddit>"
    );

  let type = "hot";

  if (args[1] == "top") {
    type = "top";
  } else if (args[1] == "new") {
    type = "new";
  }

  let post = await getRedditPost(subReddit, type);

  if (post.nsfw) {
    if (!message.channel.nsfw)
      return message.channel.send(
        "**This post contains NSFW content, and this text channel doesn't allow NSFW content**"
      );
  }

  if (post.type == "text") {
    //prettier-ignore
    return message.channel.send(`##################################################\n\n**${post.title}**\n\n##################################################\n\nSubreddit: **${post.url}**\nUpvotes: **${post.upvotes}**\nAuthor: [${post.author}] (https://www.reddit.com/u/${post.author}/)\n\n##################################################\n\n${post.content}\n\n##################################################`);
  } else if (post.type == "image") {
    //prettier-ignore
    let embed = new Discord.RichEmbed()
      .setTitle("## REDDIT IMAGE POST ##")
      .setDescription(`**${post.title}** | Scraped from **${post.url}** | Upvotes: **${post.upvotes}** | Author: **[${post.author}](https://www.reddit.com/u/${post.author})**`)
      .setThumbnail(post.thumbnail)
      .setImage(post.url);

    return message.channel.send(embed);
  }
  async function getRedditPost(subReddit) {
    let { body } = await superagent
      .get(`https://www.reddit.com/r/${subReddit}/${type}.json?limit=100`)
      .on("error", err => {
        //console.error(err);
        return message.channel.send(
          "Error occurred while checking the subreddit. Try again. `.help reddit`.\n\n **If this problem keeps arising, make sure you use the `.issue` command to report any issues with the bot**"
        );
      });

    let random = randomNumber(100);
    let selectedPost = body.data.children[random];

    let media = getMediaType(selectedPost);

    let title = selectedPost.data.title;
    let content = selectedPost.data.selftext;
    let thumbnail = selectedPost.data.thumbnail;
    let url = selectedPost.data.url;
    let upvotes = selectedPost.data.ups;
    let author = selectedPost.data.author;
    let nsfw = selectedPost.data.over_18;

    return {
      type: media.type,
      title: title,
      content: content,
      upvotes: upvotes,
      author: author,
      nsfw: nsfw,
      url: url,
      thumbnail: thumbnail
    };
  }

  async function subRedditChecker(subReddit) {
    let { body } = await superagent
      .get(`https://www.reddit.com/r/${subReddit}/hot.json?limit=100`)
      .on("error", err => {
        //console.error(err);
        return message.channel.send(
          "Error occurred while checking the subreddit. Try again. `.help reddit`.\n\n **If this problem keeps arising, make sure you use the `.issue` command to report any issues with the bot**"
        );
      });

    if (
      body.data.dist == 0 &&
      body.data.after == null &&
      body.data.before == null
    )
      return false;
    return true;
  }

  function getMediaType(selectedPost) {
    let link = linkChecker(selectedPost.data.url);
    let mediaType = "image";
    if (!link) mediaType = "text";
    return {
      type: mediaType
    };
  }

  function linkChecker(link) {
    return link.match(/\.(jpeg|jpg|gif|png)$/) != null; //TRUE or FALSE. if url ends with .jpeg, .jpg, .png, or .gif
  }

  function randomNumber(num) {
    let picker = Math.floor(Math.random() * num); //Generates a random number
    return picker;
  }
};

module.exports.help = {
  name: "reddit"
};
