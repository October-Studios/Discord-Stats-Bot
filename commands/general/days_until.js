module.exports = {
	name: "days_until",
	aliases: ["du"],
	category: "general",
	description: "Returns the number of days until a given date",
	usage: "<date (mm/dd/yyyy)>",
	run: async (client, message, args) => {
        if (!args[0]) {
            return message.channel.send("Please provide a date!");
        } else if (!(/^[0-1][0-9]\/([0-2][0-9]|3[0-1])\/[0-9]{4}$/.test(args[0]))) {
            return message.channel.send("Invalid date format! Please use mm/dd/yyyy");
        } else {
            var temp = Date.now();
            var day1 = new Date(temp);
            var day2 = new Date(args[0]);

            var time_diff = day2.getTime() - day1.getTime();
            var day_diff = time_diff / (1000 * 3600 * 24);

            if (Math.ceil(day_diff) > 0) {
                return message.channel.send("There are " + Math.ceil(day_diff) + " days until " + args[0]);
            } else if (Math.ceil(day_diff) == 0) {
                return message.channel.send("That's today!");
            } else if (Math.ceil(day_diff) < 0) {
                return message.channel.send(args[0] + " was " + Math.ceil(day_diff * -1) + " days ago!");
            }
        }
    }
};
