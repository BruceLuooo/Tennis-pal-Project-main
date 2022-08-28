import { useState, useEffect, useContext } from 'react';
import appContext from '../context/appContext'
import axios from 'axios'
import { toast } from 'react-toastify';
import Popup from '../components/Popup';
 
function Profile() {

  const {user, token, addUserToLocalStorage, login} = useContext(appContext)

	const [userData, setUserData] = useState({});
	const [updateProfile, setUpdateProfile] = useState({})
	const [selectedLocations, setSelectedLocations] = useState([])
	const [popup, setPopup] = useState(false)
	const [courts, setCourts] = useState([])
	const [getAllUsers, setGetAllUsers] = useState([])
	const [refresh, setRefresh] = useState([])
	const [newCourt, setNewCourt] = useState({
		name: '',
		address: '',
		amountOfCourts: 0,
	})

  
  const {name, email, level, password, locations} = userData

	useEffect(() => {
		axios.get('http://localhost:5000/api/allCourts/list').then(({data}) => setCourts(data))
		axios.get('http://localhost:5000/api/allUsers/totalUsers').then(({data}) => setGetAllUsers(data))

    setUserData({
      name: user.name,
      email: user.email,
      level: user.level,
      password: user.password,
			token: token,
			locations: user.locations
    })
  },[user.email, user.level, user.name, user.password, user.locations, token, refresh ]);

	const togglePopup = () => {
		setPopup(!popup)
		setSelectedLocations([])
		delete updateProfile.locations
	}

	const closeTogglePopup = () => {
		setPopup(!popup)
	}

  const updateUser = async(userData, updateProfile) => {
		if (!email || !name || !password || !level) {
			return toast.error('Please provide all values');
		}
    if (level > 5 || level < 1) {
      return toast.error('Please enter a number between 1 and 5 to indicate your playing level')
    }
    try{
      const response = await axios.patch('http://localhost:5000/api/users/updateUser', updateProfile, {
				headers: {
					Authorization: `${userData.token}`
				}
			})
      const {user, token} = response.data

      addUserToLocalStorage({user, token})
      login({user, token})
			toast.success('Updated user profile')
    } catch(error) {
			toast.error(error.response.data.Message)
    }
  }

  const onChange = e => {
    setUserData(userData => ({
      ...userData,
      [e.target.id]: e.target.value,
    }));
		setUpdateProfile(userData => ({
			...userData,
			[e.target.id] : e.target.value
		}))
  };

	const clickCheckbox = (e) => {
    if (e.target.checked) {
			setSelectedLocations((prevState) => [...prevState, e.target.value])
    } else {
      const remove = selectedLocations.filter((filter) => filter !== e.target.value)
      setSelectedLocations(remove)
    }
  }

	const updateLocations = () => {
			setUpdateProfile((prev) => ({
				...prev,
				locations: selectedLocations
			}))
			closeTogglePopup()
	}

	const removeSelectedLocations = () => {
		delete updateProfile.locations
		setSelectedLocations([])
		closeTogglePopup()
	}

	const onSubmit = e => {
    updateUser(userData, updateProfile)
		setUpdateProfile({})
		setSelectedLocations([])
	};

	const createNewCourt = (e) => {
		setNewCourt((data) => ({
			...data,
			[e.target.id] : e.target.value
		}))
	}

	const submitNewCourt = async() => {
		if (!newCourt.name || !newCourt.address || !newCourt.amountOfCourts) {
			toast.error('Please fill in all fields')
		}
		try{
			const {data} = await axios.post('http://localhost:5000/api/allCourts/addNewCourt', newCourt)
			setRefresh(data.newCourt.name)
			toast.success('Added new court')
			setNewCourt({
				name: '',
				address: '',
				amountOfCourts: 0,
			})
			setRefresh([])
		}catch(error){
			console.log(error)
		}
	}

	const deleteCourt = async (courtName) => {
		try {
			const {data} = await axios.post('http://localhost:5000/api/allCourts/deleteCourt', {name: courtName})
			setRefresh(data)
			toast.success('Court Deleted')
			setRefresh([])
		} catch(error){
			console.log(error)
		}
	}

	const deleteUser = async (user) => {
		try {
			const {data} = await axios.post('http://localhost:5000/api/allUsers/deleteUser', {_id: user})
			setRefresh(data)
			toast.success('User Deleted')
			setRefresh([])
		} catch (error) {
			toast.error('Could not delete User')
		}
	}

	const AdimRole = async(user) =>{
		try {
			if (user.isAdmin === false){
				const {data} = await axios.post('http://localhost:5000/api/allUsers/makeAdmin', {_id: user._id})
				setRefresh(data)
				toast.success('User made admin')
				setRefresh([])
			} else {
				const {data} = await axios.post('http://localhost:5000/api/allUsers/deleteAdmin', {_id: user._id})
				setRefresh(data)
				toast.success('Removed admin role')
				setRefresh([])
			}
		}catch(error) {
			console.log(error)
		}
	}

	if (!user.isAdmin) {
		return (
			<div className='page-containers'>
				<div className='profile-container-one'>
					<div>
						{/* <img src="" alt="profile picture" /> */}
						<input type="file" />
					</div>
					<div className='profile-info-container'>
						<div className='profile-info'>
							<label>Name</label>
							<input
								type='text'
								id='name'
								value={name}
								onChange={onChange}
							/>
						</div>
						<div className='profile-info'>
							<label>Email</label>
							<input
								type='email'
								id='email'
								value={email}
								onChange={onChange}
							/>
						</div>
						<div className='profile-info'>
							<label>Password</label>
							<input
								type='text'
								id='password'
								value={password}
								onChange={onChange}
							/>
						</div>
						<div className='profile-info'>
							<label>Level</label>
							<input
								type='number'
								id='level'
								value={level}
								onChange={onChange}
							/>
						</div>
						<button
							className='login'
							onClick={() => {
								onSubmit();
							}}
						>
							Save Changes
						</button>
					</div>
					<div className='select-locations'>
						<button className='login' onClick={togglePopup}>Select Locations</button>
						<div className='chosen-locations'>
							{selectedLocations.map((location) => {
								return (
									<div>{location}</div>
									)
								})}
						</div>
						<div>Save Changes to update</div>
					</div>
					{popup && <Popup allLocations={locations} removeAll={removeSelectedLocations} checkbox={clickCheckbox} courts={courts} update={updateLocations} /> }
				</div>
			</div>
		)
	}

	return (
		<div className='page-containers'>
			<div className='profile-container-one'>
				<div>
					{/* <img src="" alt="profile picture" /> */}
					<input type="file" />
				</div>
				<div className='profile-info-container'>
					<div className='profile-info'>
						<label>Name</label>
						<input
							type='text'
							id='name'
							value={name}
							onChange={onChange}
						/>
					</div>
					<div className='profile-info'>
						<label>Email</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={onChange}
						/>
					</div>
					<div className='profile-info'>
						<label>Password</label>
						<input
							type='text'
							id='password'
							value={password}
							onChange={onChange}
						/>
					</div>
					<div className='profile-info'>
						<label>Level</label>
						<input
							type='number'
							id='level'
							value={level}
							onChange={onChange}
						/>
					</div>
					<button
						className='login'
						onClick={() => {
							onSubmit();
						}}
					>
						Save Changes
					</button>
				</div>
				<div className='select-locations'>
					<button className='login' onClick={togglePopup}>Select Locations</button>
					<div className='chosen-locations'>
						{selectedLocations.map((location) => {
							return (
								<div>{location}</div>
								)
							})}
					</div>
					<div>Save Changes to update</div>
				</div>
				{popup && <Popup allLocations={locations} removeAll={removeSelectedLocations} checkbox={clickCheckbox} courts={courts} update={updateLocations} /> }
			</div>

			<div className='profile-container'>
				<div>
					<div className='profile-info-container'>
						<h1 >Add a new court</h1>

						<div className='profile-info'>
							<label>Name</label>
							<input
								type='text'
								id='name'
								value={newCourt.name}
								onChange={createNewCourt}
							/>
						</div>
						<div className='profile-info'>
							<label>Address</label>
							<input
								type='text'
								id='address'
								value={newCourt.address}
								onChange={createNewCourt}
							/>
						</div>
						<div className='profile-info'>
							<label>Amount of courts</label>
							<input
								type='number'
								id='amountOfCourts'
								value={newCourt.amountOfCourts}
								onChange={createNewCourt}
							/>
						</div>
						<button
							className='add-new-court-button'
							onClick={() => {
								submitNewCourt()
							}}
						>
							Add New Court
						</button>
					</div>
				</div>
				<div className='addCourt-container'>
					{courts.map((court) => {
						return (
							<div className='delete-court-list'> 
								<div>{court.name}</div>
								<button onClick={() => deleteCourt(court.name)} className='delete'>Delete</button>
							</div>
						)
					})}
				</div>
				
			</div>
			<div className='profile-container'>
				<div className='profile-info-container'> 
					<h1 >Delete users</h1>
					<div className='deleteCourt-container'>
					{getAllUsers.filter((currentUser) => currentUser._id != user._id ).map((user) => {
						return (
							<div className='delete-user-list'> 
								<div>{user.name}</div>
								<div className='delete-user-button-container'>
									<button className={ user.isAdmin ? 'delete-button' : 'delete-button not'} onClick={() => AdimRole(user)}>{user.isAdmin ? 'Remove Admin' : 'Give Admin Role'}</button>
									<button className='delete-button' onClick={() => deleteUser(user._id)}>Delete User</button>
								</div>
								
							</div>
						)
					})}
					</div>
				</div>
			</div>

		</div>
	);
}

export default Profile;
