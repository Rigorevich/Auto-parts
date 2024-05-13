import pgPromise from 'pg-promise';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { faker } from '@faker-js/faker/locale/ru';

dotenv.config();

export type Account = {
  name: string;
  surname: string;
  phone_number: string;
  email: string;
  password: string;
  role: number;
  status: number;
};

const pgp = pgPromise();
const db = pgp({
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  database: process.env.DB_NAME,
});

export function createRandomUser(): Account {
  return {
    name: faker.person.firstName(),
    surname: faker.person.lastName(),
    email: faker.internet.email(),
    phone_number: faker.phone.number(),
    password: bcrypt.hashSync(faker.internet.password(), 10),
    role: faker.number.int({ min: 1, max: 3 }),
    status: faker.number.int({ min: 1, max: 3 }),
  };
}

async function seedAccountsTable() {
  try {
    const accounts: Account[] = faker.helpers.multiple(createRandomUser, {
      count: 25,
    });

    await db.tx(async (t) => {
      const queries = accounts.map((account) =>
        t.none(
          'INSERT INTO accounts (name, surname, phone_number, email, password, role, status) VALUES ($1, $2, $3, $4, $5, $6, $7)',
          [
            account.name,
            account.surname,
            account.phone_number,
            account.email,
            account.password,
            account.role,
            account.status,
          ],
        ),
      );
      await t.batch(queries);
    });

    console.log('Seed data inserted successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  } finally {
    pgp.end();
  }
}

seedAccountsTable();
