import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

function ChatContainer({ currentChat, currentUser, mostRecentChat, socket }) {
	const [message, setMessage] = useState('');
	const [chatLog, setChatLog] = useState([]);
	const [arrivalMessage, setArrivalMessage] = useState(null);

	const scrollRef = useRef();

	useEffect(() => {
		if (currentChat) {
			axios
				.post('http://localhost:5000/api/messages/getMessages', {
					from: currentUser._id,
					to: currentChat._id,
				})
				.then(({ data }) => setChatLog(data));
		}
	}, [currentChat]);

	const handleSendMessage = async msg => {
		await axios.post('http://localhost:5000/api/messages/addMessage', {
			from: currentUser._id,
			to: currentChat._id,
			message: msg,
		});
		socket.current.emit('send-msg', {
			to: currentChat._id,
			from: currentUser._id,
			message: msg,
		});

		const msgs = [...chatLog];
		msgs.push({ fromSelf: true, message: msg });
		setChatLog(msgs);
	};

	const onSubmit = e => {
		e.preventDefault();
		if (message.length > 0) {
			handleSendMessage(message);
			setMessage('');
			mostRecentChat(currentChat._id);
		}
	};

	useEffect(() => {
		if (socket.current) {
			socket.current.on('msg-recieve', msg => {
				setArrivalMessage({ fromSelf: false, message: msg });
			});
		}
	}, [socket]);

	useEffect(() => {
		arrivalMessage && setChatLog(prev => [...prev, arrivalMessage]);
	}, [arrivalMessage]);

	useEffect(() => {
		scrollRef.current?.scrollIntoView({ behaviour: 'smooth' });
	}, [chatLog]);

	if (!currentChat) {
		return (
			<div className='noChat-selected'>
				<h1>select a chat to start messaging</h1>
			</div>
		);
	}

	return (
		<div className='chat-container'>
			<div className='chat-header'>
				<img
					className='messanger-profile-pictures'
					src={currentChat.avatar}
					alt=''
				/>
				<div className='message-font'>{currentChat.name}</div>
			</div>

			<div className='chat-messages'>
				{chatLog.map(message => {
					return (
						<div ref={scrollRef} key={uuidv4()}>
							<div
								className={`message ${message.fromSelf ? 'sent' : 'received'}`}
							>
								<div className='content'>
									<p>{message.message}</p>
								</div>
							</div>
						</div>
					);
				})}
			</div>

			<div>
				<form className='input-container' onSubmit={onSubmit}>
					<input
						className='chat-message-input'
						type='text'
						placeholder='type your message here'
						onChange={e => setMessage(e.target.value)}
						value={message}
					/>
					<button className='chat-message-submit' type='submit'>
						send
					</button>
				</form>
			</div>
		</div>
	);
}

export default ChatContainer;