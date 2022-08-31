import { useState, useEffect } from 'react';
import axios from 'axios';
import CourtLists from '../components/CourtLists';

function Courts() {
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
					`http://localhost:5000/api/allCourts?search=${search}`,
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
					`http://localhost:5000/api/allCourts?&page=${currentPage}&search=${search}`,
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

	const totalPages = Array.from({ length: numOfPages }, (_, index) => {
		return index + 1;
	});

	const nextPage = () => {
		let newPage = currentPage + 1;

		if (newPage > numOfPages) {
			setCurrentPage(1);
		} else {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		let newPage = currentPage - 1;

		if (newPage < 1) {
			setCurrentPage(numOfPages);
		} else {
			setCurrentPage(currentPage - 1);
		}
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
				<div className={numOfPages === 0 ? 'blank' : 'page-btn-container'}>
					<button className='pageBtn' onClick={prevPage}>
						Prev
					</button>

					{totalPages.map(data => {
						return (
							<button
								type='button'
								className={data === currentPage ? 'pageBtn-active' : 'pageBtn'}
								key={data}
								onClick={() => setCurrentPage(data)}
							>
								{data}
							</button>
						);
					})}
					<button className='pageBtn' onClick={nextPage}>
						Next
					</button>
				</div>
			</div>
		</div>
	);
}

export default Courts;
