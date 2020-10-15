import handler, { client } from '../../src/handler';
import 'colors';

export default handler
	.get((req, res, next) => {
		const { name } = req.query;
		client.HGETALL(name, (err, reply) => {
			if (err) {
				console.error(err);
				return res.status(err.status).json({ success: true, error: err.message });
			}
			return res.status(200).json({ success: true, data: reply });
		});
	})
	.post((req, res, next) => {
		const { name, language, passion } = req.body;
		if (!name || !language || !passion) {
			return res.status(401).json({ success: true, error: `I need name, language and passion. All or none.` });
		}
		client.HSET(name, [ 'name', name, 'language', language, 'passion', passion ], (err, reply) => {
			if (err) {
				console.error(err);
				return res.status(err.status).json({ success: true, error: err.message });
			}
			return res.status(201).json({ success: true, data: reply });
		});
	});
