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
						<p className="font-semibold text-lg">tmux</p>
						<p className="font-mono text-sm text-muted-foreground">11 october 2024</p>
					</div>
				</CardHeader>
				<CardContent>
					How I use tmux and why. tmux is a terminal multiplexer and I think it can help a
					lot with keeping your workflow organized and efficient. I use it to simplify
					access and context switching for all my projects and I have made my workspace,
					workflows and general productivity better with it.
				</CardContent>
				<CardFooter>
					<div className="flex justify-end">
						<Link href="https://writing.einargudni.com/blog/tmux">
							<Button variant="outline">Read post</Button>
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
