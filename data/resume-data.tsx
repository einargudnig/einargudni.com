import { GitHubIcon } from '@/components/icons/GitHubIcon';
import { LinkedInIcon } from '@/components/icons/LinkedInIcon';
import { XIcon } from '@/components/icons/XIcon';

export const RESUME_DATA = {
	name: 'Einar Gudni Gudjonsson',
	initials: 'EGG',
	location: 'Reykjavik, Iceland, CET',
	locationLink: 'https://www.google.com/maps/place/Reykjavík',
	about: 'Full Stack Engineer focused on building products with extra attention to details',
	summary:
		'As a Full Stack Engineer, I have successfully taken multiple products from 0 to 1. I lead teams effectively, ensuring an environment where people can do their best work. Currently, I work mostly with TypeScript, React, Node.js, and GraphQL. I have over 8 years of experience in working remotely with companies all around the world.',
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
			badges: ['Remote'],
			title: 'Senior Full Stack Developer',
			logo: '',
			start: '2020',
			end: 'Present',
			description:
				'Implemented new features, led squad, worked on improving the way developers ship the code, started migration from Emotion to Tailwind CSS and more. Technologies: React, TypeScript, GraphQL'
		},
		{
			company: 'Tiffin',
			link: 'https://clevertech.biz',
			badges: ['Remote'],
			title: 'Lead Android Developer → Full Stack Developer',
			logo: '',
			start: '2022',
			end: 'Present',
			description:
				'Created Android mobile apps and led teams for companies like Vision Media, DKMS, or AAA. Built live streaming application for Evercast from scratch. Technologies: Android, Kotlin, React, TypeScript, GraphQL'
		},
		{
			company: 'Gigover',
			link: 'https://bsgroup.eu/',
			badges: [],
			title: 'Android Developer → Lead Android Developer',
			logo: '',
			start: '2012',
			end: '2015',
			description:
				'Built an Android team, created Android apps for biggest Polish companies like LOT, Polskie Radio, Agora, PolskaPress'
		},
		{
			company: '',
			link: 'https://www.nokia.com',
			badges: [],
			title: 'C/C++ Developer',
			logo: '',
			start: '2010',
			end: '2012',
			description: 'Creating and testing software for LTE base stations'
		}
	],
	skills: [
		'JavaScript',
		'TypeScript',
		'React/Next.js/Remix',
		'Node.js',
		'GraphQL',
		'Relay',
		'WebRTC'
	],
	projects: [
		{
			title: 'Consultly',
			techStack: ['Side Project', 'TypeScript', 'Next.js', 'Vite', 'GraphQL', 'WebRTC'],
			description: 'A platform to build and grow your online business',
			logo: '',
			link: {
				label: 'consultly.com',
				href: 'https://consultly.com/'
			}
		},
		{
			title: 'Monito',
			techStack: ['Side Project', 'TypeScript', 'Next.js', 'Browser Extension'],
			description: 'Browser extension that records everything happening in a web application',
			logo: '',
			link: {
				label: 'monito.dev',
				href: 'https://monito.dev/'
			}
		},
		{
			title: 'Jarocki.me',
			techStack: ['Side Project', 'Next.js', 'MDX'],
			description: 'My personal website and blog. Built with Next.js and Notion API',
			logo: '',
			link: {
				label: 'github.com',
				href: 'https://jarocki.me/'
			}
		},
		{
			title: 'Minimal',
			techStack: ['Side Project', 'Next.js', 'Puppeteer'],
			description: 'Minimalist calendars, habit trackers and planners generator',
			logo: '',
			link: {
				label: 'useminimal.com',
				href: 'https://useminimal.com/'
			}
		},
		{
			title: 'Barepapers',
			techStack: ['Side Project', 'Next.js', 'Puppeteer'],
			description: 'Generates beautiful wallpapers using random shapes and gradients',
			logo: '',
			link: {
				label: 'barepapers.com',
				href: 'https://barepapers.com/'
			}
		},
		{
			title: 'Year progress',
			techStack: ['Side Project', 'TypeScript', 'Next.js'],
			description: 'Tracks current year progress and displays a countdown',
			logo: '',
			link: {
				label: 'getyearprogress.com',
				href: 'https://getyearprogress.com/'
			}
		},
		{
			title: 'Parabol',
			techStack: ['Full Stack Developer', 'TypeScript', 'React', 'Node.js', 'GraphQL'],
			description:
				'The Agile meeting co-pilot that delivers better meetings with less effort',
			logo: '',
			link: {
				label: 'github.com',
				href: 'https://parabol.co/'
			}
		},
		{
			title: 'Evercast',
			techStack: ['Lead Frontend Developer', 'TypeScript', 'React', 'Node.js', 'GraphQL'],
			description:
				'Creative collaboration platform that combines video conferencing and HD media streaming',
			logo: '',
			link: {
				label: 'evercast.us',
				href: 'https://www.evercast.us/'
			}
		},
		{
			title: 'Mobile Vikings',
			techStack: ['Lead Android Developer', 'Android', 'Kotlin'],
			description: 'Android application for leading virtual mobile operator in Poland',
			logo: '',
			link: {
				label: 'mobilevikings.pl',
				href: 'https://mobilevikings.pl/'
			}
		},
		{
			title: 'Howdy',
			techStack: ['Lead Android Developer', 'Android', 'Kotlin'],
			description: 'Howdy is a place for you to join communities you care about',
			logo: '',
			link: {
				label: 'play.google.com',
				href: 'https://howdy.co/'
			}
		},
		{
			title: 'Tastycloud',
			techStack: ['Lead Android Developer', 'Android', 'Kotlin'],
			description:
				'Android application for managing and displaying restaurant menus in kiosk mode',
			logo: '',
			link: {
				label: 'tastycloud.fr',
				href: 'https://www.tastycloud.fr/'
			}
		},
		{
			title: 'Ambit',
			techStack: ['Lead Android Developer', 'Android', 'Kotlin'],
			description: 'Android application that helps with sharing your contact details',
			logo: ''
		},
		{
			title: 'Bim',
			techStack: ['Lead Android Developer', 'Android', 'Kotlin'],
			description: 'Android application that helps with booking a table in a restaurants',
			logo: ''
		},
		{
			title: 'Canal Digital GO',
			techStack: ['Lead Android Developer', 'Android', 'Kotlin'],
			description: 'Video streaming mobile application for Canal Digital subscribers',
			logo: ''
		}
	]
} as const;
