'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

// ? What is this? Since our layout.tsx a server component, we need to wrap it in a ReactQueryProvider
// ? to make sure that our client components can use react-query.
export function ReactQueryProvider({ children }: { children: React.ReactNode }) {
	return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
