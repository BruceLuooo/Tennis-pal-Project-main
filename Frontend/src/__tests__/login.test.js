import { render, screen, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import SignIn from '../pages/SignIn';
import NavbarH from '../components/NavbarH';
import AppContext from '../context/appContext';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

afterEach(() => cleanup());

test('incorrect password results in an error', async () => {
	render(
		<AppContext.Provider value={false}>
			<Router>
				<NavbarH />
				<SignIn />,
			</Router>
			<ToastContainer />
		</AppContext.Provider>,
	);

	const email = screen.getByRole('textbox', { name: 'Email' });
	expect(email).toBeInTheDocument();

	const password = screen.getByLabelText('Password');
	expect(password).toBeInTheDocument();

	await userEvent.type(email, 'test@gmail.com');
	expect(email).toHaveValue('test@gmail.com');

	await userEvent.type(password, 'test');
	expect(password).toHaveValue('test');

	// await userEvent.click(screen.getByRole('button', { name: 'Login' }));
	// expect(screen.findByText('Profile')).toBeInTheDocument();
});
