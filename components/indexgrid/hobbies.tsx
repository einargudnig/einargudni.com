import Link from 'next/link';
import Image from 'next/image';
import { HobbiesIcon } from '../icons';

export default function HobbiesButton() {
	return (
		<div className="h-90 p-4 border border-gray-200 rounded-md shadow-md max-w-md mx-auto">
			<Link href={'/uses'} className="flex items-center justify-center">
				<div>
					<Image
						src="/images/hobbies.png"
						alt="hobbies"
						className="rounded-lg grayscale"
						width={350}
						height={100}
					/>
					<div className="flex flex-row mx-auto mt-6">
						<HobbiesIcon />
						<p className="ml-2">hobbies</p>
					</div>
				</div>
			</Link>
		</div>
	);
}
