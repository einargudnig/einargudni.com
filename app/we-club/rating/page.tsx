import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table';

const Rating = () => {
	return (
		<div>
			<h2 className="font-bold text-3xl font-serif mb-5">Wine Enthusiastics - rating</h2>
			<div className="mt-4">
				<h3 className="font-bold text-xl font-serif mb-5">Imperial - 2015 @David</h3>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Name</TableHead>
							<TableHead className="text-right">Rating</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">Einar</TableCell>
							<TableCell className="text-right">4.5</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Gardar</TableCell>
							<TableCell className="text-right">4.0</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">David</TableCell>
							<TableCell className="text-right">3.4</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Eyjo</TableCell>
							<TableCell className="text-right">4.5</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Danni</TableCell>
							<TableCell className="text-right">4.1</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>

			<div className="mt-4">
				<h3 className="font-bold text-xl font-serif mb-5">1000 stories - 2021 @Einar</h3>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Name</TableHead>
							<TableHead className="text-right">Rating</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">Einar</TableCell>
							<TableCell className="text-right">2.8</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Gardar</TableCell>
							<TableCell className="text-right">4.0</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">David</TableCell>
							<TableCell className="text-right">3.0</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Eyjo</TableCell>
							<TableCell className="text-right">3.7</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Danni</TableCell>
							<TableCell className="text-right">4.2</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>

			<div className="mt-4">
				<h3 className="font-bold text-xl font-serif mb-5">Montecillo - 2019 @Danni</h3>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Name</TableHead>
							<TableHead className="text-right">Rating</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">Einar</TableCell>
							<TableCell className="text-right">4.5</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Gardar</TableCell>
							<TableCell className="text-right">3.9</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">David</TableCell>
							<TableCell className="text-right">3.5</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Eyjo</TableCell>
							<TableCell className="text-right">4.0</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Danni</TableCell>
							<TableCell className="text-right">4.2</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>

			<div className="mt-4">
				<h3 className="font-bold text-xl font-serif mb-5">Girlan - 2021 @Eyjo</h3>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Name</TableHead>
							<TableHead className="text-right">Rating</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">Einar</TableCell>
							<TableCell className="text-right">2.9</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Gardar</TableCell>
							<TableCell className="text-right">2.9</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">David</TableCell>
							<TableCell className="text-right">2.8</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Eyjo</TableCell>
							<TableCell className="text-right">3.3</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Danni</TableCell>
							<TableCell className="text-right">3.4</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>

			<div>
				<h3 className="font-bold text-xl font-serif mb-5">
					Triviento Malbec - 2020 @Gardar
				</h3>
				<Table>
					<TableHeader>
						<TableRow className="mt-4">
							<TableHead className="w-[100px]">Name</TableHead>
							<TableHead className="text-right">Rating</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">Einar</TableCell>
							<TableCell className="text-right">3.1</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Gardar</TableCell>
							<TableCell className="text-right">3.7</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">David</TableCell>
							<TableCell className="text-right">3.7</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Eyjo</TableCell>
							<TableCell className="text-right">4.3</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Danni</TableCell>
							<TableCell className="text-right">4.1</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>

			<div>
				<h3 className="font-bold text-xl font-serif mb-5">
					Cum Laude - 2020 @Gardar -&gt; Extra wine
				</h3>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[100px]">Name</TableHead>
							<TableHead className="text-right">Rating</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<TableRow>
							<TableCell className="font-medium">Einar</TableCell>
							<TableCell className="text-right">3.6</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Gardar</TableCell>
							<TableCell className="text-right">4.1</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">David</TableCell>
							<TableCell className="text-right">4.1</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Eyjo</TableCell>
							<TableCell className="text-right">3.8</TableCell>
						</TableRow>
						<TableRow>
							<TableCell className="font-medium">Danni</TableCell>
							<TableCell className="text-right">DNF</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	);
};

export default Rating;
