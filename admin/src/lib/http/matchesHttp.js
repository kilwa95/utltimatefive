import * as axios from 'axios';

const matchesHttp = {
	getListMatches: async function(body) {
		const result = await axios.get(`http://localhost:4000/matchs`, body);
		console.log("result", result);
		return result.data;
	},
};

export default matchesHttp;