import Link from 'next/link';
import Image from 'next/image';
import { GlobeIcon } from '../icons';

export default function NowButton() {
	return (
		<div className="h-90 p-4 border border-gray-200 rounded-md shadow-md max-w-md mx-auto">
			<Link href={'/uses'} className="flex items-center justify-center">
				<div>
					<Image
						src="/images/now.png"
						alt="now"
						className="rounded-lg grayscale"
						width={350}
						height={100}
					/>
					<div className="flex flex-row mx-auto mt-6">
						<GlobeIcon />
						<p className="ml-2">now</p>
					</div>
				</div>
			</Link>
		</div>
	);
}
