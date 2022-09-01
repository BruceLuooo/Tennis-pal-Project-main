import axios from 'axios';

export default function deleteCourts(courtName) {
	const test = async () => {
		await axios.post('http://localhost:5000/api/allCourts/deleteCourt', {
			name: courtName,
		});
	};
	return test();
}
