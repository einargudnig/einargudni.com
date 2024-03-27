import { Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';

interface ViewsTable {
	slug: string;
	count: number;
}

interface Location {
	city: string;
	region: string;
}

interface Uses {
	type: string;
	count: number;
}

interface WineUsers {
	name: string;
}

// interface Wines {
// 	wine_id: number;
// 	name: string;
// 	year: number;
// 	country: string;
// 	grapes: string;
// }

interface Database {
	views: ViewsTable;
	location: Location;
	uses: Uses;
	wineusers: WineUsers;
	// wines: Wines;
}

export const queryBuilder = new Kysely<Database>({
	dialect: new PlanetScaleDialect({
		url: process.env.DATABASE_URL
	})
});
