import { useState, useContext } from 'react';
import appContext from '../context/appContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import logo from '../assets/images/tennis-logo.jpeg';

function SignIn() {
	const localhostUrl = 'http://localhost:5000';

	const { login, addUserToSessionStorage } = useContext(appContext);
	const navigate = useNavigate();
	const [btnDisabled, setBtnDisabled] = useState(false);
	const [loginInfo, setLoginInfo] = useState({
		email: '',
		password: '',
	});

	const updateLoginInfo = e => {
		setLoginInfo(loginData => ({
			...loginData,
			[e.target.id]: e.target.value,
		}));
	};
	const onSubmitForm = async e => {
		e.preventDefault();
		loginUser(loginInfo);
	};
	const loginUser = async loginData => {
		try {
			setBtnDisabled(true);
			const response = await axios.post(
				`${localhostUrl}/api/users/login`,
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

	return (
		<div className='page-containers'>
			<div className='login-container'>
				<img src={logo} alt='tennis-logo' className='logo' />
				<h1>Sign In</h1>
				<form className='login-form' onSubmit={onSubmitForm}>
					<label htmlFor='email'>Email</label>
					<input type='email' id='email' onChange={updateLoginInfo} />
					<label htmlFor='password'>Password</label>
					<input type='password' id='password' onChange={updateLoginInfo} />

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
