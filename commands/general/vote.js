const { MessageEmbed } = require('discord.js');

module.exports = {
	name: "vote",
	category: "general",
	description: "Creates a poll for the time alotted",
	usage: "<time s|m> <question>",
	run: async (client, message, args) => {
    if (!args.length){
      message.channel.send('Please provide a time and a question!')
    } else {
      let time = args[0];
      let question = args.slice(1).join(" ");
      let regex = new RegExp(/^([0-9]{2}|[0-9]{1})[sSmM]$/);
      if (regex.test(time)){
        if (time.toLowerCase().endsWith('s')) {
			    time = parseInt(time.substring(0, time.indexOf('s')));
          time *= 1000;
        } else if(time.toLowerCase().endsWith('m')) {
          time = parseInt(time.substring(0, time.indexOf('m')));
          time *= 60 * 1000;
        }
        const embed = new MessageEmbed()
          .setColor('#FBD130')
          .setTitle(question)
          .setTimestamp();
        try {
          const polls = new Map();
          const userVotes = new Map();
          let filter = (reaction, user) => {
            if(user.bot) return false;
            if(['👍','👎'].includes(reaction.emoji.name)) {
              if (polls.get(reaction.message.id).get(user.id)) {
                console.log("User already voted");
                return false;
              } else {
                console.log("User did not vote");
                userVotes.set(user.id, reaction.emoji.name);
                console.log(userVotes);
                return true;
              }
            }
          }
          let msg = await message.channel.send(embed);
          await msg.react('👍');
          await msg.react('👎');
          polls.set(msg.id, userVotes);
          let reactions = await msg.awaitReactions(filter, { time: time });
          let thumbsUp = reactions.get('👍');
          let thumbsDown = reactions.get('👎');
          let thumbsUpResults = 0, thumbsDownResults = 0;
          if(thumbsUp) {
            thumbsUpResults = thumbsUp.users.cache.filter(u => !u.bot).size;
          }
          if(thumbsDown) {
            thumbsDownResults = thumbsDown.users.cache.filter(u => !u.bot).size;
          }
          let description = `👍 - ${thumbsUpResults} votes\n👎 - ${thumbsDownResults} votes\n`
          const resultsEmbed = new MessageEmbed()
            .setColor('#73D673')
            .setTitle('Results')
            .setDescription(description);
          await message.channel.send(resultsEmbed);
        }
        catch(err) {
          console.log(err);
        }
      }
    }
	}
}
