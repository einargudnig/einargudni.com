'use client';

import { MouseEvent } from 'react';
import { motion, useMotionValue, useMotionTemplate } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { HobbiesIcon } from '../icons';

export default function CuriosityButton() {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
		// @ts-ignore
		const rect = (currentTarget as HTMLElement).getBoundingClientRect();

		mouseX.set(clientX - rect.left);
		mouseY.set(clientY - rect.top);
	}
	return (
		<div
			className="group relative h-90 p-4 border border-gray-200 rounded-md shadow-md max-w-md mx-auto"
			onMouseMove={handleMouseMove}
		>
			<motion.div
				className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
				style={{
					background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(90, 119, 131, 0.15),
              transparent 80%
            )
          `
				}}
			/>
			<Link href={'/curiosity'} className="flex items-center justify-center">
				<div>
					<Image
						src="/images/curiosity.png"
						alt="curiosity"
						className="rounded-lg grayscale"
						width={350}
						height={100}
					/>
					<div className="flex flex-row mx-auto mt-6">
						<HobbiesIcon />
						<p className="ml-2">curiosity</p>
					</div>
				</div>
			</Link>
		</div>
	);
}
