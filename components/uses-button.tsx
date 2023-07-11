'use client';

import { useState } from 'react';
import { queryBuilder } from '@/lib/planetscale';

interface Type {
	type: string;
}

export default function UsesButton({ type }: Type) {
	const [count, setCount] = useState<number>(0);

	// try {
	//   useEffect(() => {
	//     const getCount = async () => {
	//       const data = await queryBuilder
	//         .selectFrom('uses')
	//         .select(['count'])
	//         .where('type', '=', type)
	//         .execute();

	//       setCount(data[0].count);
	//     }

	//     getCount();
	// }
	const incrementCount = async () => {
		try {
			// Fetch the current count from the uses table
			const data = await queryBuilder
				.selectFrom('uses')
				.select(['count'])
				.where('type', '=', type)
				.execute();

			// Increment the count by 1
			setCount(data[0].count);
			const newCount = data[0].count + 1;

			// Update the count in the uses table
			await queryBuilder
				.updateTable('uses')
				.set({ count: newCount })
				.where('type', '=', type)
				.execute();

			// Update the count in the component state
			setCount(newCount);
		} catch (error) {
			console.error(error);
		}
	};

	const handleClick = async () => {
		incrementCount();
	};

	return (
		<div className="flex flex-col mt-6">
			<div className="flex flex-row justify-between items-center">
				<p>I would love to see how many of you are using the same gear</p>
				<button
					onClick={handleClick}
					className="border border-1 border-neutral-200 p-2 rounded-md text-neutral-200 text-sm font-extralight"
				>
					I use this!
				</button>
			</div>
			<div>
				<p className="text-neutral-300">Number of people using this: {count}</p>
			</div>
		</div>
	);
}
