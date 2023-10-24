import Image from 'next/image';
import { avatar } from '@/lib/info';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const foundingMembers = [
	{ id: 1, name: 'Einar Guðni', aka: '', image: avatar }, // I should add the image of the boys to the image folder..
	{ id: 2, name: 'Garðar', aka: '', image: avatar },
	{ id: 3, name: 'Davíð Hugus', aka: 'Pudus', image: avatar },
	{ id: 4, name: 'Daníel', aka: '', image: avatar },
	{ id: 5, name: 'Eyjó', aka: '', image: avatar },
	{ id: 6, name: 'Bjarni leifs', aka: '', image: avatar }
];

const We = () => {
	return (
		<div>
			<div>
				<h2 className="font-bold text-3xl font-serif mb-5">Wine Enthusiastics - club</h2>
				The Wine Enthusiastic club was founded by 6 guys in Crossfit Reykjavik in September
				of 2023. The aim of this game is simple, meet and taste (drink) wine.
				<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
					&#126;&#126;&#126;
				</div>
				<div className="flex mt-2 items-center">
					<div className="text-neutral-500 mr-2 text-lg"> &#8227;</div>
					<div className="text-neutral-200">
						The hosting person will choose a rule or theme
					</div>
				</div>
				<div className="flex mt-2 items-center">
					<div className="text-neutral-500 mr-2 text-lg"> &#8227;</div>
					<div className="text-neutral-200">
						All members will bring a wine, you will need to fulfill any rules or themes
						decided by the host.
					</div>
				</div>
				<div className="flex mt-2 items-center">
					<div className="text-neutral-500 mr-2 text-lg"> &#8227;</div>
					<div className="text-neutral-200">
						The WE club should not meet with too little time between.
					</div>
				</div>
				<div className="flex mt-2 items-center">
					<div className="text-neutral-500 mr-2 text-lg"> &#8227;</div>
					<div className="text-neutral-200">
						If a founding member cannot show up, others have to decide if this will be
						official WE meeting or not.
					</div>
				</div>
				<div className="flex mt-2 items-center">
					<div className="text-neutral-500 mr-2 text-lg"> &#8227;</div>
					<div className="text-neutral-200">
						You are not forced to drink the wine, we encourage you to taste it, and we
						we want you to rate it.
					</div>
				</div>
				<div className="mt-5">
					<h4 className="font-bold text-xl font-serif">The founding members</h4>
					<div className="my-5">
						<div className="grid grid-cols-2 md:grid-cols-3 gap-2">
							{foundingMembers.map((fm) => (
								<div
									key={fm.id}
									className="flex flex-col justify-center items-center"
								>
									<Image
										alt={fm.name}
										className="rounded-full grayscale my-2"
										src={fm.image}
										height="72"
										width="72"
										priority
									/>
									<p className="font-bold text-sm font-serif">{fm.name}</p>
								</div>
							))}
						</div>
					</div>
				</div>
				<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
					&#126;&#126;&#126;
				</div>
				<div className="mt-5">
					<h4 className="font-bold text-xl font-serif">Ratings</h4>
					<div className="my-5">
						<div className="flex justify-between w-48">
							<Button variant="outline">
								<Link href="we-club/rating">Ratings</Link>
							</Button>
							<Button variant="outline" disabled>
								<Link href="we-club/rating">Best of</Link>
							</Button>
						</div>
					</div>
					<div>use planetScale</div>
				</div>
			</div>
		</div>
	);
};

export default We;
