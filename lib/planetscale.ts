import { Generated, Kysely } from 'kysely';
import { PlanetScaleDialect } from 'kysely-planetscale';


interface ViewsTable {
  slug: string;
  count: number;
}

interface Location {
  city: string;
  region: string;
}

interface Database {
  views: ViewsTable;
  location: Location;
}

export const queryBuilder = new Kysely<Database>({
  dialect: new PlanetScaleDialect({
    url: process.env.DATABASE_URL,
  }),
});