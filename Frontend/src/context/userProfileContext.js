import { useState, createContext } from 'react';

const UserProfileContext = createContext();

export const UserProfileProvider = ({ children }) => {
	const [userData, setUserData] = useState({});
	const [updateProfile, setUpdateProfile] = useState({});
	const [selectedLocations, setSelectedLocations] = useState([]);
	const [courts, setCourts] = useState([]);
	const [popup, setPopup] = useState(false);

	const onChange = e => {
		setUserData(userData => ({
			...userData,
			[e.target.id]: e.target.value,
		}));
		setUpdateProfile(userData => ({
			...userData,
			[e.target.id]: e.target.value,
		}));
	};

	const updateLocations = () => {
		setUpdateProfile(prev => ({
			...prev,
			locations: selectedLocations,
		}));
		setPopup(!popup);
	};

	const clickCheckbox = e => {
		if (e.target.checked) {
			setSelectedLocations(prevState => [...prevState, e.target.value]);
		} else {
			const remove = selectedLocations.filter(
				filter => filter !== e.target.value,
			);
			setSelectedLocations(remove);
		}
	};

	const removeSelectedLocations = () => {
		delete updateProfile.locations;
		setSelectedLocations([]);
		setPopup(!popup);
	};

	const togglePopup = () => {
		setPopup(!popup);
		setSelectedLocations([]);
		delete updateProfile.locations;
	};

	const onSubmit = e => {
		updateUser(userData, updateProfile);
		setUpdateProfile({});
		setSelectedLocations([]);
	};

	return (
		<UserProfileContext.Provider
			value={{
				togglePopup,
				clickCheckbox,
				updateLocations,
				onChange,
				selectedLocations,
				setUserData,
				userData,
				onSubmit,
				updateProfile,
				setSelectedLocations,
				setUpdateProfile,
				removeSelectedLocations,
				setCourts,
				courts,
				popup,
			}}
		>
			{children}
		</UserProfileContext.Provider>
	);
};

export default UserProfileContext;
