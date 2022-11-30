import { useState, useEffect } from 'react';
import axios from 'axios';
import CourtLists from '../components/CourtLists';
import ScrollPageButtons from '../components/buttons/ScrollPageButtons';
import useDebounce from '../hooks/useDebounce';

function Courts() {
	const localhostUrl = 'http://localhost:5000';

	const [courts, setCourts] = useState([]);
	const [numOfPages, setNumOfPages] = useState(1);
	const [currentPage, setCurrentPage] = useState(1);
	const [search, setSearch] = useState('');
	const debounce = useDebounce(search, 300);

	useEffect(() => {
		getAllCourts();
	}, [currentPage]);

	useEffect(() => {
		setCurrentPage(1);
		getAllCourts();
	}, [debounce]);

	const getAllCourts = async () => {
		try {
			const { data } = await axios.get(
				`${localhostUrl}/api/allCourts?&page=${currentPage}&search=${search}`,
			);
			setCourts(data.courts);
			setNumOfPages(data.numOfPages);
			return;
		} catch (error) {
			console.log(error);
			return;
		}
	};

	return (
		<main className='page-containers'>
			<div className='searchcourts-container'>
				<section className='searchbar'>
					<h3> Search Courts : </h3>
					<input
						type='text'
						value={search}
						onChange={e => setSearch(e.target.value)}
					/>
				</section>
				<section className='courts-container'>
					{courts.map(court => (
						<CourtLists key={court._id} court={court} />
					))}
				</section>
				<ScrollPageButtons
					numOfPages={numOfPages}
					setCurrentPage={setCurrentPage}
					currentPage={currentPage}
				/>
			</div>
		</main>
	);
}

export default Courts;
