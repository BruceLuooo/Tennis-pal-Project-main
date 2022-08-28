import React from 'react';
import { v4 as uuidv4 } from 'uuid';

function Popup({ checkbox, courts, update, removeAll }) {
	return (
		<div className='popup-box-container'>
			<div class='popup-box'>
				<div className='header'>
					<h1>Select courts you want other people to find you at!</h1>
				</div>
				<div className='all-courts-update'>
					{courts.map(court => {
						return (
							<div className='court-name'>
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
				</div>
				<div className='btn-container'>
					<button className='btn-close' onClick={update}>
						Done
					</button>
					<button className='btn-close' onClick={removeAll}>
						Remove All
					</button>
				</div>
			</div>
		</div>
	);
}

export default Popup;
