import Image from 'next/image';

export const UsesCard = () => {
	return (
		<div className="w-full">
			<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
				<div className="p-6">
					<div className="flex flex-row justify-between items-center">
						<div className="flex flex-col">
							<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
								Macbook pro M1
								{/* {title} */}
							</h2>
							<p className="prose max-w-none mb-3 text-neutral-300">
								M1 max chip - 64GB ram - 1TB SSD an absolute beast. My first Macbook
								and I suspect I won&apos;t be changing back. This feels like a
								&apos;forever&apos; machine.
								{/* {description} */}
							</p>
						</div>
						<div className="mx-1">
							<Image
								src="/images/uses/macbook.png" //src={image}
								alt="Macbook pro 2022" //alt={title}
								width={200}
								height={200}
								className="grayscale rounded-md"
							/>
						</div>
					</div>

					<div className="flex flex-col mt-6">
						<div className="flex flex-row justify-between items-center">
							<p>I would love to see how many of you are using the same gear</p>
							<button className="border border-1 border-neutral-200 p-2 rounded-md text-neutral-200 text-sm font-extralight">
								I use this!
							</button>
						</div>
						<div>
							<p className="text-neutral-300">Number of people using this: 0</p>{' '}
							{/* {count} */}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
