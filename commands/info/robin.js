module.exports = {
	name: "robin",
	category: "info",
	description: "Gives information about current stock market data",
	run: async (client, message, args) => {
		function postData(input) {
			$.ajax({
				type: "POST",
				url: "../../stocks.py",
				data: { param: input },
				success: callbackFunc,
			});
		}

		function callbackFunc(response) {
			return message.channel.send(response);
		}

		postData("");
	},
};
