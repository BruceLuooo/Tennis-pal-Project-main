import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import AppContext from '../../context/appContext';
import axios from 'axios';

function ProfileCards({ searchedUser }) {
	const LOCALHOST_URL = 'http://localhost:5000';
	const navigate = useNavigate();
	const { user } = useContext(AppContext);

	const onClick = async e => {
		await axios.post(`${LOCALHOST_URL}/api/users/contactUser`, {
			searchedUserId: searchedUser._id,
			currentUserId: user._id,
		});
		navigate(`/messages/${searchedUser._id}`);
	};

	return (
		<div className='profile-card'>
			<img className='profile-image' src={searchedUser.avatar} alt='' />
			<div className='court-data'>
				<h3>Name: {searchedUser.name}</h3>
				<h3>Level: {searchedUser.level}</h3>
				<button className='login' onClick={onClick}>
					send a message
				</button>
			</div>
		</div>
	);
}

export default ProfileCards;
