import { ProjectCard } from '@/components/project-card';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Section } from '@/components/ui/section';
import { RESUME_DATA } from '@/data/resume-data';
import { GlobeIcon } from 'lucide-react';
import { Metadata } from 'next';

import { Link } from 'next-view-transitions';
// import { EmailSignUp } from '@/components/email-signup';

export const metadata: Metadata = {
	title: `${RESUME_DATA.name} | ${RESUME_DATA.about}`,
	description: RESUME_DATA.summary
};

export default function Page() {
	return (
		<>
			<section className="mx-auto w-full max-w-2xl space-y-8 print:space-y-6">
				<div className="flex items-center justify-between">
					<div className="flex-1 space-y-1.5">
						<h1 className="md:text-3xl font-bold">{RESUME_DATA.name}</h1>
						<p className="flex max-w-md text-md text-foreground">
							{/* {RESUME_DATA.about} */}
							<p className="italics font-bold">Curious</p>, Coder, Triplet,&nbsp;
							<p className="italics font-bold">Tinkerer</p>, Late bloomer & Nerd
						</p>
						<p className="max-w-md items-center text-pretty font-mono text-xs text-muted-foreground">
							<a
								className="inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
								href={RESUME_DATA.locationLink}
								target="_blank"
								rel="noreferrer"
							>
								<GlobeIcon className="h-3 w-3" />
								{RESUME_DATA.location}
							</a>
						</p>
					</div>

					{/* <Avatar className="h-20 w-20 md:h-28 md:w-28">
						<AvatarImage alt={RESUME_DATA.name} src={RESUME_DATA.avatarUrl} />
						<AvatarFallback>{RESUME_DATA.initials}</AvatarFallback>
					</Avatar> */}
				</div>
				<Section>
					<div className="flex items-center justify-between">
						<div className="group">
							<Link href="/about" className="group-hover:underline text-lg">
								About
							</Link>
							<p className="text-muted-foreground group-hover:underline">
								Who, What, Why
							</p>
						</div>
						<div className="group">
							<Link href="/now" className="group-hover:underline text-lg">
								Now
							</Link>
							<p className="text-muted-foreground group-hover:underline">
								Short-term focus
							</p>
						</div>
						<div className="group">
							<Link href="/someday" className="group-hover:underline text-lg">
								Someday
							</Link>
							<p className="text-muted-foreground group-hover:underline">
								Long-term focus
							</p>
						</div>
					</div>
				</Section>
				{/* <Section>
					<h2 className="text-xl font-bold">About</h2>
					<p className="text-pretty font-mono text-sm text-foreground">
						{RESUME_DATA.summary}
					</p>
				</Section> */}
				{/* <Section>
					<Card>
						<div className="p-3">
							<h2 className="text-xl font-bold">Triple Three</h2>
							<div className="text-pretty font-mono text-sm text-foreground mb-4">
								<p>
									Subscribe to&nbsp;
									<span className="underline text-cyan-300">triple three</span>
									&nbsp; and never miss a beat! Receive monthly updates packed
									with three fascinating facts, tips, or trends from each
									category. Let&apos;s embark on a knowledge-filled journey
									together!
								</p>
							</div>
							<EmailSignUp />
						</div>
					</Card>
				</Section> */}

				<Section>
					<h2 className="text-xl font-bold">Work Experience</h2>
					{RESUME_DATA.work.map((work) => {
						return (
							<Card key={work.company}>
								<CardHeader>
									<div className="flex items-center justify-between gap-x-2 text-base">
										<h3 className="inline-flex items-center justify-center gap-x-1 font-semibold leading-none">
											<a className="hover:underline" href={work.link}>
												{work.company}
											</a>

											<span className="inline-flex gap-x-1">
												{work.badges.map((badge) => (
													<Badge
														variant="secondary"
														className="align-middle text-xs"
														key={badge}
													>
														{badge}
													</Badge>
												))}
											</span>
										</h3>
										<div className="text-sm tabular-nums text-muted-foreground">
											{work.start} - {work.end}
										</div>
									</div>

									<h4 className="font-mono text-sm leading-none">{work.title}</h4>
								</CardHeader>
								<CardContent className="mt-2 text-xs">
									{work.description}
								</CardContent>
								<CardFooter>
									<div className="mt-2 flex flex-wrap gap-1">
										{work.stack.map((tag) => (
											<Badge
												className="p-1 text-[10px]"
												variant="outline"
												key={tag}
											>
												{tag}
											</Badge>
										))}
									</div>
								</CardFooter>
							</Card>
						);
					})}
				</Section>
				<Section>
					<h2 className="text-xl font-bold">Education</h2>
					{RESUME_DATA.education.map((education) => {
						return (
							<Card key={education.school}>
								<CardHeader>
									<div className="flex items-center justify-between gap-x-2 text-base">
										<h3 className="font-semibold leading-none">
											{education.school}
										</h3>
										<div className="text-sm tabular-nums text-muted-foreground">
											{education.start} - {education.end}
										</div>
									</div>
								</CardHeader>
								<CardContent className="mt-2">{education.degree}</CardContent>
							</Card>
						);
					})}
				</Section>

				<Section className="print-force-new-page scroll-mb-16">
					<h2 className="text-xl font-bold">Projects</h2>
					<div className="-mx-3 grid grid-cols-1 gap-3 print:grid-cols-3 print:gap-2 md:grid-cols-2 lg:grid-cols-3">
						{RESUME_DATA.projects.map((project) => {
							return (
								<ProjectCard
									key={project.title}
									title={project.title}
									description={project.description}
									tags={project.techStack}
									link={'link' in project ? project.link.href : undefined}
								/>
							);
						})}
					</div>
				</Section>
			</section>
		</>
	);
}
