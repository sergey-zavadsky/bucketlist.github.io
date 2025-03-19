export const swaggerUiConfig = {
	definition: {
		openapi: '3.1.0',
		info: {
			title: 'TODO list API',
			version: '0.1.0',
			description:
				'This is a simple todo list api application which was made for educational purposes.',
			license: {
				name: 'MIT',
				url: 'https://github.com/sergey-zavadsky/bucketlist.github.io/blob/master/LICENSE',
			},
			contact: {
				name: 'TODO',
				url: 'https://sergey-zavadsky.github.io/bucketlist.github.io/',
				email: 'siarhei.zavadski@gmail.com',
			},
		},
		servers: [
			{
				url:
					process.env.NODE_ENV === 'production'
						? '/api/v1/'
						: 'http://localhost:3000/api/v1/',
				description:
					process.env.NODE_ENV === 'production'
						? 'Production server'
						: 'Local development server',
			},
			{
				url: '/api/v1/',
				description: 'Production server',
			},
		],
	},
	apis: ['docs/*.yaml'],
};
