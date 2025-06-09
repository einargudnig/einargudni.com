import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'next-view-transitions';

export function NewestWriting() {
	return (
		<div>
			<div className="flex items-baseline">
				<h2 className="text-xl font-bold mb-3">Newest Writing</h2>
				<p className="ml-2">
					-&gt;{' '}
					<Link href="https://writing.einargudni.com" className="hover:underline">
						all writing
					</Link>
				</p>
			</div>
			<Card>
				<CardHeader>
					<div className="flex justify-between items-center">
						<p className="font-semibold text-lg">keyboard</p>
						<p className="font-mono text-sm text-muted-foreground">08 june 2025</p>
					</div>
				</CardHeader>
				<CardContent>
					<p className="mb-4">
						I like writin on a good keyboard! This is a post about my daily driver that
						I have at home! I have made some updates and even though I say it myself it
						looks and feels great! Check out the updates, the photos and the image
					</p>
				</CardContent>
				<CardFooter>
					<div className="flex justify-end">
						<Link href="https://writing.einargudni.com/blog/keyboard">
							<Button variant="outline">Read post</Button>
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
