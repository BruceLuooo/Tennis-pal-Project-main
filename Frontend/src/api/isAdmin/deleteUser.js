import axios from 'axios';

export default function deleteUser(user) {
	const test = async () => {
		await axios.post('http://localhost:3001/api/allUsers/deleteUser', {
			_id: user,
		});
	};
	return test();
}
