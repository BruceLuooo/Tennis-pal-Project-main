import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import useDebounce from '../../hooks/useDebounce';

function FindPlayersFilter({
	setCurrentPage,
	currentPage,
	playerLevel,
	locationsLists,
	setIsLoading,
	setNumOfPages,
	setUsers,
}) {
	const [filter, setFilter] = useState({
		level: [],
		locations: [],
	});

	useEffect(() => {
		getAllUsers();
	}, [filter, currentPage]);

	const getAllUsers = async () => {
		const localhostUrl = 'http://localhost:5000';
		try {
			const params = new URLSearchParams();
			filter.level.forEach(level => params.append('level[]', level));
			filter.locations.forEach(location =>
				params.append('locations[]', location),
			);
			const { data } = await axios.get(
				`${localhostUrl}/api/allUsers?page=${currentPage}`,
				{ params },
			);
			setUsers(data.allUsers);
			setNumOfPages(data.numOfPages);
			setIsLoading(false);
		} catch (error) {
			toast.error('Could not fetch Listings');
		}
	};

	const updateLevelFilter = e => {
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

	return (
		<div className='filter-container'>
			<section>
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
			</section>
			<section>
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
			</section>
		</div>
	);
}

export default FindPlayersFilter;
