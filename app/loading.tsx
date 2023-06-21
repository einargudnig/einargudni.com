import { Skeleton } from '@/components/ui/skeleton';

export default async function LoadingHome() {
	return (
		<section>
			<Skeleton className="h-4 w-48 bg-neutral-100 opacity-60" />
			<Skeleton className="h-3 w-64 bg-neutral-200" />
			<div className="flex items-start md:items-center my-8 flex-col md:flex-row">
				<Skeleton className="rounded-full h-6 w-6 bg-neutral-300" />
				<div className="mt-8 md:mt-0 ml-0 md:ml-6 space-y-2 text-neutral-400">
					<a
						rel="noopener noreferrer"
						target="_blank"
						href="https://github.com/einargudnig"
						className="flex items-center gap-2"
					>
						{/* <GitHubIcon />
						{`${starCount?.toLocaleString()} stars on this repo`} */}
					</a>
					{/* <Link href="/blog" className="flex items-center">
						<ViewsIcon />
						{`${views?.toLocaleString()} blog views all time`}
					</Link> */}
				</div>
			</div>
			{/* <p className="my-5 max-w-[600px]ext-neutral-200">
        {bio()}
      </p> */}
			<hr />
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
				{/* <NowPlaying /> */}
				{/* <UsesButton /> */}
				{/* <TopPost /> */}
				{/* <FollowTwitter /> */}
				{/* <NowButton /> */}
				{/* <HobbiesButton /> */}
				{/* <Location /> */}
				{/* <CommandBar /> */}
				{/* Last Book */}
				{/* Calories  */}
			</div>
		</section>
	);
}
