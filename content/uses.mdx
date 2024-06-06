---
title: 'New /uses'
publishedAt: 2023-10-05
summary: I gave my /uses page a little refresh
tags: ['misc', 'webpage']
---

# /uses

## EDIT!

You might see that I have changed my uses page again, that was because I wanted to make my homepage simpler, remove the extra code.
I'll leave this post here if someone wants to see how I did it before. I plan on doing something similar in the future, but in a different way!

I recently made my [/uses](/uses) page a little more useful. I've been meaning to do this for a while, but I finally got around to it.

I did not do too much but I added an option for you guys to 'play'.

I encourage you to press the 'I use this!' button on the tools you use.

It sends a request to my [database](https://planetscale.com/) and increment the count of people using this tool.
I used [tanstack query](https://tanstack.com/query/v4/docs/react/overview) to do this.

## react-query + nextjs app directory

I am not completely sure if this is the way to set it up with the new `app directory`, but it works. So we'll go with it 🤷🏼‍♂️

Since my top level `layout.tsx` is a server component I exported the `QueryClientProvider` from a client component.

```jsx
'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
```

Simple as that!

This was then imported into my `layout.tsx` file, which is a server component. Hence the need to make the other one a client component.

```tsx
import './globals.css';
import clsx from 'clsx';
import { Metadata } from 'next';
import localFont from 'next/font/local';
import { Sidebar } from '../components/sidebar';
import { ThemeProvider } from '@/components/theme-provider';
import { Analytics } from '@vercel/analytics/react';
import { ReactQueryProvider } from './react-query-provider';

const kaisei = localFont({
	src: '../public/fonts/kaisei-tokumin-latin-700-normal.woff2',
	weight: '700',
	variable: '--font-kaisei',
	display: 'swap'
});

export const metadata: Metadata = {
	title: 'Einar Gudni',
	description: 'Curious developer, crossfitter, and coffee lover.',
	openGraph: {
		title: 'Einar Gudni',
		description: 'Curious developer, crossfitter, and coffee lover.',
		url: 'https://einargudni.com',
		siteName: 'Einar Gudni',
		images: [
			{
				url: 'https://einargudni.com/og-bg.png',
				alt: 'Einar Gudni'
			}
		],
		type: 'website'
	}
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<ReactQueryProvider> <!-- 📢 -->
			<html lang="en" className={clsx('text-white bg-[#111010]', kaisei.variable)}>
				<body className="antialiased max-w-4xl mb-40 flex flex-col md:flex-row mx-4 mt-8 md:mt-20 lg:mt-32 lg:mx-auto">
					<Sidebar />
					<main className="flex-auto min-w-0 mt-6 md:mt-0 flex flex-col px-2 md:px-0">
						<ThemeProvider attribute="class" defaultTheme="system" enableSystem>
							{children}
						</ThemeProvider>
						<Analytics />
					</main>
				</body>
			</html>
		</ReactQueryProvider> <!-- 📢 -->
	);
}
```

Now that I had added the provider I could use the `useMutation` and `useQuery' hooks from `@tanstackreact-query`to send requests to my database.

<Callout emoji="💡">

_But remember I cannot use hooks in server components, so I had to use the`useClient` hook to be able to use these hooks._

</Callout>

## Counter

The component that I use to increment the count is a simple component that increses the count of the type (hardware/software).

We have probalby done these counters many times, this one is just a little bit different, it sends the increased valuet o the databse, and then revalidates the data.

So here is the client component that I use to send the requests, it really is a simple counter.

```tsx
'use client';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';

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
				{isLoading ? 'Loading..' : data ? `${views.toLocaleString()} uses` : ' ​'}
			</div>
			<Button className="mx-3" variant="secondary" onClick={handleClick}>
				I use this!
			</Button>
		</div>
	);
}
```

This is a simple component that fetches the data from my database and then increments the count when the button is clicked.
I'm trying out optimistic updates with tanstack query, and it seems to work well.

This is of course just one part of the puzzle. I also need to build an api route.
I use [kisely](https://github.com/depot/kysely-planetscale) to connect to my database and build queries.
[Kysely](https://kysely.dev/) is a typescript first query builder for MySQL and PostgreSQL.

I will not add the planetscale code here, since I don't want this to be too code heavy. I will write a post later to show how I connect to my database and how I set it up.
If you need more help to set this up, feel free to reach out to me on [twitter](https://twitter.com/einargudnig).

I plan on adding a little 'I use this' section on the bottom of the page, so you can add your own tools if they are not a part of my list. This will hopefully introduce my to new and exciting tools and software to use.
Stay tuned for that, I look forward to see what tools you guys use 😈

<Callout emoji="📢">

If you think I can do something better here, please let me know. I am always looking to improve.

</Callout>
