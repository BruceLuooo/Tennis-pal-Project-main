import { React, useEffect, useState, useContext } from 'react';
import axios from 'axios';
import FindPlayersFilter from '../components/findPlayers/FindPlayersFilter';
import ProfileCards from '../components/findPlayers/ProfileCards';
import ScrollPageButtons from '../components/buttons/ScrollPageButtons';
import appContext from '../context/appContext';

function Search() {
	const localhostUrl = 'http://localhost:5000';

	const playerLevel = [1, 2, 3, 4, 5];
	const { user } = useContext(appContext);

	const [users, setUsers] = useState(null);
	const [locationsLists, setLocationsList] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [numOfPages, setNumOfPages] = useState(1);

	useEffect(() => {
		axios
			.get(`${localhostUrl}/api/allCourts/list`)
			.then(({ data }) => setLocationsList(data));
	}, []);

	return (
		<main className='page-containers1'>
			<FindPlayersFilter
				playerLevel={playerLevel}
				locationsLists={locationsLists}
				setCurrentPage={setCurrentPage}
				currentPage={currentPage}
				setIsLoading={setIsLoading}
				setNumOfPages={setNumOfPages}
				setUsers={setUsers}
			/>
			{isLoading ? (
				<div className='profiles-container'>
					<span>Loading...</span>
				</div>
			) : (
				<section className='searchPlayer-container'>
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
					<ScrollPageButtons
						numOfPages={numOfPages}
						setCurrentPage={setCurrentPage}
						currentPage={currentPage}
					/>
				</section>
			)}
		</main>
	);
}

export default Search;
