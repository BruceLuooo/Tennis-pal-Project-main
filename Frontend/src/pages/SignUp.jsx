import { useState, useContext, useEffect } from 'react';
import appContext from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/images/tennis-logo.jpeg';
import { toast } from 'react-toastify';

function SignUp() {
	const LOCALHOST_URL = 'http://localhost:5000';

	const navigate = useNavigate();
	const { addUserToSessionStorage, login } = useContext(appContext);
	const [btnDisabled, setBtnDisabled] = useState(false);
	const [nextPage, setNextPage] = useState(false);
	const [allLocations, setAllLocations] = useState([]);
	const [formData, setFormData] = useState({
		name: '',
		level: null,
		email: '',
		password: '',
		locations: [],
	});

	const { name, level, email, password, locations } = formData;

	useEffect(() => {
		const getAllCourtsLocation = async () => {
			const { data } = await axios.get(`${LOCALHOST_URL}/api/allCourts/list`);
			setAllLocations(data);
		};
		getAllCourtsLocation();
	}, []);

	const updateFormData = e => {
		setFormData(formData => ({
			...formData,
			[e.target.id]: e.target.value,
		}));
	};
	const onSubmitForm = async e => {
		e.preventDefault();

		if (!level || !email || !password || !name) {
			return toast.error('please fill in all the fields');
		}

		if (level > 5 || level < 1) {
			return toast.error(
				'Please enter a number between 1 and 5 to indicate your playing level',
			);
		}
		try {
			await axios.post('http://localhost:5000/api/users/checkEmail', formData);
			setNextPage(true);
		} catch (error) {
			toast.error(error.response.data.Message);
		}
	};

	const clickCheckbox = e => {
		if (e.target.checked) {
			setFormData(formData => ({
				...formData,
				[e.target.id]: [...formData.locations, e.target.value],
			}));
		} else {
			const remove = formData.locations.filter(
				filter => filter !== e.target.value,
			);
			setFormData(formData => ({
				...formData,
				[e.target.id]: remove,
			}));
		}
	};

	const onSubmitFinal = async e => {
		e.preventDefault();
		if (locations.length === 0) {
			return toast.error('Please select a location for people to find you');
		}
		registerUser(formData);
	};
	const registerUser = async formData => {
		try {
			setBtnDisabled(true);

			const response = await axios.post(
				'http://localhost:5000/api/users',
				formData,
			);
			const { user, token } = response.data;

			addUserToSessionStorage({ user, token });
			login({ user, token });
			toast.success('Account Created!');
			navigate('/profile');
		} catch (error) {
			setBtnDisabled(false);
			toast.error(error.response.data.Message);
		}
	};

	if (!nextPage) {
		return (
			<div className='page-containers'>
				<div className='login-container'>
					<img src={logo} alt='tennis-logo' className='logo' />
					<h1>Create an account</h1>
					<form className='login-form' onSubmit={onSubmitForm}>
						<label>Name</label>
						<input
							type='text'
							id='name'
							value={name}
							onChange={updateFormData}
						/>
						<label>Level ( 1 - 5 )</label>
						<input
							type='number'
							id='level'
							value={level}
							onChange={updateFormData}
						/>
						<label>Email</label>
						<input
							type='email'
							id='email'
							value={email}
							onChange={updateFormData}
						/>
						<label>Password</label>
						<input
							type='password'
							id='password'
							value={password}
							onChange={updateFormData}
						/>
						<div className='end-of-form'>
							<button
								className='no-account'
								onClick={() => navigate('/sign-in')}
							>
								Sign In
							</button>
							<button type='submit' className='login' disabled={btnDisabled}>
								Next
							</button>
						</div>
					</form>
				</div>
			</div>
		);
	}

	return (
		<div className='page-containers'>
			<div className='select-courts-container'>
				<div className='header'>
					<h1>Select courts you want other people to find you at!</h1>
				</div>
				<div className='all-courts'>
					{allLocations.map(location => {
						return (
							<div className='court-name' key={location.name}>
								<input
									type='checkbox'
									className='court-name-checkbox'
									id='locations'
									value={location.name}
									onChange={clickCheckbox}
								/>
								<label className='all-locations'>{location.name}</label>
							</div>
						);
					})}
				</div>
				<div className='end-of-form'>
					<button className='no-account' onClick={() => setNextPage(false)}>
						Go back
					</button>
					<button type='submit' className='login' onClick={onSubmitFinal}>
						Create Account!
					</button>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
