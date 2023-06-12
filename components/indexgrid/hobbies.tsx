import Link from 'next/link';

export default function HobbiesButton() {
	return (
		<div className="h-48 border border-gray-200 rounded-md">
			<Link href={'/hobbies'} className="flex items-center">
				hobbies
			</Link>
		</div>
	);
}
