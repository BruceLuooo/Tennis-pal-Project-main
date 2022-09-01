import { useContext, useState } from 'react';
import UserProfileContext from '../context/userProfileContext';
import AppContext from '../context/appContext';
import { toast } from 'react-toastify';
import axios from 'axios';

function UserProfile() {
	const LOCALHOST_URL = 'http://localhost:5000';
	const {
		togglePopup,
		onChange,
		selectedLocations,
		userData,
		setUserData,
		updateProfile,
		setUpdateProfile,
		setSelectedLocations,
	} = useContext(UserProfileContext);

	const { addUserToLocalStorage, login } = useContext(AppContext);

	const updateUser = async (userData, updateProfile) => {
		if (!userData.email || !userData.name || !userData.level) {
			return toast.error('Please provide all values');
		}
		if (userData.level > 5 || userData.level < 1) {
			return toast.error(
				'Please enter a number between 1 and 5 to indicate your playing level',
			);
		}
		try {
			const response = await axios.patch(
				'http://localhost:5000/api/users/updateUser',
				updateProfile,
				{
					headers: {
						Authorization: `${userData.token}`,
					},
				},
			);
			const { user, token } = response.data;

			addUserToLocalStorage({ user, token });
			login({ user, token });
			setUpdateProfile({});
			setSelectedLocations([]);

			toast.success('Updated user profile');
		} catch (error) {
			toast.error(error.response.data.Message);
		}
	};

	const changeAvatar = e => {
		const config = {
			headers: {
				'Content-Type': 'multipart/form-data',
				Authorization: `${userData.id}`,
			},
		};

		let data = new FormData();
		let imagedata = document.querySelector('input[type="file"]').files[0];
		data.append('avatar', imagedata);
		axios
			.post(`${LOCALHOST_URL}/api/users/uploadPfp`, data, config)
			.then(({ data }) => {
				setUserData(prev => ({
					...prev,
					avatar: data.url,
				}));
			});
	};

	return (
		<div className='profile-container-one'>
			<div>
				<h3>Profile Picture</h3>
				<img className='profile-image' src={userData.avatar} alt='avatar' />
				<input type='file' onChange={e => changeAvatar(e)} />
			</div>
			<div className='profile-info-container'>
				<div className='profile-info'>
					<label>Name</label>
					<input
						type='text'
						id='name'
						value={userData.name}
						onChange={onChange}
					/>
				</div>
				<div className='profile-info'>
					<label>Email</label>
					<input
						type='email'
						id='email'
						value={userData.email}
						onChange={onChange}
					/>
				</div>
				<div className='profile-info'>
					<label>Password</label>
					<input type='text' id='password' onChange={onChange} />
				</div>
				<div className='profile-info'>
					<label>Level</label>
					<input
						type='number'
						id='level'
						value={userData.level}
						onChange={onChange}
					/>
				</div>
				<button
					className='login'
					onClick={() => {
						updateUser(userData, updateProfile);
					}}
				>
					Save Changes
				</button>
			</div>
			<div className='select-locations'>
				<button className='login' onClick={togglePopup}>
					Select Locations
				</button>
				<div className='chosen-locations'>
					{selectedLocations.map((location, index) => {
						return <div key={index}>{location}</div>;
					})}
				</div>
				<div>Save Changes to update</div>
			</div>
		</div>
	);
}

export default UserProfile;
