import { useState, createContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const user = localStorage.getItem('user');
	const token = localStorage.getItem('token');

	const [loggedIn, setLoggedIn] = useState({
		user: user ? JSON.parse(user) : null,
		token: token,
	});

	const addUserToLocalStorage = ({ user, token }) => {
		localStorage.setItem('user', JSON.stringify(user));
		localStorage.setItem('token', token);
	};

	const removeUserFromLocalStorage = () => {
		localStorage.removeItem('user');
		localStorage.removeItem('token');
	};

	const login = ({ user, token }) => {
		setLoggedIn({
			user,
			token,
		});
	};

	return (
		<AppContext.Provider
			value={{
				...loggedIn,
				setLoggedIn,
				login,
				addUserToLocalStorage,
				removeUserFromLocalStorage,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
