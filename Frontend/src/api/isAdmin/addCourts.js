import axios from 'axios';

export default function addCourts(newCourt) {
	const test = async () => {
		await axios.post(
			'http://localhost:5000/api/allCourts/addNewCourt',
			newCourt,
		);
	};

	return test();
}
