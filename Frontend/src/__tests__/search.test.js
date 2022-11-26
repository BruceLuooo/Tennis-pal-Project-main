import {
	render,
	screen,
	cleanup,
	waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FindPlayersFilter from '../components/findPlayers/FindPlayersFilter';
import ScrollPageButtons from '../components/buttons/ScrollPageButtons';
import Search from '../pages/Search';
import AppContext from '../context/appContext';

afterEach(() => cleanup());

test('loading screen when data is being loaded', () => {
	render(
		<AppContext.Provider value={false}>
			<Search />
			<FindPlayersFilter />
			<ScrollPageButtons />
		</AppContext.Provider>,
	);

	const loading = screen.getByText('Loading...');
	expect(loading).toBeInTheDocument();
});

test('Search page when everything is loaded', async () => {
	render(
		<AppContext.Provider value={false}>
			<Search />
		</AppContext.Provider>,
	);

	await waitForElementToBeRemoved(() => screen.getByText('Loading...'));

	const playerCards = screen.getAllByRole('button', { name: 'send a message' });
	expect(playerCards).toHaveLength(7);
});

// test('List of players change when pressing next or previous page', async () => {
// 	render(
// 		<AppContext.Provider value={false}>
// 			<Search />
// 		</AppContext.Provider>,
// 	);
// 	await waitForElementToBeRemoved(() => screen.getByText(/loading/i));

// 	const button = screen.getByRole('button', { name: 'Next' });
// 	expect(button).toBeInDocument();
// });
