var cheerio = require("cheerio");
const axios = require("axios");
var alerts = [];
var outlook_string_1 = "";
var outlook_string_2 = "";
var outlook_string_3 = "";

module.exports = {
	alerts,
	outlook_string_1,
	outlook_string_2,
	outlook_string_3,
};

function Alert(location, type, headline, description) {
	this.location = location;
	this.type = type;
	this.headline = headline;
	this.description = description;
}

function isEquivalent(a, b) {
	var aProps = Object.getOwnPropertyNames(a);
	var bProps = Object.getOwnPropertyNames(b);

	if (aProps.length != bProps.length) {
		return false;
	}

	for (var i = 0; i < aProps.length; i++) {
		var propName = aProps[i];

		if (a[propName] !== b[propName]) {
			return false;
		}
	}
	return true;
}

function getWarnings() {
	var b = true;
	var allAlerts = [];
	axios
		.get("https://api.weather.gov/alerts/active?area=TN")
		.then(function (response) {
			for (let i = 0; i < response.data.features.length; i++) {
				if (response.data.features[i].properties.areaDesc.includes("Lincoln")) {
					var a = new Alert(
						response.data.features[i].properties.areaDesc,
						response.data.features[i].properties.event,
						response.data.features[i].properties.headline,
						response.data.features[i].properties.description
					);
					allAlerts.push(a);
					var j = 0;
					if (alerts.length != 0) {
						while (j < alerts.length) {
							if (!isEquivalent(a, alerts[j])) {
							} else {
								b = false;
								break;
							}
							j++;
						}
						if (b == true) {
							alerts.push(a);
						}
					} else {
						alerts.push(a);
					}
				}
			}
			if (alerts.length >= allAlerts.length && allAlerts.length != 0) {
				for (var i = 0; i < alerts.length; i++) {
					for (var j = 0; j < allAlerts.length; j++) {
						if (isEquivalent(alerts[i], allAlerts[j])) {
							break;
						}
						if (j + 1 == allAlerts.length) {
							alerts.splice(i, 1);
						}
					}
					if (alerts.length == allAlerts.length) {
						break;
					}
				}
			} else if (allAlerts.length == 0) {
				alerts = [];
			}
		})
		.catch(function (error) {
			console.log(error);
		});
}

function getOutlooks() {
	axios
		.get("https://www.spc.noaa.gov/products/outlook/day1otlk.html")
		.then(function (response) {
			const $ = cheerio.load(response.data);
			const time = $("td.zz").text();
			const timeArr = time.split(" ");
			const utcTime = timeArr[4];
			outlook_string_1 =
				"https://www.spc.noaa.gov/products/outlook/day1otlk_" +
				utcTime +
				".gif";
		})
		.catch(function (error) {
			console.log(error);
		});
	axios
		.get("https://www.spc.noaa.gov/products/outlook/day2otlk.html")
		.then(function (response) {
			const $ = cheerio.load(response.data);
			const time = $("td.zz").text();
			const timeArr = time.split(" ");
			const utcTime = timeArr[3];
			outlook_string_2 =
				"https://www.spc.noaa.gov/products/outlook/day2otlk_" +
				utcTime +
				".gif";
		})
		.catch(function (error) {
			console.log(error);
		});
	axios
		.get("https://www.spc.noaa.gov/products/outlook/day3otlk.html")
		.then(function (response) {
			const $ = cheerio.load(response.data);
			const time = $("td.zz").text();
			const timeArr = time.split(" ");
			const utcTime = timeArr[3];
			outlook_string_3 =
				"https://www.spc.noaa.gov/products/outlook/day3otlk_" +
				utcTime +
				".gif";
		})
		.catch(function (error) {
			console.log(error);
		});
}

module.exports = {
	name: "wpoll",
	aliases: ["wp"],
	category: "weather",
	description: "Activate polling for weather alerts",
	run: async (client, message) => {
		if (message.channel.id === "690767163178483733") {
			if (process.env.POLLING === "FALSE") {
				setInterval(function () {
					getWarnings();
					getOutlooks();
				}, 30 * 1000);
				process.env.POLLING = "TRUE";
				return message.channel
					.send("Data scraping is active")
					.catch(console.error);
			} else {
				return message.channel.send("Polling already active!");
			}
		}
	},
};
