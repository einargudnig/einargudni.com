import Link from 'next/link';

export default function NowButton() {
	return (
		<div className="h-48 border border-gray-200 rounded-md">
			<Link href={'/now'} className="flex items-center">
				Now
			</Link>
		</div>
	);
}
