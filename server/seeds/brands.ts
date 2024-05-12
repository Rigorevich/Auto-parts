import axios from 'axios';
import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

export type Brand = { name: string };

const pgp = pgPromise();
const db = pgp({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

async function seedBrandsTable() {
  try {
    const response = await axios.get('https://www.carqueryapi.com/api/0.3/?cmd=getMakes');
    const brands: Brand[] = response.data.Makes.map((make: { make_display: string }) => ({
      name: make.make_display,
    }));

    await db.tx(async (t) => {
      const queries = brands.map((brand) => t.none('INSERT INTO brands (name) VALUES ($1)', [brand.name]));
      await t.batch(queries);
    });

    console.log('Seed data inserted successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    pgp.end();
  }
}

seedBrandsTable();
