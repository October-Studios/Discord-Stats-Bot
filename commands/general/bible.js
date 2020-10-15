const https = require('https');
const options = {
	hostname: "api.scripture.api.bible",
	port: 443,
	path: "/v1/bibles/de4e12af7f28f599-01/books",
	method: "POST",
	headers: {
		"api-key": process.env.BIBLE,
		"accept": "application/json"
	}
};

module.exports = {
	name: "bible",
	category: "general",
	description: "Test",
	usage: "test",
	run: async (client, message, args) => {
        const req = https.request(options, res => {
			res.on('data', d => {
				console.log(d);
			});
		});

		req.on('error', error => {
			console.error(error);
		});

		req.end();
    }
};