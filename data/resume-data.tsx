import { GitHubIcon } from '@/components/icons/GitHubIcon';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { XIcon } from '@/components/icons/XIcon';

export const RESUME_DATA = {
	name: 'Einar Gudni Gudjonsson',
	initials: 'EGG',
	location: 'Reykjavik, Iceland, CET',
	locationLink: 'https://www.google.com/maps/place/Reykjavík',
	about: 'Coder, Crossfitter, Coffee and wine enthusiast, Curoious, Late bloomer, Nerd',
	summary:
		'This is my home on the internet 👋🏼. I want it to be simple, but I want to use it as my playground. I like to follow my curiosity so this will be a organised mess!',
	// 'I am trying my best to improve a little bit every day. I am super courious and love to be a little nerd. I think there are so many things to being a good engineer other than just code. A well designed product is a product that is easy to use',
	// avatarUrl: 'https://avatars.githubusercontent.com/u/1017620?v=4',
	avatarUrl: 'https://avatars.githubusercontent.com/u/17381009?v=4',
	personalWebsiteUrl: 'https://einargudni.com',
	contact: {
		email: 'einargudni"ggmail.com',
		tel: '+3548474601',
		social: [
			{
				name: 'GitHub',
				url: 'https://github.com/einargudnig',
				icon: GitHubIcon
			},
			{
				name: 'LinkedIn',
				url: 'https://www.linkedin.com/in/einargudnig/',
				icon: LinkedInIcon
			},
			{
				name: 'X',
				url: 'https://x.com/einargudni',
				icon: XIcon
			}
		]
	},
	education: [
		{
			school: 'University of Iceland',
			degree: "Bachelor's Degree in Computer Science",
			start: '2016',
			end: '2020'
		}
	],
	work: [
		{
			company: 'Maul',
			link: 'https://maul.is',
			badges: [],
			title: 'Full Stack Developer',
			logo: '',
			start: '2020',
			end: 'Present',
			description:
				'Helped building and growing from delivering 2500 courses weekly to 8000. Build a lot of new features and helped implement various systems. Technologies: React, Tailwind, AWS'
		},
		{
			company: 'Tiffin',
			link: 'https://tiffin.dk',
			badges: ['Remote'],
			title: 'Full Stack Developer',
			logo: '',
			start: '2022',
			end: 'Present',
			description:
				'Helped take the product from 0 to 1. Built the first version of the product, implemented new features, and more.'
		},
		{
			company: 'Gigover',
			link: 'https://bsgroup.eu/',
			badges: ['Free Lance'],
			title: 'Front end Developer',
			logo: '',
			start: '2022',
			end: 'Present',
			description:
				'Continued development of the Gigover platform. Built new features like a procurement system and property management. Technologies: React, TypeScript, GraphQL'
		}
	],
	skills: [
		'JavaScript',
		'TypeScript',
		'React/Next.js/Remix',
		'Tailwind',
		'Chakra-Ui',
		'Node.js',
		'AWS'
	],
	projects: [
		{
			title: 'Oktoberfest 22',
			techStack: ['Side Project', 'TypeScript', 'Next.js', 'TailwindCSS'],
			description: 'A small web app to count drinks during Oktoberfest 2022',
			logo: '',
			link: {
				label: 'oktoberfest22.vercel.app',
				href: 'https://oktoberfest22.vercel.app/'
			}
		},
		{
			title: 'learning.einargudni',
			techStack: ['Side Project', 'TypeScript', 'Remix', 'Prisma', 'In progress'],
			description: 'My learning journal. Built with Remix and Prisma',
			logo: ''
			// link: {
			// 	label: 'learning.einargudni.com',
			// 	href: 'https://learning.einargudni.com/'
			// }
		},
		{
			title: 'einargudni.com',
			techStack: ['Side Project', 'Next.js', 'MDX'],
			description: 'My personal website and blog. Built with Next.js',
			logo: '',
			link: {
				label: 'github.com',
				href: 'https://einargudni.com/'
			}
		},
		{
			title: 'Course grader',
			techStack: ['Side Project', 'React', 'Firebase', 'Material-UI'],
			description: 'A simple web app to grade courses in University of Iceland',
			logo: ''
		},
		{
			title: 'Reboot hack',
			techStack: ['Volunteer', 'React', 'PostgreSQL', 'Bootstrap'],
			description: 'Registration site for Reboot hack, a student driven hackathon in Iceland',
			logo: ''
		},
		{
			title: 'Grade checker',
			techStack: ['Side Project', 'Ptyhon'],
			description: 'Sends you an email when your grade is published',
			logo: ''
		}
	]
} as const;
