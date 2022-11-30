import { toast } from 'react-toastify';
import givetakeAdmin from '../../api/isAdmin/givetakeAdmin';
import deleteUser from '../../api/isAdmin/deleteUser';

function UsersMakeAdminOrDelete({ getAllUsers, user, setRefresh }) {
	const deleteSelectedUser = async selectedUser => {
		await deleteUser(selectedUser);
		setRefresh('');
		toast.success('User Deleted');
		setRefresh([]);
	};

	const AdimRole = selectedUser => {
		let admin = async () => {
			await givetakeAdmin(selectedUser);
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
				<span>
					{user.email === 'test@gmail.com' &&
						'Delete user/ give admin role unavilable on demo'}
				</span>
				<section className='deleteCourt-container'>
					{getAllUsers
						.filter(currentUser => currentUser._id != user._id)
						.map((selectedUser, index) => {
							return (
								<div key={index} className='delete-user-list'>
									<div className='delete-user-info'>
										<img
											className='profile-image-delete'
											src={selectedUser.avatar}
											alt='avatar'
										/>
										<div>
											<div>{selectedUser.name}</div>
											<div>{selectedUser.email}</div>
										</div>
									</div>
									<div className='delete-user-button-container'>
										<button
											disabled={
												user.email === 'test@gmail.com' &&
												'Delete court unavilable on demo'
											}
											className={
												selectedUser.isAdmin
													? 'delete-button'
													: 'delete-button not'
											}
											onClick={() => AdimRole(selectedUser)}
										>
											{selectedUser.isAdmin
												? 'Remove Admin'
												: 'Give Admin Role'}
										</button>
										<button
											disabled={
												user.email === 'test@gmail.com' &&
												'Delete court unavilable on demo'
											}
											className='delete-button'
											onClick={() => deleteSelectedUser(selectedUser._id)}
										>
											Delete User
										</button>
									</div>
								</div>
							);
						})}
				</section>
			</div>
		</div>
	);
}

export default UsersMakeAdminOrDelete;
