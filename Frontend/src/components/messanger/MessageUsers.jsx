import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

function MessageUsers({ allContacts }) {
	const navigate = useNavigate();
	const [currentSelected, setCurrentSelected] = useState(0);

	const changeCurrentChat = (contact, index) => {
		navigate(`/messages/${contact._id}`);
		setCurrentSelected(index);
	};

	return (
		<div className='messageUsers-container'>
			<div className='message-logo'>
				<div className='message-font'>Chat</div>
			</div>
			<div className='contacts'>
				{allContacts.map((contact, index) => {
					return (
						<div
							key={contact._id}
							className={`contact ${
								index === currentSelected ? 'selected' : ''
							}`}
							onClick={() => changeCurrentChat(contact, index)}
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
