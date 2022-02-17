import * as axios from 'axios';

const usersHttp = {
	getListUsers: async function(body) {
		const result = await axios.get(`http://localhost:4000/users`, body);
		console.log("result", result);
		return result.data;
	},
};

export default usersHttp;