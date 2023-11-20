import Link from 'next/link';
import Image from 'next/image';
import { getBlogViews, getStarCount } from '@/lib/metrics';
import { GitHubIcon, ViewsIcon } from '../components/icons';
import { name, about, avatar, bio } from '@/lib/info';
import NowPlaying from '@/components/indexgrid/spotify';
import TopPost from '@/components/indexgrid/top-post';
// import FollowTwitter from '@/components/indexgrid/twitter';
import NowButton from '@/components/indexgrid/now';
import UsesButton from '@/components/indexgrid/uses';
import CuriosityButton from '@/components/indexgrid/curiosity';
import HobbiesButton from '@/components/indexgrid/hobbies';

export const revalidate = 60;

export default async function Home() {
	let starCount, views;
	// This is the / route
	try {
		[starCount, views] = await Promise.all([getStarCount(), getBlogViews()]);
	} catch (error) {
		console.error(error);
	}
	return (
		<section>
			<h1 className="font-bold text-3xl font-serif">{name}</h1>
			<p className="my-5 max-w-[460px] text-neutral-200">{about()}</p>
			<div className="flex items-start md:items-center my-8 flex-col md:flex-row">
				<Image
					alt={name}
					className="rounded-full grayscale"
					src={avatar}
					placeholder="blur"
					width={100}
					priority
				/>
				<div className="mt-8 md:mt-0 ml-0 md:ml-6 space-y-2 text-neutral-400">
					<a
						rel="noopener noreferrer"
						target="_blank"
						href="https://github.com/einargudnig"
						className="flex items-center gap-2"
					>
						<GitHubIcon />
						{`${starCount?.toLocaleString()} stars on this repo`}
					</a>
					<Link href="/blog" className="flex items-center">
						<ViewsIcon />
						{`${views?.toLocaleString()} blog views all time`}
					</Link>
				</div>
			</div>
			<p className="my-5 max-w-[600px]ext-neutral-200">{bio()}</p>
			<hr />
			{/* <div className="grid grid-cols-1 gap-4 md:grid-cols-4 md:grid-rows-5 mt-4"> */}
			{/* <div className="border border-1 border-neutral-200 col-span-2">Newest blog</div> */}
			{/* <div className="border border-1 border-neutral-200 col-span-2">Location</div>
				<div className="border border-1 border-neutral-200 col-span-2 row-span-2">
					Wallpapers
				</div>
				<div className="border border-1 border-neutral-200 col-span-2">Now playing</div>
				<div className="border border-1 border-neutral-200 col-start-3 col-span-2">
					Command bar
				</div>
				<div className="border border-1 border-neutral-200 col-span-4">Uses Software</div>
				<div className="border border-1 border-neutral-200 col-span-2">
					<TopPost />
				</div>
				<div className="border border-1 border-neutral-200">Now</div>
				<div className="border border-1 border-neutral-200">Weeks</div> */}
			{/* </div> */}
			<div className="grid grid-cols-1 gap-4 md:grid-cols-2 mt-4">
				<NowPlaying />
				<UsesButton />
				{/* <TopPost /> */}
				{/* <FollowTwitter /> */}
				{/* {/* <NowButton /> */}
				<CuriosityButton />
				<HobbiesButton />
				{/* <Location /> */}
				{/* <CommandBar /> */}
				{/* Latex book */}
				{/* Wallpapers */}
				{/* Calories  */}
			</div>
		</section>
	);
}
