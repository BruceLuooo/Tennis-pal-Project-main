import { useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import appContext from '../context/appContext';
import TennisLogo from '../assets/images/tennis-logo.jpeg';
import Dropdown from '../assets/svg/Hamburger_icon.svg';

function NavbarH() {
	const { token, removeUserFromLocalStorage, setLoggedIn } =
		useContext(appContext);
	const navigate = useNavigate();
	const [isOpen, setIsOpen] = useState(false);

	const onLogout = () => {
		removeUserFromLocalStorage();
		setLoggedIn({ user: null, token: null });
		navigate('/');
		setIsOpen(!isOpen);
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
					<div className='font'>Tennis-Pal</div>
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
					<button
						value='/rules'
						className='combine-nav'
						onClick={navigateToPage}
					>
						Rules
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
					<div className='font'>Tennis-Pal</div>
				</div>

				<ul className={`navigation-horizontal ${isOpen && 'open'}`}>
					<button value='/sign-in' onClick={navigateToPage}>
						Log-in/ Sign-up
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
					<button
						value='/rules'
						className='combine-nav'
						onClick={navigateToPage}
					>
						Rules
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
