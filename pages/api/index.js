import redis from 'redis';
import 'colors';

const devs = [
	{
		name: 'Brad',
		language: 'JS',
		passion: 'Web',
	},
	{
		name: 'Leigh',
		language: 'JS,Ruby',
		passion: 'Web',
	},
	{
		name: 'Ben',
		language: 'JS',
		passion: 'Unknown',
	},
];

export default (req, res) => {
	const client = redis.createClient({
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		password: process.env.REDIS_PASSWORD,
	});
	client.on('connect', () => {
		console.log(`Redis is here`.blue.bold);
	});
	// client.del('Brad');
	devs.forEach(({ name, language, passion }) => {
		// client.hget(name, 'passion', (err, reply) => {
		// 	console.log(reply);
		// });

		// client.HGETALL('Ben', (err, reply) => {
		// 	if (err) {
		// 		console.error(err);
		// 	}
		// 	console.log(reply);
		// });

		client.HMSET(name, [ 'name', name, 'language', language, 'passion', passion ], (err, reply) => {
			if (err) {
				console.error(err);
			}
			console.log(reply);
		});
	});
	res.statusCode = 200;
	res.json({ name: 'John Doe' });
};
