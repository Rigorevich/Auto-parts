// @ts-nocheck
import pgPromise from 'pg-promise';
import dotenv from 'dotenv';

dotenv.config();

const pgp = pgPromise();
const db = pgp({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.statusText}`);
  }
  return response.json();
}

async function insertData(table, data, columns) {
  if (data.length === 0) {
    console.log(`No data to insert into ${table}`);
    return;
  }

  const columnSet = new pgp.helpers.ColumnSet(columns, { table });
  const query = pgp.helpers.insert(data, columnSet) + ` ON CONFLICT DO NOTHING`;
  await db.none(query);
}

async function insertBrands() {
  const brands = await fetchJson('https://api.av.by/offer-types/cars/modifications-catalog/brands');
  console.log('Fetched brands:', brands.length);

  await insertData('car_brands', brands, ['id', 'name']);
  console.log('Inserted brands');
}

async function insertModels() {
  const brands = await db.any('SELECT id FROM car_brands');
  for (const brand of brands) {
    const models = await fetchJson(
      `https://api.av.by/offer-types/cars/modifications-catalog/brands/${brand.id}/models`,
    );
    console.log(`Fetched models for brand ${brand.id}:`, models.length);

    await insertData(
      'models',
      models.map((model) => ({ ...model, brand_id: brand.id })),
      ['id', 'name', 'brand_id'],
    );
    console.log(`Inserted models for brand ${brand.id}`);
  }
}

async function insertGenerations() {
  const models = await db.any('SELECT id FROM models');
  for (const model of models) {
    const generations = await fetchJson(
      `https://api.av.by/offer-types/cars/modifications-catalog/models/${model.id}/generations`,
    );
    console.log(`Fetched generations for model ${model.id}:`, generations.length);

    await insertData(
      'generations',
      generations.map((gen) => ({
        id: gen.id,
        name: gen.name,
        year_start: gen.yearFrom,
        year_end: gen.yearTo,
        model_id: model.id,
      })),
      ['id', 'name', 'year_start', 'year_end', 'model_id'],
    );
    console.log(`Inserted generations for model ${model.id}`);
  }
}

async function insertModifications() {
  const generations = await db.any('SELECT id FROM generations');
  for (const generation of generations) {
    const modifications = await fetchJson(
      `https://api.av.by/offer-types/cars/modifications-catalog/generations/${generation.id}/modifications`,
    );
    console.log(`Fetched modifications for generation ${generation.id}:`, modifications.length);

    await insertData(
      'modifications',
      modifications.map((mod) => ({
        id: mod.id,
        name: mod.name,
        generation_id: generation.id,
        body_type: mod.bodyType.name,
        engine: mod.engineTypeNew.label,
      })),
      ['id', 'name', 'generation_id', 'body_type', 'engine'],
    );
    console.log(`Inserted modifications for generation ${generation.id}`);
  }
}

async function seedDatabase() {
  try {
    await insertBrands();
    await insertModels();
    await insertGenerations();
    await insertModifications();
    console.log('Seed data inserted successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    pgp.end();
  }
}

seedDatabase();
