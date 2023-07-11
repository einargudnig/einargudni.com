import { queryBuilder } from '@/lib/planetscale';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const type = req.query?.type as string;
		if (!type) {
			return res.status(400).json({ message: 'type is required.' });
		}

		const data = await queryBuilder
			.selectFrom('views')
			.where('slug', '=', type)
			.select(['count'])
			.execute();

		const count = !data.length ? 0 : Number(data[0].count);

		if (req.method === 'POST') {
			await queryBuilder
				.insertInto('uses')
				.values({ type, count: 1 })
				.onDuplicateKeyUpdate({ count: count + 1 })
				.execute();

			return res.status(200).json({
				total: count + 1
			});
		}

		if (req.method === 'GET') {
			return res.status(200).json({ total: count });
		}
	} catch (e) {
		console.log(e);
		// @ts-ignore
		return res.status(500).json({ message: e.message });
	}
}
