const axios = require('axios');

module.exports = {
    name: "results",
	category: "election",
	description: "Pulls the current results of the presidential election",
	run: async (client, message, args) => {
        axios.get('https://www.270towin.com/2020-election-results-live/')
        .then((response) => {
            console.log(response.data);
        })
        .catch((error) => {
            console.error(error);
        });
    },
};