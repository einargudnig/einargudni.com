import { Separator } from '@radix-ui/react-separator';
import { Link } from 'next-view-transitions';

export default function Page() {
	const dissectData = [
		{ text: 'Marchon training app', url: 'marchon', icon: '🔍', status: 'in progress' },
		{ text: 'Raycast', url: 'raycast', icon: '🔍', status: 'in progress' },
		{ text: 'Things 3', url: 'things', icon: '🔍', status: 'in progress' }
	];

	return (
		<section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-6">
			<h2 className="text-xl font-bold">Software dissection</h2>
			<p className="text-muted-foreground mt-4">
				Here I will dissect some of the software I use on daily bases!
			</p>
			<Separator className="bg-muted-foreground w-24" />
			<div className="flex items-center justify-between">
				<Link href="../dissect/marchon">Marchon</Link>
			</div>
		</section>
	);
}
