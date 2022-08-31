import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import ProfileCards from '../components/ProfileCards';
import appContext from '../context/appContext';

function Search() {
	const [users, setUsers] = useState(null);
	const [locationsLists, setLocationsList] = useState([]);
	const [filter, setFilter] = useState({
		level: [],
		locations: [],
	});
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [numOfPages, setNumOfPages] = useState(1);
	const { user } = useContext(appContext);
	const playerLevel = [1, 2, 3, 4, 5];

	useEffect(() => {
		const getAllUsers = async () => {
			try {
				const params = new URLSearchParams();
				filter.level.forEach(level => params.append('level[]', level));
				filter.locations.forEach(location =>
					params.append('locations[]', location),
				);
				// http://localhost:5000/api/allUsers?level[]=1&level[]=2
				const { data } = await axios.get(
					`http://localhost:5000/api/allUsers?page=${currentPage}`,
					{ params },
				);
				setUsers(data.allUsers);
				setNumOfPages(data.numOfPages);
				setIsLoading(false);
			} catch (error) {
				toast.error('Could not fetch Listings');
			}
		};
		getAllUsers();
	}, [filter, currentPage]);

	useEffect(() => {
		axios
			.get(`http://localhost:5000/api/allCourts/list`)
			.then(({ data }) => setLocationsList(data));
	}, []);

	const updateLevelFilter = async e => {
		setCurrentPage(1);
		if (e.target.checked) {
			setFilter(data => ({
				...data,
				[e.target.id]: [...data.level, e.target.value],
			}));
		} else {
			const remove = filter.level.filter(filter => filter !== e.target.value);
			setFilter(data => ({
				...data,
				[e.target.id]: remove,
			}));
		}
	};

	const updateLocationFilter = e => {
		setCurrentPage(1);
		if (e.target.checked) {
			setFilter(data => ({
				...data,
				[e.target.id]: [...data.locations, e.target.value],
			}));
		} else {
			const remove = filter.locations.filter(data => data !== e.target.value);
			setFilter(data => ({
				...data,
				[e.target.id]: remove,
			}));
		}
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

	if (isLoading) {
		return (
			<div className='page-containers1'>
				<div className='filter-container'>
					<p>Playing Level</p>
					<div className='level-filters'>
						{playerLevel.map((level, index) => {
							return (
								<div className='filter' key={index}>
									<input
										className='court-name-checkbox'
										type='checkbox'
										id='level'
										value={level}
										onClick={updateLevelFilter}
									/>
									<p>Level {level}</p>
								</div>
							);
						})}
					</div>
					<p>Locations</p>
					<div className='different-filters'>
						{locationsLists.map((location, index) => {
							return (
								<div className='filter' key={index}>
									<input
										className='court-name-checkbox'
										type='checkbox'
										id='locations'
										value={location.name}
										onClick={updateLocationFilter}
									/>
									<p>{location.name}</p>
								</div>
							);
						})}
					</div>
				</div>

				<div className='profiles-container'>
					<div>Loading...</div>
				</div>
			</div>
		);
	}

	return (
		<div className='page-containers1'>
			<div className='filter-container'>
				<p>Playing Level ({filter.level.length})</p>
				<div className='level-filters'>
					{playerLevel.map((level, index) => {
						return (
							<div className='filter' key={index}>
								<input
									className='court-name-checkbox'
									type='checkbox'
									id='level'
									value={level}
									onClick={updateLevelFilter}
								/>
								<p>Level {level}</p>
							</div>
						);
					})}
				</div>
				<p>Locations ({filter.locations.length})</p>
				<div className='different-filters'>
					{locationsLists.map((location, index) => {
						return (
							<div className='filter' key={index}>
								<input
									className='court-name-checkbox'
									type='checkbox'
									id='locations'
									value={location.name}
									onClick={updateLocationFilter}
								/>
								<p>{location.name}</p>
							</div>
						);
					})}
				</div>
			</div>

			<div className='searchPlayer-container'>
				<div className='profiles-container'>
					{users
						.filter(current => current._id !== user._id)
						.map((current, index) => (
							<ProfileCards
								key={index}
								searchedUser={current}
								currentUser={user}
							/>
						))}
				</div>

				<div className={numOfPages === 0 ? 'blank' : 'page-btn-container'}>
					<button className='pageBtn' onClick={prevPage}>
						Prev
					</button>
					{totalPages.map((data, index) => {
						return (
							<button
								type='button'
								key={index}
								className={data === currentPage ? 'pageBtn-active' : 'pageBtn'}
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

export default Search;
