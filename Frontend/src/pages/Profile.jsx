import { useState, useEffect, useContext } from 'react';
import appContext from '../context/appContext';
import UserProfileContext from '../context/userProfileContext';
import axios from 'axios';
import UserProfile from '../components/UserProfile';
import Popup from '../components/Popup';
import AddOrDeleteCourts from '../components/adminAccess/AddOrDeleteCourts';
import UsersMakeAdminOrDelete from '../components/adminAccess/UsersMakeAdminOrDelete';

function Profile() {
	const localhostUrl = 'http://localhost:5000';
	const { user, token } = useContext(appContext);
	const {
		setUserData,
		popup,
		setCourts,
		courts,
		removeSelectedLocations,
		clickCheckbox,
		updateLocations,
	} = useContext(UserProfileContext);

	const [getAllUsers, setGetAllUsers] = useState([]);
	const [refresh, setRefresh] = useState([]);

	useEffect(() => {
		axios
			.get(`${localhostUrl}/api/allCourts/list`)
			.then(({ data }) => setCourts(data));
		axios
			.get(`${localhostUrl}/api/allUsers/totalUsers`)
			.then(({ data }) => setGetAllUsers(data));

		setUserData({
			name: user.name,
			email: user.email,
			level: user.level,
			password: user.password,
			token: token,
			locations: user.locations,
			avatar: user.avatar,
			id: user._id,
		});
	}, [
		user.email,
		user.level,
		user.name,
		user.password,
		user.locations,
		token,
		refresh,
	]);

	return (
		<main className='page-containers'>
			<UserProfile />
			{popup && (
				<Popup
					removeAll={removeSelectedLocations}
					checkbox={clickCheckbox}
					courts={courts}
					update={updateLocations}
				/>
			)}
			{user.isAdmin && (
				<section className='admin-layout'>
					<AddOrDeleteCourts courts={courts} setRefresh={setRefresh} />
					<UsersMakeAdminOrDelete
						getAllUsers={getAllUsers}
						user={user}
						setRefresh={setRefresh}
					/>
				</section>
			)}
		</main>
	);
}

export default Profile;
