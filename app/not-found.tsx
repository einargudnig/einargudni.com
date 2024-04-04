import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
	return (
		<div className="flex justify-center items-center">
			<div className="mx-auto mt-10">
				<h2 className="text-4xl font-semibold">Not Found</h2>
				<p className="mt-4">Could not find requested resource</p>

				<Button variant="outline" size="lg" asChild className="mt-10">
					<Link href="/">Return Home</Link>
				</Button>
			</div>
		</div>
	);
}
