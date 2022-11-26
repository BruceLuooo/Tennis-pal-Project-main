import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function Popup({ checkbox, courts, update, removeAll }) {
	return (
		<main className='popup-box-container'>
			<div class='popup-box'>
				<section className='header'>
					<h1 className='headline'>
						Select courts you want other people to find you at!
					</h1>
				</section>
				<section className='all-courts-update'>
					{courts.map((court, index) => {
						return (
							<div key={index} className='court-name'>
								<input
									type='checkbox'
									className='court-name-checkbox'
									id='locations'
									value={court.name}
									onChange={checkbox}
								/>
								<label className='all-locations'>{court.name}</label>
							</div>
						);
					})}
				</section>
				<section className='btn-container'>
					<button className='btn-close' onClick={update}>
						Done
					</button>
					<button className='btn-close' onClick={removeAll}>
						Remove All
					</button>
				</section>
			</div>
		</main>
	);
}

export default Popup;
