import { Badge } from './ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';

interface Props {
	title: string;
	description: string;
	tags: readonly string[];
	link?: string;
}

export function ProjectCard({ title, description, tags, link }: Props) {
	return (
		<Card className="flex flex-col overflow-hidden border border-muted p-3">
			<CardHeader className="">
				<div className="space-y-1">
					<CardTitle className="text-base">
						{link ? (
							<a
								href={link}
								target="_blank"
								rel="noreferrer"
								className="inline-flex items-center gap-1 hover:underline"
							>
								<span className="h-1 w-1 rounded-full bg-green-500"></span>
								{title}
							</a>
						) : (
							title
						)}
					</CardTitle>
					<div className="hidden font-mono text-xs underline print:visible">
						{link?.replace('https://', '').replace('www.', '').replace('/', '')}
					</div>
					<CardDescription className="font-mono text-xs text-foreground">
						{description}
					</CardDescription>
				</div>
			</CardHeader>
			<CardContent className="mt-auto flex">
				<div className="mt-2 flex flex-wrap gap-1">
					{tags.map((tag) => (
						<Badge className="px-1 py-0 text-[10px]" variant="outline" key={tag}>
							{tag}
						</Badge>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
