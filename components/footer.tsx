import { RESUME_DATA } from '@/data/resume-data';
import { MailIcon } from 'lucide-react';
import { Button } from './ui/button';

export default function Footer() {
	return (
		<footer className="mx-auto w-full max-w-2xl space-y-8 print:space-y-6">
			<div className="flex justify-between items-center py-8 text-sm text-muted-foreground">
				<div>
					<p>Don&apos;t half ass it</p>
				</div>
				<div className="flex gap-x-1 pt-1 font-mono text-sm text-foreground print:hidden">
					{RESUME_DATA.contact.email ? (
						<Button className="h-8 w-8" variant="outline" size="icon" asChild>
							<a href={`mailto:${RESUME_DATA.contact.email}`}>
								<MailIcon className="h-4 w-4" />
							</a>
						</Button>
					) : null}
					{RESUME_DATA.contact.social.map((social) => (
						<Button
							key={social.name}
							className="h-8 w-8"
							variant="outline"
							size="icon"
							asChild
						>
							<a href={social.url}>
								<social.icon className="h-4 w-4" />
							</a>
						</Button>
					))}
				</div>
				<div className="hidden flex-col gap-x-1 font-mono text-sm text-muted-foreground print:flex">
					{RESUME_DATA.contact.email ? (
						<a href={`mailto:${RESUME_DATA.contact.email}`}>
							<span className="underline">{RESUME_DATA.contact.email}</span>
						</a>
					) : null}
					{/* {RESUME_DATA.contact.tel ? (
								<a href={`tel:${RESUME_DATA.contact.tel}`}>
									<span className="underline">{RESUME_DATA.contact.tel}</span>
								</a>
							) : null} */}
				</div>
			</div>
		</footer>
	);
}
