import { toast } from 'react-toastify';
import givetakeAdmin from '../../api/isAdmin/givetakeAdmin';
import deleteUser from '../../api/isAdmin/deleteUser';

function UsersMakeAdminOrDelete({ getAllUsers, user, setRefresh }) {
	const deleteSelectedUser = async user => {
		await deleteUser(user);
		setRefresh('');
		toast.success('User Deleted');
		setRefresh([]);
	};

	const AdimRole = user => {
		let admin = async () => {
			await givetakeAdmin(user);
			setRefresh('');
			toast.success('Admin Status Changed');
			setRefresh([]);
		};
		admin();
	};

	return (
		<div className='profile-container'>
			<div className='profile-info-container'>
				<h1 className='headline'>Delete users</h1>
				<div className='deleteCourt-container'>
					{getAllUsers
						.filter(currentUser => currentUser._id != user._id)
						.map((user, index) => {
							return (
								<div key={index} className='delete-user-list'>
									<div className='delete-user-info'>
										<img
											className='profile-image-delete'
											src={user.avatar}
											alt='avatar'
										/>
										<div>
											<div>{user.name}</div>
											<div>{user.email}</div>
										</div>
									</div>
									<div className='delete-user-button-container'>
										<button
											className={
												user.isAdmin ? 'delete-button' : 'delete-button not'
											}
											onClick={() => AdimRole(user)}
										>
											{user.isAdmin ? 'Remove Admin' : 'Give Admin Role'}
										</button>
										<button
											className='delete-button'
											onClick={() => deleteSelectedUser(user._id)}
										>
											Delete User
										</button>
									</div>
								</div>
							);
						})}
				</div>
			</div>
		</div>
	);
}

export default UsersMakeAdminOrDelete;
