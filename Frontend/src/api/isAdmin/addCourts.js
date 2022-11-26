import axios from 'axios';

export default function addCourts(newCourt) {
	const test = async () => {
		await axios.post(
			'http://localhost:3001/api/allCourts/addNewCourt',
			newCourt,
		);
	};

	return test();
}
