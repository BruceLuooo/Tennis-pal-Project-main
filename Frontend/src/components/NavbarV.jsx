import React from 'react';
import { useNavigate } from 'react-router-dom';
import courts from '../assets/svg/tennis-court.svg';
import home from '../assets/svg/home.svg';
import findPlayers from '../assets/images/find-players.png';

function NavbarV() {
	const navigate = useNavigate();

	return (
		<div className='container-test'>
			<div className='navbar-vertical'>
				<div onClick={() => navigate('/')}>
					<img src={home} alt='home' className='vertical-logo' />
					<span>Home</span>
				</div>
				<div onClick={() => navigate('/search')}>
					<img src={findPlayers} alt='tennis-court' className='vertical-logo' />
					<span>Players</span>
				</div>
				<div onClick={() => navigate('/courts')}>
					<img src={courts} alt='tennis-court' className='vertical-logo' />
					<span>Courts</span>
				</div>
			</div>
		</div>
	);
}

export default NavbarV;
