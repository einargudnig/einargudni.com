import { Metadata } from 'next';
import ProjectsCard from '../../components/projects-card';

export const metadata: Metadata = {
	title: 'Projects',
	description: 'Continue to work on your craft to be better'
};

//! Should I put this in the database?
const projectsData = [
	{
		title: 'Okteberfest22',
		description:
			'Website for the 2022 Oktoberfest in Munich, Germany. Counter and a bingo card uilt with TypeScript.',
		imgSrc: '',
		href: 'https://oktoberfest22.vercel.app/',
		github: 'https://github.com/einargudnig/oktoberfest22',
		tech1: 'Next.js',
		tech2: 'TailwindCSS',
		tech3: 'Supabase'
	},
	{
		title: 'Personal Website 4.0',
		description:
			'Current version. Improved the blog a lot, rebuilt with tailwind and a lot of extra features.',
		imgSrc: '',
		href: 'https://einargudni.com',
		github: 'https://github.com/einargudnig/einargudni.com',
		tech1: 'Next.js',
		tech2: 'Tailwind CSS',
		tech3: 'mdx'
	},
	{
		title: 'Course grader',
		description:
			'Web application built to allow students from the computer science department from the university of Iceland to review and grade their classes.',
		imgSrc: '',
		href: 'https://course-advisor-csui.herokuapp.com/',
		github: 'https://github.com/einargudnig/courseAdvisor',
		tech1: 'React',
		tech2: 'Firebase',
		tech3: 'Material-UI'
	},
	{
		title: 'Reboot Hack 2020',
		description:
			'Information and registration webpage for Reboot Hack, the first student driven hackathon in Iceland.',
		imgSrc: '',
		href: 'https://reboothack.is',
		github: 'https://github.com/einargudnig/reboothackFORK',
		tech1: 'React',
		tech2: 'PostgresQL',
		tech3: 'Bootstrap'
	},
	{
		title: 'GAIA',
		description:
			'Web application built with Java Spring and Thymeleaf HTML templates, Makes users complete challenges to decrease their carbon footprint.',
		imgSrc: '',
		href: '',
		github: 'https://github.com/einargudnig/GAIA',
		tech1: 'Java Spring',
		tech2: 'PostgresQL',
		tech3: 'HTML'
	},
	{
		title: 'GAIA v2.0',
		description:
			'Android app built to use a RESTful API. Users make their own profile that calculates their carbon footprint. Users can complete challenges to decrease their carbon footprint.',
		imgSrc: '',
		href: '',
		github: 'https://github.com/einargudnig/GAIA-2.0',
		tech1: 'JAVA',
		tech2: 'RESTful API',
		tech3: 'Android Studio'
	},
	{
		title: 'Grade Checker',
		description:
			'Simple python scripts that logs in to my University of Iceland account to check if I have received my exam grades, if I have then it sends me an email.',
		imgSrc: '',
		href: '',
		github: 'https://github.com/einargudnig/gradeScraper',
		tech1: 'Python',
		tech2: 'Selenium',
		tech3: 'smtlib'
	},
	{
		title: 'NFL Pick-em',
		description:
			'Webservice for a NFL pick-em game. Gets the schedule from NFL, lets the user choose the winner. Has working authentication. Plan is to build a React or Typescript front end to work with his project.',
		imgSrc: '',
		href: '',
		github: 'https://github.com/einargudnig/nflWebService',
		tech1: 'NodeJS',
		tech2: 'PostgresQL',
		tech3: 'JWT'
	},
	{
		title: 'Personal Website 3.0',
		description: 'Again, some improvements. Moved from Gastby to Next, started to blog',
		imgSrc: '',
		href: '',
		github: 'https://github.com/einargudnig/next-homepage',
		tech1: 'Next',
		tech2: 'Markdown',
		tech3: 'SCSS'
	},
	{
		title: 'Personal wbsite 2.0',
		description:
			'Second version of my personal website. Little improvements, showing projects and more.',
		imgSrc: '',
		href: '',
		github: 'https://github.com/einargudnig/homepage2.0',
		tech1: 'Gatsby',
		tech2: 'graphQL',
		tech3: 'CSS'
	},
	{
		title: 'Personal website 1.0',
		description:
			'First version of my personal website. Nothing spectacular, just to buy domain and try things.',
		imgSrc: '',
		href: '',
		github: 'https://github.com/einargudnig/homePage',
		tech1: 'Gatsby',
		tech2: 'Heroku',
		tech3: 'Bootstrap'
	}
];

export default function ProjectsPage() {
	return (
		<section>
			<h1 className="font-bold text-3xl font-serif mb-5">Projects</h1>
			<div className="container py-12">
				<div className="flex flex-wrap -m-4">
					{projectsData.map((d) => (
						<ProjectsCard
							key={d.title}
							title={d.title}
							description={d.description}
							imgSrc={d.imgSrc}
							href={d.href}
							github={d.github}
							tech1={d.tech1}
							tech2={d.tech2}
							tech3={d.tech3}
						/>
					))}
				</div>
			</div>
		</section>
	);
}
