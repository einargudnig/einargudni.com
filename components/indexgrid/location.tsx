'use client';

// components/Location.tsx
import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// Define TypeScript types for the location
type LocationType = {
	region: string;
	city: string;
};

export default function LocationComponent() {
	// State to manage the input fields for region and city
	const [region, setRegion] = useState('');
	const [city, setCity] = useState('');

	const queryClient = useQueryClient();

	// Fetch location from the database
	const { data: location } = useQuery(['location'], async () => {
		const response = await fetch('/api/location');
		return response.json();
	});
	console.log('LOCATION', location);

	// Mutation to add a location to the database
	const addLocationMutation = useMutation(
		async (newLocation: LocationType) => {
			await fetch('/api/location', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(newLocation)
			});
		},
		{
			onSuccess: () => {
				// Invalidate and refetch
				queryClient.invalidateQueries(['location']);
			}
		}
	);

	// Handle the submission of a new location
	const handleAddLocation = () => {
		addLocationMutation.mutate({ region, city });
	};

	return (
		<div className="border border-1 border-neutral-200 p-4">
			<div className="mb-4">
				<label htmlFor="region" className="block text-sm font-medium text-gray-700">
					Region
				</label>
				<input
					type="text"
					id="region"
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
					value={region}
					// @ts-ignore
					onChange={(e) => setRegion(e.target.value)}
				/>
			</div>

			<div className="mb-4">
				<label htmlFor="city" className="block text-sm font-medium text-gray-700">
					City
				</label>
				<input
					type="text"
					id="city"
					className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
					value={city}
					// @ts-ignore
					onChange={(e) => setCity((e.target as HTMLInputElement).value)}
				/>
			</div>

			<button
				className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
				onClick={handleAddLocation}
			>
				Add Location
			</button>

			<div className="mt-4">
				<h3 className="text-lg font-medium">Current Location:</h3>
				{/* {location && (
					<p>
						{location.region}, {location.city}
					</p>
				)} */}
			</div>
		</div>
	);
}
