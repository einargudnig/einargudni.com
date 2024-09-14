import { GitHubIconOutline, InstagramIcon } from '@/components/icons';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { XIcon } from '@/components/icons/XIcon';

export const RESUME_DATA = {
	name: 'Einar Gudni',
	initials: 'EG',
	location: 'Reykjavik, Iceland, CET',
	locationLink: 'https://www.google.com/maps/place/Reykjavík',
	about: 'Curious, Coder, Crossfitter, Coffee and wine hobbyist, Late bloomer & Nerd',
	summary:
		'Hello 👋🏼. This is my home on the internet 🏡. I want it to be simple, but I want to use it as my playground. I like to follow my curiosity so this will be a organised mess!',
	// 'I am trying my best to improve a little bit every day. I am super courious and love to be a little nerd. I think there are so many things to being a good engineer other than just code. A well designed product is a product that is easy to use',
	avatarUrl: 'https://avatars.githubusercontent.com/u/17381009?v=4',
	personalWebsiteUrl: 'https://einargudni.com',
	contact: {
		email: 'einargudnig@gmail.com',
		social: [
			{
				name: 'GitHub',
				url: 'https://github.com/einargudnig',
				icon: GitHubIconOutline
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
			},
			{
				name: 'Instagram',
				url: 'https://www.instagram.com/einargudni/',
				icon: InstagramIcon
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
			description: `Helped building and growing from delivering 2500 courses weekly to 8000. Built a lot of new features and helped improve current features.
				 Improved our internal tools, took part in rewriting our router, more.
				 Helped with architecture and design of data models and systems.
				`,
			stack: ['React', 'Tailwind', 'AWS']
		},
		{
			company: 'Tiffin',
			link: 'https://tiffin.dk',
			badges: ['Remote'],
			title: 'Full Stack Developer',
			logo: '',
			start: '2022',
			end: 'Present',
			description: `Helped take the product from 0 to 1. Built the first version of the product, implemented new features, and more.
				 Spent time in Copenhagen to help with integration of system, solve ad-hoc problems and more.
				`,
			stack: ['React', 'Tailwind', 'AWS']
		},
		{
			company: 'Contractor',
			link: 'https://einargudni.com',
			badges: ['Remote'],
			title: 'Front end Developer',
			logo: '',
			start: '2022',
			end: 'Present',
			description:
				'I am always open for exiting projects. Reach out if you need help, consulting, or someone to try out the thing you are building.',
			stack: [
				'JavaScript',
				'TypeScript',
				'React/Next.js/Remix',
				'Tailwind',
				'Chakra-Ui',
				'Node.js',
				'AWS'
			]
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
			title: 'einargudni.com',
			techStack: ['Next.js', 'Tailwind'],
			description: 'My home on the internet, trying to make it simple as can be',
			logo: '',
			link: {
				label: 'einargudni.com',
				href: 'https://einargudni.com/'
			}
		},
		{
			title: 'my writing',
			techStack: ['TypeScript', 'Astro', 'Tailwind'],
			description: 'A place to dump my writings, thoughts and ideas',
			logo: '',
			link: {
				label: 'writing.einargudni.com',
				href: 'https://writing.einargudni.com/'
			}
		},
		{
			title: 'craft',
			techStack: ['TypeScript', 'Next', 'Tailwind'],
			description: 'A place to craft and tinker',
			logo: '',
			link: {
				label: 'craft.einargudni.com',
				href: 'https://craft.einargudni.com/'
			}
		},
		{
			title: 'my learnings',
			techStack: ['TypeScript', 'Remix', 'Tailwind'],
			description: 'Everything interesting, weird and cool I find goes here when I remember',
			logo: '',
			link: {
				label: 'curiosity.einargudni.com',
				href: 'https://remix-workbook.fly.dev/'
			}
		},
		{
			title: 'Gigover',
			techStack: ['TypeScript', 'React', 'Chakra-Ui'],
			description: 'Software to be used for construction work',
			logo: '',
			link: {
				label: 'gigover.com',
				href: 'https://gigover.com/'
			}
		},
		{
			title: 'Oktoberfest 22',
			techStack: ['TypeScript', 'Next.js', 'Tailwind'],
			description: 'A small web app to count drinks during Oktoberfest 2022',
			logo: '',
			link: {
				label: 'git repo',
				href: 'https://github.com/einargudnig/oktoberfest22'
			}
		},
		{
			title: 'Course grader',
			techStack: ['React', 'Firebase', 'Material-UI'],
			description: 'A simple web app to grade courses in University of Iceland',
			logo: '',
			link: {
				label: 'git repo',
				href: 'https://github.com/einargudnig/courseAdvisor'
			}
		},
		{
			title: 'Reboot hack',
			techStack: ['React', 'PostgreSQL', 'Bootstrap'],
			description: 'Registration site for Reboot hack, a student driven hackathon in Iceland',
			logo: ''
		},
		{
			title: 'Grade checker',
			techStack: ['Python'],
			description: 'Sends you an email when your grade is published',
			logo: ''
		}
	]
} as const;
