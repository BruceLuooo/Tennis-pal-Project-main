import { render, screen, cleanup, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import renderer, { act } from 'react-test-renderer';
import SignIn from '../pages/SignIn';
import AppContext from '../context/appContext';

afterEach(() => {
	cleanup();
});

describe('Login Functionality', () => {
	describe('with valid inputs', () => {
		it('calls the onSubmit Function', async () => {
			const mockOnSubmit = jest.fn();
			const { getByLabelText, getByRole } = render(
				<AppContext.Provider value={false}>
					<SignIn onSubmit={mockOnSubmit} />,
				</AppContext.Provider>,
			);

			await act(async () => {
				fireEvent.change(getByInputText('Email'), {
					target: { value: 'test@gmail.com' },
				});
				fireEvent.change(getByLabelText('Password'), {
					target: { value: 'test' },
				});
			});

			await act(async () => {
				fireEvent.click(getByRole('button'));
			});

			expect(mockOnSubmit).toHaveBeenCalled();
		});
	});

	// test('with invalid inputs', () => {});
});
