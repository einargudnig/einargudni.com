export default function ViewCounter({
	title,
	trackView,
	writing
}: {
	title: string;
	trackView: boolean;
	writing: { title: string; views: number }[];
}) {
	const entry = writing?.find((entry: { title: string }) => entry.title === title);
	console.log({ entry });

	return (
		<p className="font-mono text-sm text-neutral-500 tracking-tighter">
			{entry ? `${entry.views.toLocaleString()} views` : ' ​'}
		</p>
	);
}
