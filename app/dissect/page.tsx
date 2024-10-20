import { Separator } from '@radix-ui/react-separator';
import { Link } from 'next-view-transitions';
import raycastIcon from '../../public/images/dissect/raycast/raycast.png';
import marchonIcon from '../../public/images/dissect/marchon/marchon.png';
import thingsIcon from '../../public/images/dissect/things/things.png';
import Image from 'next/image';

export default function Page() {
	const dissectData = [
		{ text: 'Marchon training app', url: 'marchon', icon: marchonIcon, status: 'October 2024' },
		{ text: 'Raycast', url: 'raycast', icon: raycastIcon, status: 'in progress' },
		{ text: 'Things 3', url: 'things', icon: thingsIcon, status: 'in progress' }
	];

	return (
		<section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-6">
			<h2 className="text-xl font-bold">Software dissection</h2>
			<p className="text-muted-foreground mt-4">
				Here I will dissect some of the software I use on daily bases! Some software just
				has something extra. This can be a feature, a design choice or a workflow that just
				works for me.
			</p>
			<p className="text-muted-foreground mt-4 text-xs">
				Note! This is just my personal preference 🤓
			</p>
			<Separator className="bg-muted-foreground w-24" />
			<div className="flex flex-col items-start">
				{dissectData.map((item) => (
					<div key={item.text} className="flex items-center justify-between w-full p-1">
						<Link href={`../dissect/${item.url}`} className="w-full">
							<div className="flex items-center">
								<Image
									src={item.icon}
									className="rounded-md"
									alt="software logo"
									height={40}
									width={40}
								/>
								<div className="flex items-center justify-between ml-2 w-full">
									{item.text}

									<span className="text-muted-foreground font-mono">
										{item.status}
									</span>
								</div>
							</div>
						</Link>
					</div>
				))}
			</div>
		</section>
	);
}
