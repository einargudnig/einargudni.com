import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import Image from 'next/image';

export function Hardware() {
	return (
		<>
			<li>Ikea Bekant desk</li>
			<li>14&quot; Macbook Pro M1 Max 64GB 1TB</li>
			<li>
				<HoverCard>
					<HoverCardTrigger>Keychron Q8 Pro</HoverCardTrigger>
					<HoverCardContent>
						<Image
							src={'/images/uses/hardware/Q8-Pro-2.webp'}
							alt="Keychron Q8 Pro"
							width={800}
							height={800}
							className="rounded-md"
						/>
						<ul>
							<li>Gateron K-Pro Banana</li>
							<li>Foam upgrades (sound absorbing foam + PE foam)</li>
							<li>Alice layout</li>
							<li>65%</li>
						</ul>
					</HoverCardContent>
				</HoverCard>
			</li>
			<li>
				<HoverCard>
					<HoverCardTrigger>Nuphy Halo 65</HoverCardTrigger>
					<HoverCardContent>
						<Image
							src={'/images/uses/hardware/nuphy.webp'}
							alt="Nuphy Halo 65"
							width={800}
							height={800}
							className="rounded-md"
						/>
						<ul>
							<li>Baby Kangaroo switch</li>
							<li>65%</li>
						</ul>
					</HoverCardContent>
				</HoverCard>
			</li>
			<li>27&quot; Asus monitor</li>
			<li>Logitech MX Master 3 Mouse</li>
			<li>Apple Magic Trackpad</li>
			<li>Keychron K3</li>
			<li>Ikea Styrspel chair</li>
			<li>Twelve South Curve flex</li>
		</>
	);
}
