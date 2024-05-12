import axios from 'axios';
import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

export type Brand = { id: number; name: string };

const pgp = pgPromise();
const db = pgp({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

async function seedModelsTable() {
  try {
    const brands: Brand[] = await db.any('SELECT * FROM brands');

    const modelPromises = brands.map(async (brand) => {
      const response = await axios.get(
        `https://www.carqueryapi.com/api/0.3/?cmd=getModels&make=${brand.name}`,
      );
      const models = response.data.Models.map((model) => ({
        brandId: brand.id,
        name: model.model_name,
      }));

      await db.tx(async (t) => {
        const queries = models.map((model) =>
          t.none('INSERT INTO models (brand_id, name) VALUES ($1, $2) ON CONFLICT (name) DO NOTHING', [
            model.brandId,
            model.name,
          ]),
        );
        await t.batch(queries);
      });
    });

    await Promise.all(modelPromises);

    console.log('Seed data inserted into models table successfully!');
  } catch (error) {
    console.error('Error seeding models table:', error);
    throw error;
  } finally {
    pgp.end();
  }
}

seedModelsTable();
