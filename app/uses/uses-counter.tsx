'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

type UsesView = {
	type: string;
	count: string;
};

async function fetchUses(): Promise<UsesView[]> {
	const res = await fetch('/api/uses');
	return res.json();
}

async function incrementView(type: string) {
	await fetch(`/api/uses/${type}`, {
		method: 'POST'
	});
}

export default function UsesCounter({ type }: { type: string }) {
	const queryClient = useQueryClient();

	// ensure the query key is an array
	const queryKey = ['uses'];

	const { data, isLoading } = useQuery<UsesView[]>(queryKey, fetchUses);
	const viewsForSlug = Array.isArray(data) && data.find((view) => view.type === type);
	const views = viewsForSlug ? Number(viewsForSlug.count) : 0;

	const mutation = useMutation(() => incrementView(type), {
		onMutate: () => {
			// Optimistic update: update the count locally
			queryClient.setQueryData(queryKey, (oldData: UsesView[] | undefined) => {
				return oldData?.map((item) => {
					if (item.type === type) {
						return { ...item, count: (Number(item.count) + 1).toString() };
					}
					return item;
				});
			});
		},
		onSuccess: () => {
			// Revalidate the data after the mutation
			queryClient.invalidateQueries(queryKey);
		}
	});

	const handleClick = () => {
		mutation.mutate();
	};

	return (
		<div className="flex flex-row-reverse justify-between items-center">
			<div className="font-mono text-md text-neutral-500 tracking-tighter">
				{isLoading
					? // <Skeleton className="bg-neutral-100 w-16" />
					  'Loading..'
					: data
					? `${views.toLocaleString()} uses`
					: ' ​'}
			</div>
			<Button className="mx-3" variant="secondary" onClick={handleClick}>
				I use this!
			</Button>
		</div>
	);
}
