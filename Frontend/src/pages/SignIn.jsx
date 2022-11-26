import { useState, useContext } from 'react';
import appContext from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from '../assets/images/tennis-logo.jpeg';

function SignIn() {
	const LOCALHOST_URL = 'http://localhost:5000';

	const { login, addUserToSessionStorage } = useContext(appContext);
	const navigate = useNavigate();
	const [btnDisabled, setBtnDisabled] = useState(false);
	const [loginData, setLoginData] = useState({
		email: '',
		password: '',
	});

	const loginUser = async loginData => {
		try {
			setBtnDisabled(true);
			const response = await axios.post(
				`${LOCALHOST_URL}/api/users/login`,
				loginData,
			);
			const { token, user } = response.data;

			addUserToSessionStorage({ user, token });
			login({ user, token });
			navigate('/');
		} catch (error) {
			console.log(error);
			setBtnDisabled(false);
			toast.error(error.response.data.Message);
		}
	};

	const onChange = e => {
		setLoginData(loginData => ({
			...loginData,
			[e.target.id]: e.target.value,
		}));
	};

	const onSubmit = async e => {
		e.preventDefault();
		loginUser(loginData);
	};

	return (
		<div className='page-containers'>
			<div className='login-container'>
				<img src={logo} alt='tennis-logo' className='logo' />
				<h1>Sign In</h1>
				<form className='login-form' onSubmit={onSubmit}>
					<label htmlFor='email'>Email</label>
					<input type='email' id='email' onChange={onChange} />
					<label htmlFor='password'>Password</label>
					<input type='password' id='password' onChange={onChange} />

					<div className='end-of-form'>
						<button className='login' disabled={btnDisabled}>
							Login
						</button>
						<button className='no-account' onClick={() => navigate('/sign-up')}>
							Create Account
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default SignIn;
