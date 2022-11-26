import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function MessageUsers({ allContacts }) {
	const navigate = useNavigate();
	const [id, setId] = useState();

	const changeCurrentChat = contact => {
		navigate(`/messages/${contact._id}`);
	};

	useEffect(() => {
		const url = window.location.href;
		const getId = url.split('/');
		const id = getId.pop();
		return setId(id);
	}, [window.location.href]);

	return (
		<div className='messageUsers-container'>
			<span className='contacts-header'>Messanger</span>
			<div className='contacts'>
				{allContacts.map(contact => {
					return (
						<div
							key={contact._id}
							className={`contact ${contact._id === id && 'selected'}`}
							onClick={() => changeCurrentChat(contact)}
						>
							<div>
								<img
									className='messanger-profile-pictures'
									src={contact.avatar}
									alt=''
								/>
							</div>
							<div>
								<h3>{contact.name}</h3>
							</div>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default MessageUsers;
