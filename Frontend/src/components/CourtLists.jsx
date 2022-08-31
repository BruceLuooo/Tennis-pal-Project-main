import React from 'react';
import mapIcon from '../assets/svg/map.svg';
import tennisCourt from '../assets/svg/tennis-court.svg';
import search from '../assets/svg/search.svg';

function CourtLists({ court }) {
	const splitAddress = court.address.split(' ');

	const joinAddress = splitAddress.join('+');

	const map = `https://www.google.com/maps/embed/v1/place?key=AIzaSyCpHK58fj3BauHvy-z02ChIATenCps0Dqc
  &q=${joinAddress}`;

	return (
		<div className='court-card'>
			<div className='court-image'>
				<iframe
					className='iframe'
					title='maps'
					width='600'
					height='350'
					style={{ border: 0 }}
					loading='lazy'
					allowFullScreen
					referrerPolicy='no-referrer-when-downgrade'
					src={map}
				/>
			</div>

			<div className='court-data'>
				<div className='court-info'>
					<img src={search} alt='map' className='court-info-picture' />
					<h3>{court.name}</h3>
				</div>
				<div className='court-info'>
					<img src={mapIcon} alt='map' className='court-info-picture' />
					<h3>{court.address}</h3>
				</div>
				<div className='court-info'>
					<img src={tennisCourt} alt='court' className='court-info-picture' />
					<h3>Total Courts: {court.amountOfCourts}</h3>
				</div>
			</div>
		</div>
	);
}

export default CourtLists;
