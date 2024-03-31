import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { cookies } from 'next/headers';

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
	throw new Error('Missing env vars SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY');
}

const cookieStore = cookies();
const privateClient = createServerClient(
	process.env.SUPABASE_URL,
	process.env.SUPABASE_SERVICE_ROLE_KEY,
	{
		cookies: {
			get(name: string) {
				return cookieStore.get(name)?.value;
			},
			set(name: string, value: string, options: CookieOptions) {
				try {
					cookieStore.set({ name, value, ...options });
				} catch (error) {
					// The `set` method was called from a Server Component.
					// This can be ignored if you have middleware refreshing
					// user sessions.
				}
			},
			remove(name: string, options: CookieOptions) {
				try {
					cookieStore.set({ name, value: '', ...options });
				} catch (error) {
					// The `delete` method was called from a Server Component.
					// This can be ignored if you have middleware refreshing
					// user sessions.
				}
			}
		}
	}
);

export default privateClient;
