import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../../context/appContext';
import axios from 'axios';

function ProfileCards({ searchedUser }) {
	const localhostUrl = 'http://localhost:5000';
	const navigate = useNavigate();
	const { user } = useContext(AppContext);

	const onClick = async e => {
		await axios.post(`${localhostUrl}/api/users/contactUser`, {
			searchedUserId: searchedUser._id,
			currentUserId: user._id,
		});
		await axios.post(`${localhostUrl}/api/users/addToContactedUser`, {
			searchedUserId: searchedUser._id,
			currentUserId: user._id,
		});
		navigate(`/messages/${searchedUser._id}`);
	};

	return (
		<main>
			<section className='profile-card'>
				<div>
					<img className='profile-image' src={searchedUser.avatar} alt='' />
					<span>{searchedUser.name}</span>
				</div>
				<div>
					<span>Player Level: {searchedUser.level}</span>
					<button className='send-message' onClick={onClick}>
						Send Message
					</button>
				</div>
			</section>
			<hr className='line' />
		</main>
	);
}

export default ProfileCards;
