import nextConnect from 'next-connect';
import 'colors';
import redis from 'redis';

export const client = redis.createClient(
	{
		host: process.env.REDIS_HOST,
		port: process.env.REDIS_PORT,
		password: process.env.REDIS_PASSWORD,
	},
);

export default nextConnect({
	onError(err, req, res, next) {
		return res.status(501).json({ success: false, error: err.message });
	},
	onNoMatch(req, res) {
		return res.status(400).json({ success: false });
	},
});
