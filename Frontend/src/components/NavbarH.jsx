import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import appContext from '../context/appContext';
import TennisLogo from '../assets/images/tennis-logo.jpeg';
import Dropdown from '../assets/svg/Hamburger_icon.svg';
import axios from 'axios';

function NavbarH() {
	const {
		token,
		removeUserFromSessionStorage,
		setLoggedIn,
		login,
		addUserToSessionStorage,
	} = useContext(appContext);
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const onLogout = () => {
		removeUserFromSessionStorage();
		setLoggedIn({ user: null, token: null });
		navigate('/');
		setIsOpen(!isOpen);
	};

	const demoLogin = async () => {
		const loginData = { email: 'test@gmail.com', password: 'test' };

		const response = await axios.post(
			`http://localhost:5000/api/users/login`,
			loginData,
		);
		const { token, user } = response.data;

		addUserToSessionStorage({ user, token });
		login({ user, token });
		setIsOpen(!isOpen);
		navigate('/profile');
	};

	const navigateToPage = e => {
		setIsOpen(!isOpen);
		navigate(`${e.target.value}`);
	};

	if (token) {
		return (
			<div className='navbar-horizontal '>
				<div className='start' onClick={() => navigate('/')}>
					<img src={TennisLogo} alt='tennislogo' className='logo' />
					<span className='font'>Tennis-Pal</span>
				</div>

				<ul className={`navigation-horizontal ${isOpen && 'open'}`}>
					<button className='combine-nav' value='' onClick={navigateToPage}>
						Home
					</button>
					<button
						className='combine-nav '
						value='search'
						onClick={navigateToPage}
					>
						Search
					</button>
					<button value='messages' onClick={navigateToPage}>
						Messages
					</button>
					<button value='/profile' onClick={navigateToPage}>
						Profile
					</button>
					<button
						value='/courts'
						className='combine-nav'
						onClick={navigateToPage}
					>
						Courts
					</button>
					<button onClick={onLogout}>Logout</button>
				</ul>
				<img
					src={Dropdown}
					className='navbar-toggle'
					onClick={() => setIsOpen(!isOpen)}
				/>
			</div>
		);
	} else {
		return (
			<div className='navbar-horizontal '>
				<div className='start' onClick={() => navigate('/')}>
					<img src={TennisLogo} alt='tennislogo' className='logo' />
					<span className='font'>Tennis-Pal</span>
				</div>

				<ul className={`navigation-horizontal ${isOpen && 'open'}`}>
					<button value='/sign-in' onClick={navigateToPage}>
						Login / Sign-up
					</button>
					<button value='/sign-in' onClick={demoLogin}>
						Demo Login
					</button>
					<button className='combine-nav' value='' onClick={navigateToPage}>
						Home
					</button>
					<button
						className='combine-nav '
						value='search'
						onClick={navigateToPage}
					>
						Search
					</button>
					<button
						value='/courts'
						className='combine-nav'
						onClick={navigateToPage}
					>
						Courts
					</button>
				</ul>
				<img
					src={Dropdown}
					className='navbar-toggle'
					onClick={() => setIsOpen(!isOpen)}
				/>
			</div>
		);
	}
}

export default NavbarH;
