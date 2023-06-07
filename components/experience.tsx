import Link from 'next/link';

interface ExperienceProps {
	title: string;
	company: string;
	location: string;
	range: string;
	url: string;
	text1: string;
	text2: string;
	text3: string;
}

export default function Experience({
	title,
	company,
	location,
	range,
	url,
	text1,
	text2,
	text3
}: ExperienceProps) {
	return (
		<div className="my-3">
			<div className="flex flex-row text-xl">
				<span className="text-neutral-500 dark:text-neutral-400">{title}</span>{' '}
				<span className="text-neutral-500 dark:text-neutral-400">&nbsp;@&nbsp;</span>{' '}
				<span className="text-neutral-700 dark:text-neutral-100">
					<Link href={url} className="no-underline">
						{company}
					</Link>
				</span>
			</div>
			<div>
				<div className="p-1 font-mono text-gray-500 dark:text-gray-500 text-sm">
					{location}
				</div>
				<div className="p-1 font-mono text-gray-400 dark:text-gray-600 text-sm">
					{range}
				</div>
				<div className="p-2">
					<div className="flex flex-row ">
						<div className="text-neutral-600 dark:text-neutral-100 mr-2 text-lg">
							{' '}
							&#8227;
						</div>
						<div className="text-gray-500 dark:text-gray-400">{text1}</div>
					</div>
					<div className="flex flex-row">
						<div className="text-neutral-600 dark:text-neutral-100 mr-2 text-lg">
							{' '}
							&#8227;
						</div>
						<div className="text-gray-500 dark:text-gray-400">{text2}</div>
					</div>
					<div className="flex flex-row items-top">
						<div className="text-neutral-600 dark:text-neutral-100 mr-2 text-lg">
							{' '}
							&#8227;
						</div>
						<div className="text-gray-500 dark:text-gray-400">{text3}</div>
					</div>
				</div>
			</div>
			<div className="font-medium text-2xl justify-center text-neutral-600 dark:text-neutral-100 text-center">
				&#126;&#126;&#126;
			</div>
		</div>
	);
}
