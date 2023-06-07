import { Metadata } from 'next';
import { GitHubIcon, YoutubeIcon, ArrowIcon, TwitterIcon } from '../../components/icons';
import Experience from '../../components/experience';
import Link from 'next/link';

export const metadata: Metadata = {
	title: 'About',
	description: "Want to know more about me? You're in the right place!"
};

//! add to database?
const experienceData = [
	{
		title: 'Software Developer',
		company: 'Maul',
		location: 'Reykjavik, Iceland',
		range: 'October 2020 - present',
		url: 'https://maul.is',
		text1: 'Helped growing the company from delivering around 2000 orders per week in one Reykjavik to delivering over 8000 orders and expanding abroad.',
		text2: 'Work with a variety of different technologies, such as, JavaScript, React, Tailwind CSS, React-Query, Xstate, Dynamo DB, AWS services to name a few',
		text3: 'Maintain and build software for customers, restaurants and internal tools. Help to build systems to improve our operation.'
	},
	{
		title: 'Contractor',
		company: 'GigOver',
		location: 'Reykjavik, Iceland',
		range: 'October 2022 - present',
		url: 'https://gigover.com',
		text1: 'Frontend developer for a young startup aiming to improve project management in the construction industry',
		text2: 'Writing code in TypeScript, React, Chakra UI, React-Query, Firebase',
		text3: 'building new features to the web application'
	},
	{
		title: 'Software Developer',
		company: 'Reboot hack',
		location: 'Reykjavik, Iceland',
		range: 'August 2019 - March 2020',
		url: 'https://reboothack.is',
		text1: 'Worked in a team of three developers to build and maintain a website for Reboot Hack 2020, the first ever student organized hackathon in Iceland',
		text2: 'Website held information about the event along side sign up form. Built with Node JS, React and Bootstrap. PostgreSQL database',
		text3: 'Helped doing multiple things for the event, such as, advertisement, organize IT and more'
	}
];

export default function AboutPage() {
	return (
		<section>
			<h1 className="font-bold text-3xl font-serif">About Me</h1>
			<p className="my-5 text-neutral-800 dark:text-neutral-200">
				Hey, I&apos;m Einar Gudni. Most folks know me as Einar.
			</p>
			<div className="prose prose-neutral dark:prose-invert text-neutral-800 dark:text-neutral-200">
				<p>
					I graduated as a computer scientist from the University of Iceland in the summer
					of 2020. I live in Reykjavík. I work as a software developer at Maul.
				</p>
				<div className="flex flex-col gap-2 md:flex-row md:gap-2 mb-6">
					<Link
						href="/now"
						className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
					>
						now
					</Link>
					<Link
						href="/uses"
						className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
					>
						uses
					</Link>
					<Link
						href="/hobbies"
						className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
					>
						hobbies
					</Link>
				</div>
				<div className="font-medium text-2xl justify-center text-neutral-600 dark:text-neutral-100 text-center">
					&#126;&#126;&#126;
				</div>
				<p>
					I&apos;m passionate in many different areas. I train Crossfit, and I like to eat
					and cook food. I love to zip on a good cup of coffee or a glass of good wine. My
					plan is to be over 100 years old, so I try to play long-term games.
				</p>
				<p>
					I&apos;m very dedicated to learn new things and to truly believe that you should
					never stop learning. I enjoy creating different things, whether that be
					websites, application or anything in between.
				</p>
				<p className="mb-8">
					At my first full-time job as a developer I feel like I&apos;ve been very lucky
					to experience a broad and diverse part of projects and tasks. I get to deal with
					everything from user feedback, design and to backend tests and improving parts
					of our daily operations.
				</p>
				<div className="flex flex-col gap-2 md:flex-row md:gap-2 mb-6">
					<a
						rel="noopener noreferrer"
						target="_blank"
						href="https://twitter.com/einargudni"
						className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
					>
						<div className="flex items-center">
							<TwitterIcon />
							<div className="ml-3">Twitter</div>
						</div>
						<ArrowIcon />
					</a>
					<a
						rel="noopener noreferrer"
						target="_blank"
						href="https://github.com/einargudnig"
						className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
					>
						<div className="flex items-center">
							<GitHubIcon />
							<div className="ml-3">GitHub</div>
						</div>
						<ArrowIcon />
					</a>
					<a
						rel="noopener noreferrer"
						target="_blank"
						href="https://www.youtube.com/@leerob"
						className="flex w-full border border-neutral-200 dark:border-neutral-800 rounded-lg p-4 no-underline items-center text-neutral-800 dark:text-neutral-200 hover:dark:bg-neutral-900 hover:bg-neutral-100 transition-all justify-between"
					>
						<div className="flex items-center">
							<YoutubeIcon />
							<div className="ml-3">YouTube</div>
						</div>
						<ArrowIcon />
					</a>
				</div>
				<div className="font-medium text-2xl justify-center text-neutral-600 dark:text-neutral-100 text-center">
					&#126;&#126;&#126;
				</div>
				<h1 className="font-bold text-3xl font-serif mt-4">Experience</h1>
				<div className="mt-6">
					{experienceData.map((d) => (
						<Experience
							key={d.company}
							title={d.title}
							company={d.company}
							location={d.location}
							range={d.range}
							url={d.url}
							text1={d.text1}
							text2={d.text2}
							text3={d.text3}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
