import { queryBuilder } from '@/utils/planetscale';
import { NextApiRequest, NextApiResponse } from 'next';

type LocationData = {
	city: string;
	region: string;
};

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<LocationData | { message: string }>
) {
	try {
		if (req.method === 'POST') {
			const { city, region } = req.body as LocationData;
			// You can now use the city and region in your Next.js app or perform any necessary processing

			// Assume you might want to save this data to your database
			await queryBuilder.insertInto('location').values({ city, region }).execute();

			return res.status(200).json({ city, region });
		} else if (req.method === 'GET') {
			const data = await queryBuilder
				.selectFrom('location')
				.select(['region', 'city'])
				.limit(1)
				.execute();

			return res.status(200).json(data[0]); // Assuming you want to return the first row
		} else {
			return res.status(405).json({ message: 'Method Not Allowed' });
		}
	} catch (e) {
		console.error(e);
		return res.status(500).json({ message: 'Internal Server Error' });
	}
}
