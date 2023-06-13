import { NextApiRequest, NextApiResponse } from 'next';

type LocationData = {
	city: string;
	region: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse<LocationData>) {
	if (req.method === 'POST') {
		const { city, region } = req.body;
		// You can now use the city and region in your Next.js app or perform any necessary processing
		const locationData: LocationData = { city, region };

		res.status(200).json(locationData);
	} else {
		// @ts-ignore
		res.status(405).json({ message: 'Method Not Allowed' });
	}
}
