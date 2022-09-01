import { useState, useEffect } from 'react';
import axios from 'axios';
import CourtLists from '../components/CourtLists';
import ScrollPageButtons from '../components/buttons/ScrollPageButtons';

function Courts() {
	const LOCALHOST_URL = 'http://localhost:5000';

	const [loading, setLoading] = useState(true);
	const [courts, setCourts] = useState([]);
	const [numOfPages, setNumOfPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');

	useEffect(() => {
		const courtData = async () => {
			try {
				setCurrentPage(1);
				const { data } = await axios.get(
					`${LOCALHOST_URL}/api/allCourts?search=${search}`,
				);
				setCourts(data.courts);
				setNumOfPages(data.numOfPages);
				setLoading(false);
			} catch (error) {
				console.log(error);
			}
		};
		courtData();
	}, [search]);

	useEffect(() => {
		const courtData = async () => {
			try {
				const { data } = await axios.get(
					`${LOCALHOST_URL}/api/allCourts?&page=${currentPage}&search=${search}`,
				);
				setCourts(data.courts);
			} catch (error) {
				console.log(error);
			}
		};
		courtData();
	}, [currentPage]);

	const onChange = e => {
		setSearch(e.target.value);
	};

	if (loading) {
		<div className='page-containers'>
			<div className='searchbar'>
				<input type='text' />
			</div>
			<div className='all-courts-container'>loading...</div>
		</div>;
	}
	return (
		<div className='page-containers'>
			<div className='searchcourts-container'>
				<div className='searchbar'>
					<h3> Search Courts : </h3>
					<input type='text' value={search} onChange={onChange} />
				</div>
				<div className='courts-container'>
					{courts.map(court => (
						<CourtLists key={court._id} court={court} />
					))}
				</div>
				<ScrollPageButtons
					numOfPages={numOfPages}
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
				/>
			</div>
		</div>
	);
}

export default Courts;
