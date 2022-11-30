import { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import deleteCourts from '../../api/isAdmin/deleteCourts';
import addCourts from '../../api/isAdmin/addCourts';
import appContext from '../../context/appContext';

function AddOrDeleteCourts({ courts, setRefresh }) {
	const { user, token } = useContext(appContext);

	const [newCourt, setNewCourt] = useState({
		name: '',
		address: '',
		amountOfCourts: 0,
	});

	const createNewCourt = e => {
		setNewCourt(data => ({
			...data,
			[e.target.id]: e.target.value,
		}));
	};

	const submitNewCourt = async () => {
		if (isFormCompleted(newCourt)) {
			toast.error('Please fill in all fields');
		}
		await addCourts(newCourt);
		setRefresh('');
		toast.success('Added new court');
		setNewCourt({
			name: '',
			address: '',
			amountOfCourts: 0,
		});
		setRefresh([]);
	};
	const isFormCompleted = newCourt => {
		return !newCourt.name || !newCourt.address || !newCourt.amountOfCourts;
	};

	const deleteCourt = async courtName => {
		await deleteCourts(courtName);
		setRefresh('');
		toast.success('Court Deleted');
		setRefresh([]);
	};

	return (
		<main className='profile-container'>
			<section className='profile-info-container'>
				<h1 className='headline'>Add a new court</h1>

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
						submitNewCourt();
					}}
				>
					Add New Court
				</button>
				<span>
					{user.email === 'test@gmail.com' && 'Delete court unavilable on demo'}
				</span>
			</section>
			<section className='addCourt-container'>
				{courts.map((court, index) => {
					return (
						<div key={index} className='delete-court-list'>
							<span>{court.name}</span>
							<button
								onClick={() => deleteCourt(court.name)}
								className='delete'
								disabled={user.email === 'test@gmail.com' ? true : false}
							>
								Delete
							</button>
						</div>
					);
				})}
			</section>
		</main>
	);
}

export default AddOrDeleteCourts;
