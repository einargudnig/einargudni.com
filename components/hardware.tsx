import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

export function Hardware() {
	return (
		<>
			<li>Ikea Bekant desk</li>
			<li>14&quot; Macbook Pro M1 Max 64GB 1TB</li>
			<li>
				<HoverCard>
					<HoverCardTrigger>Keychron Q8 Pro</HoverCardTrigger>
					<HoverCardContent>Image!</HoverCardContent>
				</HoverCard>
			</li>
			<li>Nuphy Halo 65</li>
			<li>27&quot; Asus monitor</li>
			<li>Logitech MX Master 3 Mouse</li>
			<li>Apple Magic Trackpad</li>
			<li>Keychron K3</li>
			<li>Ikea Styrspel chair</li>
			<li>Twelve South Curve flex</li>
		</>
	);
}
