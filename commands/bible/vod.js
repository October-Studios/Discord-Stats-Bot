module.exports = {
	name: "vod",
	category: "bible",
	description: "Gets the verse of the day",
	run: async (client, message, args) => {
		fetch('https://developers.youversionapi.com/1.0/verse_of_the_day/1?version_id=1', {
            headers: {
                'X-YouVersion-Developer-Token': '{}',
                'Accept-Language': 'en',
                Accept: 'application/json',
            }
        })
        .then((result) => result.json())
        .then((json) => console.log(json));
	},
};