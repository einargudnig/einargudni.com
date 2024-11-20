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
						<p className="font-semibold text-lg">team-tally 002</p>
						<p className="font-mono text-sm text-muted-foreground">11 november 2024</p>
					</div>
				</CardHeader>
				<CardContent>
					I want to build, deploy and publish a mobile app. this is the second
					postregarding the project. I changed the archiecture for the log in phase and
					started to build that. I am also putting it on hold for a while, but hopefully I
					can pick it up again soon. I have not give nup on this project, just shifting
					the focus.
				</CardContent>
				<CardFooter>
					<div className="flex justify-end">
						<Link href="https://writing.einargudni.com/blog/team-tally-002">
							<Button variant="outline">Read post</Button>
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
