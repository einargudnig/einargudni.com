'use client';

import * as React from 'react';

import {
	CommandDialog,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandSeparator
} from '@/components/ui/command';

interface Props {
	links: { url: string; title: string }[];
}

export const CommandMenu = ({ links }: Props) => {
	const [open, setOpen] = React.useState(false);

	React.useEffect(() => {
		const down = (e: KeyboardEvent) => {
			// @ts-ignore
			if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				// disable-eslint-next-line
				setOpen((open) => !open);
			}
		};
		// @ts-ignore
		document.addEventListener('keydown', down);
		// @ts-ignore
		return () => document.removeEventListener('keydown', down);
	}, []);

	return (
		<>
			<p className="fixed bottom-0 left-0 right-0 border-t border-t-muted p-1 text-center text-sm text-muted-foreground print:hidden">
				Press{' '}
				<kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
					<span className="text-xs">⌘</span>K
				</kbd>{' '}
				to open the command menu
			</p>
			<CommandDialog open={open} onOpenChange={setOpen}>
				<CommandInput placeholder="Type a command or search..." />
				<CommandList>
					<CommandEmpty>No results found.</CommandEmpty>
					<CommandGroup heading="Links">
						{links.map(({ url, title }) => (
							<CommandItem
								key={url}
								onSelect={() => {
									setOpen(false);
									// @ts-ignore
									window.open(url, '_blank');
								}}
							>
								<span>{title}</span>
							</CommandItem>
						))}
					</CommandGroup>
					<CommandSeparator />
						<CommandGroup heading="Actions">
						<CommandItem
							onSelect={() => {
								setOpen(false);
								// @ts-ignore
								window.print();
							}}
						>
							<span>Print</span>
						</CommandItem>
					</CommandGroup>
					<CommandSeparator />
				</CommandList>
			</CommandDialog>
		</>
	);
};
