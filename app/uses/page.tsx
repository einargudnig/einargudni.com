import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import UsesCounter from './uses-counter';

export const metadata: Metadata = {
	title: 'Uses',
	description: 'Hardware and software I use on a daily bases.'
};

export const revalidate = 60;

export default async function UsesPage() {
	return (
		<section>
			<h1 className="font-bold text-3xl font-serif mb-5">Uses</h1>
			<div>
				<p>
					Some of the images are made with midjourney 🤠 so some of them might be slightly
					off.
				</p>
				<br />
				<p className="text-neutral-400">
					Please let me know if you are using the same gear as I am by pushing the button
					underneath the image.
				</p>

				<h2 className="mt-4 font-bold text-2xl font-serif mb-5">Hardware</h2>
				<div>
					<div className="w-full">
						<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
							<div className="p-6">
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-col">
										<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
											<Link
												href="https://www.youtube.com/watch?v=rr2XfL_df3o&t=1186s"
												target="_blank"
											>
												Macbook pro M1
											</Link>
										</h2>
										<p className="prose max-w-none mb-3 text-neutral-300">
											14&quot; - M1 max chip - 64GB ram - 1TB SSD an absolute
											beast. My first Macbook and I suspect I won&apos;t be
											changing back. This feels like a &apos;forever&apos;
											machine.
										</p>
									</div>
									<div className="mx-1 p-1">
										<Image
											src="/images/uses/macbook.png"
											alt="Macbook pro 2022"
											width={200}
											height={200}
											className="rounded-md"
										/>
									</div>
								</div>
								<div className="flex justify-between mt-2 items-center">
									<p className="text-xs text-neutral-400">
										Let me know if you use this by pressing the button!
									</p>
									<UsesCounter type={'macbook'} />
								</div>
							</div>
						</div>
					</div>
					<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
						&#126;&#126;&#126;
					</div>
					<div className="w-full">
						<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
							<div className="p-6">
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-col">
										<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
											Nuphy halo 65
										</h2>
										<p className="prose max-w-none mb-3 text-neutral-300">
											Recently got this keyboard. It has the baby kangaroo
											switches. It looks great and the typing experience is
											amazing. I&apos;m not regretting getting this keyboard.
										</p>
									</div>
									<div className="mx-1 p-1">
										<Image
											src="/images/uses/nuphy.jpeg"
											alt="Macbook pro 2022"
											width={200}
											height={200}
											className="rounded-md"
										/>
									</div>
								</div>
								<div className="flex justify-between mt-2 items-center">
									<p className="text-xs text-neutral-400">
										Let me know if you use this by pressing the button!
									</p>
									<UsesCounter type={'nuphy'} />
								</div>
							</div>
						</div>
					</div>
					<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
						&#126;&#126;&#126;
					</div>
					<div className="w-full">
						<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
							<div className="p-6">
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-col">
										<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
											Mx Master 3
										</h2>
										<p className="prose max-w-none mb-3 text-neutral-300">
											Very comfortable to use. I&apos;ve had this mouse for
											almost three years and it works great. Travel with it to
											and from work every day and still looks like new. Great
											battery life.
										</p>
									</div>
									<div className="mx-1 p-1">
										<Image
											src="/images/uses/mxmaster.jpeg"
											alt="Macbook pro 2022"
											width={200}
											height={200}
											className="rounded-md"
										/>
									</div>
								</div>
								<div className="flex justify-between mt-2 items-center">
									<p className="text-xs text-neutral-400">
										Let me know if you use this by pressing the button!
									</p>
									<UsesCounter type={'mxmaster'} />
								</div>
							</div>
						</div>
					</div>
					<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
						&#126;&#126;&#126;
					</div>

					<div className="w-full">
						<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
							<div className="p-6">
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-col">
										<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
											Sony WH-1000XM3
										</h2>
										<p className="prose max-w-none mb-3 text-neutral-300">
											Bought these after my first year in University. Still
											work great. Use them at work and plan on to use them
											until they stop working
										</p>
									</div>
									<div className="mx-1 p-1">
										<Image
											src="/images/uses/sony.jpeg"
											alt="Macbook pro 2022"
											width={200}
											height={200}
											className="rounded-md"
										/>
									</div>
								</div>
								<div className="flex justify-between mt-2 items-center">
									<p className="text-xs text-neutral-400">
										Let me know if you use this by pressing the button!
									</p>
									<UsesCounter type={'sony'} />
								</div>
							</div>
						</div>
					</div>
					<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
						&#126;&#126;&#126;
					</div>

					<div className="w-full">
						<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
							<div className="p-6">
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-col">
										<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
											Airpods pro
										</h2>
										<p className="prose max-w-none mb-3 text-neutral-300">
											I have the nothing ear 1, but they have not been used
											since I got these. I&apos;m still surprised at how good
											the airpods pro are. They work so well with the apple
											ecosystem. My most used tech after the watch I wear
											every day.
										</p>
									</div>
									<div className="mx-1 p-1">
										<Image
											src="/images/uses/airpods.jpeg"
											alt="Macbook pro 2022"
											width={200}
											height={200}
											className="rounded-md"
										/>
									</div>
								</div>
								<div className="flex justify-between mt-2 items-center">
									<p className="text-xs text-neutral-400">
										Let me know if you use this by pressing the button!
									</p>
									<UsesCounter type={'airpods'} />
								</div>
							</div>
						</div>
					</div>
					<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
						&#126;&#126;&#126;
					</div>

					<div className="w-full">
						<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
							<div className="p-6">
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-col">
										<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
											Keychron K4
										</h2>
										<p className="prose max-w-none mb-3 text-neutral-300">
											My first mechanical keyboard, you really can&apos;t go
											wrong with a Keychron. It&apos;s nice, Gateron brown
											switches
										</p>
									</div>
									<div className="mx-1 p-1">
										<Image
											src="/images/uses/keychronk4.jpeg"
											alt="Macbook pro 2022"
											width={200}
											height={200}
											className="rounded-md"
										/>
									</div>
								</div>
								<div className="flex justify-between mt-2 items-center">
									<p className="text-xs text-neutral-400">
										Let me know if you use this by pressing the button!
									</p>
									<UsesCounter type={'keychronk4'} />
								</div>
							</div>
						</div>
					</div>
					<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
						&#126;&#126;&#126;
					</div>

					<div className="w-full">
						<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
							<div className="p-6">
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-col">
										<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
											Keychron K3
										</h2>
										<p className="prose max-w-none mb-3 text-neutral-300">
											This was the my &quot;home office&quot; keyboard before
											the Nuphy. I like the small form factor, and I will
											continue to use it. Low-profile Gateron brown switches
										</p>
									</div>
									<div className="mx-1 p-1">
										<Image
											src="/images/uses/keychronk3.jpeg"
											alt="Macbook pro 2022"
											width={200}
											height={200}
											className="rounded-md"
										/>
									</div>
								</div>
								<div className="flex justify-between mt-2 items-center">
									<p className="text-xs text-neutral-400">
										Let me know if you use this by pressing the button!
									</p>
									<UsesCounter type={'keychronk3'} />
								</div>
							</div>
						</div>
					</div>
					<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
						&#126;&#126;&#126;
					</div>

					<div className="w-full">
						<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
							<div className="p-6">
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-col">
										<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
											iPhone 14 pro
										</h2>
										<p className="prose max-w-none mb-3 text-neutral-300">
											After having the iPhone Xr for almost four years it was
											time to upgrade. What I like most is the camera and the
											battery life (perks of being new). The old one was also
											only 64gb of RAM. Which is way to little for me.
										</p>
									</div>
									<div className="mx-1 p-1">
										<Image
											src="/images/uses/iphone.jpeg"
											alt="Macbook pro 2022"
											width={200}
											height={200}
											className="rounded-md"
										/>
									</div>
								</div>
								<div className="flex justify-between mt-2 items-center">
									<p className="text-xs text-neutral-400">
										Let me know if you use this by pressing the button!
									</p>
									<UsesCounter type={'iphone'} />
								</div>
							</div>
						</div>
					</div>
					<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
						&#126;&#126;&#126;
					</div>

					<div className="w-full">
						<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
							<div className="p-6">
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-col">
										<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
											Garmin Venu
										</h2>
										<p className="prose max-w-none mb-3 text-neutral-300">
											I&apos;ve had this watch for over two years now and I
											have nothing to really complain about. It tracks my some
											of my health data and it has a great battery life.
										</p>
									</div>
									<div className="mx-1 p-1">
										<Image
											src="/images/uses/garmin.jpeg"
											alt="Macbook pro 2022"
											width={200}
											height={200}
											className="rounded-md"
										/>
									</div>
								</div>

								<div className="flex justify-between mt-2 items-center">
									<p className="text-xs text-neutral-400">
										Let me know if you use this by pressing the button!
									</p>
									<UsesCounter type={'garmin'} />
								</div>
							</div>
						</div>
					</div>
					<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
						&#126;&#126;&#126;
					</div>

					<div className="w-full">
						<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
							<div className="p-6">
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-col">
										<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
											24&quot; Asus Monitor
										</h2>
										<p className="prose max-w-none mb-3 text-neutral-300">
											Just some pretty regular Asus monitor I got at home.
											It&apos; tempting to get a new one, I would like a
											32&quot; 4k monitor. But I&apos;m not sure if I need it.
											I&apos;ll at least not impulse buy it.
										</p>
									</div>
									<div className="mx-1 p-1">
										<Image
											src="/images/uses/asus.jpeg"
											alt="Macbook pro 2022"
											width={200}
											height={200}
											className="rounded-md"
										/>
									</div>
								</div>
								<div className="flex justify-between mt-2 items-center">
									<p className="text-xs text-neutral-400">
										Let me know if you use this by pressing the button!
									</p>
									<UsesCounter type={'asus'} />
								</div>
							</div>
						</div>
					</div>
					<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
						&#126;&#126;&#126;
					</div>

					<div className="w-full">
						<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
							<div className="p-6">
								<div className="flex flex-row justify-between items-center">
									<div className="flex flex-col">
										<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
											Nothing ear 1
										</h2>
										<p className="prose max-w-none mb-3 text-neutral-300">
											I needed bluetooth headphones and I wanted to try these.
											They were such a great value for the money. I still
											think they are, but the airpods pro are just so good.
										</p>
									</div>
									<div className="mx-1 p-1">
										<Image
											src="/images/uses/nothing.jpeg"
											alt="Macbook pro 2022"
											width={200}
											height={200}
											className="rounded-md"
										/>
									</div>
								</div>
								<div className="flex justify-between mt-2 items-center">
									<p className="text-xs text-neutral-400">
										Let me know if you use this by pressing the button!
									</p>
									<UsesCounter type={'nothing'} />
								</div>
							</div>
						</div>
					</div>
					<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
						&#126;&#126;&#126;
					</div>
				</div>
				<h2 className="font-bold text-2xl font-serif mb-5 mt-8">Software</h2>

				<div className="w-full">
					<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
						<div className="p-6">
							<div className="flex flex-row justify-between items-center">
								<div className="flex flex-col">
									<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
										Obsidian
									</h2>
									<p className="prose max-w-none mb-3 text-neutral-300">
										I&apos;ve written posts about my system in Obsidian. I use
										it a lot. It has become my thinking buddy.
									</p>
								</div>
								<div className="mx-1 p-1">
									<Image
										src="/images/uses/obsidian.jpeg"
										alt="Obsidian"
										width={200}
										height={200}
										className="rounded-md"
									/>
								</div>
							</div>
							<div className="flex justify-between mt-2 items-center">
								<p className="text-xs text-neutral-400">
									Let me know if you use this by pressing the button!
								</p>
								<UsesCounter type={'obsidian'} />
							</div>
						</div>
					</div>
				</div>
				<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
					&#126;&#126;&#126;
				</div>

				<div className="w-full">
					<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
						<div className="p-6">
							<div className="flex flex-row justify-between items-center">
								<div className="flex flex-col">
									<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
										Raycast
									</h2>
									<p className="prose max-w-none mb-3 text-neutral-300">
										The more and more I use raycast I discover that I can
										replace so many apps with it. I love it!
									</p>
								</div>
								<div className="mx-1 p-1">
									<Image
										src="/images/uses/raycast.png"
										alt="raycast"
										width={150}
										height={150}
										className="rounded-md"
									/>
								</div>
							</div>
							<div className="flex justify-between mt-2 items-center">
								<p className="text-xs text-neutral-400">
									Let me know if you use this by pressing the button!
								</p>
								<UsesCounter type={'raycast'} />
							</div>
						</div>
					</div>
				</div>
				<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
					&#126;&#126;&#126;
				</div>

				<div className="w-full">
					<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
						<div className="p-6">
							<div className="flex flex-row justify-between items-center">
								<div className="flex flex-col">
									<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
										Things 3
									</h2>
									<p className="prose max-w-none mb-3 text-neutral-300">
										I used to use Obsidian as a task manager, but I felt I was
										stuffing my vault with a lot of noise. Things 3 is also
										great at being a task manager. I use it every day.
									</p>
								</div>
								<div className="mx-1 p-1">
									<Image
										src="/images/uses/things.jpeg"
										alt="things 3"
										width={200}
										height={200}
										className="rounded-md"
									/>
								</div>
							</div>
							<div className="flex justify-between mt-2 items-center">
								<p className="text-xs text-neutral-400">
									Let me know if you use this by pressing the button!
								</p>
								<UsesCounter type={'things'} />
							</div>
						</div>
					</div>
				</div>
				<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
					&#126;&#126;&#126;
				</div>

				<div className="w-full">
					<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
						<div className="p-6">
							<div className="flex flex-row justify-between items-center">
								<div className="flex flex-col">
									<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
										Arc browser
									</h2>
									<p className="prose max-w-none mb-3 text-neutral-300">
										It&apos;s fine. I made a boost for Youtube so now it&apos;s
										impossible for me to end in the youtube blackhole. That
										alone makes Arc worth it for me.
									</p>
								</div>
								<div className="mx-1 p-1">
									<Image
										src="/images/uses/arc.png"
										alt="Arc"
										width={200}
										height={250}
										className="rounded-md"
									/>
								</div>
							</div>
							<div className="flex justify-between mt-2 items-center">
								<p className="text-xs text-neutral-400">
									Let me know if you use this by pressing the button!
								</p>
								<UsesCounter type={'arc'} />
							</div>
						</div>
					</div>
				</div>
				<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
					&#126;&#126;&#126;
				</div>

				<div className="w-full">
					<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
						<div className="p-6">
							<div className="flex flex-row justify-between items-center">
								<div className="flex flex-col">
									<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
										Cron
									</h2>
									<p className="prose max-w-none mb-3 text-neutral-300">
										The calendar app I use. I like it. It&apos;s simple and
										works well. I don&apos;t need much more than that.
									</p>
								</div>
								<div className="mx-1 p-1">
									<Image
										src="/images/uses/cron.png"
										alt="Cron"
										width={200}
										height={200}
										className="rounded-md"
									/>
								</div>
							</div>
							<div className="flex justify-between mt-2 items-center">
								<p className="text-xs text-neutral-400">
									Let me know if you use this by pressing the button!
								</p>
								<UsesCounter type={'cron'} />
							</div>
						</div>
					</div>
				</div>
				<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
					&#126;&#126;&#126;
				</div>

				<div className="w-full">
					<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
						<div className="p-6">
							<div className="flex flex-row justify-between items-center">
								<div className="flex flex-col">
									<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
										VS Code
									</h2>
									<p className="prose max-w-none mb-3 text-neutral-300">
										Editor of choice. Nothing new here, I tried zed.dev for a
										side project. It was nice, but I&apos;m not changing from VS
										Code anytime soon.
									</p>
								</div>
								<div className="mx-1 p-1">
									<Image
										src="/images/uses/vscode.png"
										alt="VS Code"
										width={200}
										height={200}
										className="rounded-md"
									/>
								</div>
							</div>
							<div className="flex justify-between mt-2 items-center">
								<p className="text-xs text-neutral-400">
									Let me know if you use this by pressing the button!
								</p>
								<UsesCounter type={'vscode'} />
							</div>
						</div>
					</div>
				</div>
				<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
					&#126;&#126;&#126;
				</div>

				<div className="w-full">
					<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
						<div className="p-6">
							<div className="flex flex-row justify-between items-center">
								<div className="flex flex-col">
									<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
										1Password
									</h2>
									<p className="prose max-w-none mb-3 text-neutral-300">
										Have my personal account and my work account. I like how
										easy they work together. Everyone should use a password
										manager
									</p>
								</div>
								<div className="mx-1 p-1">
									<Image
										src="/images/uses/1password.jpeg"
										alt="1password"
										width={200}
										height={200}
										className="rounded-md"
									/>
								</div>
							</div>
							<div className="flex justify-between mt-2 items-center">
								<p className="text-xs text-neutral-400">
									Let me know if you use this by pressing the button!
								</p>
								<UsesCounter type={'1password'} />
							</div>
						</div>
					</div>
				</div>
				<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
					&#126;&#126;&#126;
				</div>

				<div className="w-full">
					<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
						<div className="p-6">
							<div className="flex flex-row justify-between items-center">
								<div className="flex flex-col">
									<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
										Warp
									</h2>
									<p className="prose max-w-none mb-3 text-neutral-300">
										I have used this terminal for a while and I like it.
										It&apos;s fast and it looks good, but in the end it&apos;s
										just a terminal.
									</p>
								</div>
								<div className="mx-1 p-1">
									<Image
										src="/images/uses/warp.jpeg"
										alt="Warp"
										width={150}
										height={150}
										className="rounded-md"
									/>
								</div>
							</div>
							<div className="flex justify-between mt-2 items-center">
								<p className="text-xs text-neutral-400">
									Let me know if you use this by pressing the button!
								</p>
								<UsesCounter type={'warp'} />
							</div>
						</div>
					</div>
				</div>
				<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
					&#126;&#126;&#126;
				</div>

				<div className="w-full">
					<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
						<div className="p-6">
							<div className="flex flex-row justify-between items-center">
								<div className="flex flex-col">
									<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
										Spark
									</h2>
									<p className="prose max-w-none mb-3 text-neutral-300">
										My email client of choice. I like it. I can remove the gmail
										noise from my browser and use their app instead. All of the
										keyboard shortcuts have helped me speed up my email
										workflow.
									</p>
								</div>
								<div className="mx-1 p-1">
									<Image
										src="/images/uses/spark.jpeg"
										alt="Spark"
										width={200}
										height={200}
										className="rounded-md"
									/>
								</div>
							</div>
							<div className="flex justify-between mt-2 items-center">
								<p className="text-xs text-neutral-400">
									Let me know if you use this by pressing the button!
								</p>
								<UsesCounter type={'spark'} />
							</div>
						</div>
					</div>
				</div>
				<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
					&#126;&#126;&#126;
				</div>

				<div className="w-full">
					<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
						<div className="p-6">
							<div className="flex flex-row justify-between items-center">
								<div className="flex flex-col">
									<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
										Postman
									</h2>
									<p className="prose max-w-none mb-3 text-neutral-300">
										Use this at my daily job, Postman always delivers.
									</p>
								</div>
								<div className="mx-1 p-1">
									<Image
										src="/images/uses/postman.png"
										alt="Postman"
										width={100}
										height={100}
										className="rounded-md"
									/>
								</div>
							</div>
							<div className="flex justify-between mt-2 items-center">
								<p className="text-xs text-neutral-400">
									Let me know if you use this by pressing the button!
								</p>
								<UsesCounter type={'postman'} />
							</div>
						</div>
					</div>
				</div>
				<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
					&#126;&#126;&#126;
				</div>

				<div className="w-full">
					<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
						<div className="p-6">
							<div className="flex flex-row justify-between items-center">
								<div className="flex flex-col">
									<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
										Insomnia
									</h2>
									<p className="prose max-w-none mb-3 text-neutral-300">
										I wanted to use a different app than Postman for my
										freelancing jobs, so I tried Insomnia.
									</p>
								</div>
								<div className="mx-1 p-1">
									<Image
										src="/images/uses/insomnia.png"
										alt="Insomnia"
										width={100}
										height={100}
										className="rounded-md"
									/>
								</div>
							</div>
							<div className="flex justify-between mt-2 items-center">
								<p className="text-xs text-neutral-400">
									Let me know if you use this by pressing the button!
								</p>
								<UsesCounter type={'insomnia'} />
							</div>
						</div>
					</div>
				</div>
				<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
					&#126;&#126;&#126;
				</div>

				<div className="w-full">
					<div className="h-full overflow-hidden border rounded-md border-opacity-60 border-neutral-400">
						<div className="p-6">
							<div className="flex flex-row justify-between items-center">
								<div className="flex flex-col">
									<h2 className="text-2xl font-bold leading-8 tracking-tight mb-3 text-neutral-100">
										IntelliJ
									</h2>
									<p className="prose max-w-none mb-3 text-neutral-300">
										I need IntelliJ to run the backend locally with newest
										updates for my freelance job.
									</p>
								</div>
								<div className="mx-1 p-1">
									<Image
										src="/images/uses/intellji.jpeg"
										alt="IntelliJ"
										width={150}
										height={200}
										className="rounded-md"
									/>
								</div>
							</div>
							<div className="flex justify-between mt-2 items-center">
								<p className="text-xs text-neutral-400">
									Let me know if you use this by pressing the button!
								</p>
								<UsesCounter type={'intellij'} />
							</div>
						</div>
					</div>
				</div>
				<div className="font-medium text-2xl justify-center text-neutral-100 text-center">
					&#126;&#126;&#126;
				</div>
			</div>
		</section>
	);
}
