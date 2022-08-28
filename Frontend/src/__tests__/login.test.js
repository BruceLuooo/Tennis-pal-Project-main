import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import SignIn from '../pages/SignIn';

afterEach(() => {
	cleanup();
});

describe('Login Functionality', () => {
	it('should load the login form', () => {
		render(<SignIn />);
		const inputNode = screen.getByText('Email');

		expect(inputNode).toBeInTheDocument();
	});
});
