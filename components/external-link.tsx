import { ArrowTopRightIcon } from '@radix-ui/react-icons';
import Link from 'next/link';

export function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
	return (
		<div className="flex items-center group">
			<Link href={href} className="flex items-center space-x-2">
				{children}
				<ArrowTopRightIcon className="text-neutral-500 group-hover:scale-125 transition-transform duration-150" />
			</Link>
		</div>
	);
}
