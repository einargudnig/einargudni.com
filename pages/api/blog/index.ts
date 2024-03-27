import { queryBuilder } from '@/utils/planetscale';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	try {
		const data = await queryBuilder
			.selectFrom('views')
			.select(['slug', 'count'])
			.orderBy('count', 'desc')
			.limit(1)
			.execute();

		return res.status(200).json(data);
	} catch (e) {
		console.log(e);
		// @ts-ignore
		return res.status(500).json({ message: e.message });
	}
}
