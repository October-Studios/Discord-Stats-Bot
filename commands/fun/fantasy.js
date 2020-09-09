import { Client } from "espn-fantasy-football-api/node";
const myClient = new Client({ leagueId: 65246886 });
myClient.setCookies({
	espnS2:
		"AEA9qQqaiCig34yv99uQQFXeb2JkKhJwKgZ4AA0kvcScvs0DfnJPDZpLuN0xtRBL0smL8kvQJ7Pg6hXZ0AhoIsJ1wE1Nhay6FVPeYvzYjw%2BcKxWer0lqqUepVy5H%2FzIoKGpBitQlk%2B13e82YYv3D%2Bt%2F2%2Bu0%2BIsWp47CaGUDEFTffmJBYdeV%2F%2BAUgIqKfXg%2BHxOH5GHQnGvZ3gL6XA96fCyfidj09GRxJl4ztHlolUUCIoh52YeEeNxuL2nbiMVr7lfPEgxkJdbDeUWgfS0GrzoEJ",
	SWID: "{AB196A25-9BF2-456A-92C9-B824D9C23042}",
});

module.exports = {
	name: "fantasy",
	category: "fun",
	description: "Get stats for the 2020 Fantasy League",
	usage: "<integer>",
	run: async (client, message, args) => {
		let test = myClient.getLeagueInfo(2020).displayName();
		return message.channel.send(test);
	},
};
