// components/LifeWeeks.tsx
import React from 'react';

interface Props {
	weeksPassed: number;
}

const TOTAL_WEEKS = 5200;

const LifeWeeks: React.FC<Props> = ({ weeksPassed }) => {
	return (
		<div>
			<div className="grid grid-cols-27 md:grid-cols-52 gap-1">
				{Array.from({ length: TOTAL_WEEKS }).map((_, index) => (
					<div
						key={index}
						className={`w-2 h-2 ${
							index < weeksPassed
								? 'border border-neutral-100 bg-neutral-100'
								: 'border border-neutral-100'
						}`}
					></div>
				))}
			</div>
		</div>
	);
};

export default LifeWeeks;
