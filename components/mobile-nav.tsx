'use client';

import * as React from 'react';

import { cn } from '@/utils/utils';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger
} from '@/components/ui/navigation-menu';

export function MobileNav() {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>navigation</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className=" gap-3 p-2 md:w-[400px] lg:w-[500px]">
							<ListItem href="/" title="home" />
							<ListItem href="/blog" title="writing" />
							<ListItem href="/uses" title="uses" />
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
}

const ListItem = React.forwardRef<React.ElementRef<'a'>, React.ComponentPropsWithoutRef<'a'>>(
	({ className, title, children, ...props }, ref) => {
		return (
			<li>
				<NavigationMenuLink asChild>
					<a
						ref={ref}
						className={cn(
							'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
							className
						)}
						{...props}
					>
						<div className="text-sm font-medium leading-none">{title}</div>
						<p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
							{children}
						</p>
					</a>
				</NavigationMenuLink>
			</li>
		);
	}
);
ListItem.displayName = 'ListItem';
