import { rest } from 'msw';

export const handlers = [
	rest.post('http://localhost:5000/api/users/login', (req, res, ctx) => {
		return res(
			ctx.json([
				{
					email: 'test@gmail.com',
					password: 'test',
					_id: '1234',
					name: 'test',
				},
				{ name: 'Vanilla', imagePath: '/images/vanilla.png' },
			]),
		);
	}),

	rest.get(' http://localhost:5000/api/allUsers', (req, res, ctx) => {
		return res(
			ctx.json([
				{ name: 'Kyle', level: 1 },
				{ name: 'Jenny', level: 3 },
				{ name: 'Eric', level: 2 },
				{ name: 'Amy', level: 1 },
				{ name: 'Judy', level: 3 },
				{ name: 'Aaron', level: 4 },
				{ name: 'James', level: 3 },
				{ name: 'asdf', level: 3 },
				{ name: 'af', level: 3 },
			]),
		);
	}),
];
