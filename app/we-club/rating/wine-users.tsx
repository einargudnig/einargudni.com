'use client';

import React from 'react';
import { useQuery } from '@tanstack/react-query';

interface WineUsers {
	name: string;
}

async function fetchUsers(): Promise<WineUsers[]> {
	const res = await fetch('/api/wine');
	return res.json();
}
const UserList: React.FC = () => {
	// ensure the query key is an array
	const queryKey = ['wineusers'];

	const { data: users, isLoading } = useQuery<WineUsers[]>(queryKey, fetchUsers);

	if (isLoading) {
		return <div>Loading...</div>; // Handle loading state if users are undefined
	}

	return (
		<div>
			<p>users from DB</p>
			{users?.map((user, index) => (
				<div key={index}>{user.name}</div>
			))}
		</div>
	);
};

export default UserList;
