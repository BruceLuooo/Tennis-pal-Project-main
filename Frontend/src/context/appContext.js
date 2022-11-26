import { useState, createContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const user = sessionStorage.getItem('user');
	const token = sessionStorage.getItem('token');

	const [loggedIn, setLoggedIn] = useState({
		user: user ? JSON.parse(user) : null,
		token: token,
	});

	const addUserToSessionStorage = ({ user, token }) => {
		sessionStorage.setItem('user', JSON.stringify(user));
		sessionStorage.setItem('token', token);
	};

	const removeUserFromSessionStorage = () => {
		sessionStorage.removeItem('user');
		sessionStorage.removeItem('token');
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
				addUserToSessionStorage,
				removeUserFromSessionStorage,
			}}
		>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
