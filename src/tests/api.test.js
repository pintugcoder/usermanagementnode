const request = require('supertest');
const app = require('../../index.js'); // 
const { Pool } = require('pg');

describe('Test the User API', () => {
  let pool;

  beforeAll(() => {
    pool = new Pool({
      connectionString: 'postgres://postgres:SpaccePassword@123@localhost:5432/usermanagementtest'
    });
  });

  afterAll(async () => {
    await pool.end();
  });

  beforeEach(async () => {
    // Create a test table
    await pool.query(`
    CREATE TABLE IF NOT EXISTS public.users (
        user_id serial PRIMARY KEY,
        username VARCHAR ( 50 ) UNIQUE NOT NULL,
        firstname VARCHAR (30) NOT NULL,
        lastname VARCHAR (30) ,
        password VARCHAR ( 50 ) NOT NULL,
        email VARCHAR ( 255 ) UNIQUE NOT NULL
    );
    `);

    // Insert test data
    await pool.query(`
    INSERT INTO public.users(username, firstname, lastname, password, email)
	VALUES ('user12341', 'abc1', 'bcd1', '12341', 'abc@abc.com1');
    `);
  });

  afterEach(async () => {
    // Delete test data
    await pool.query(`
      DELETE FROM public.users
    `);

    // Drop the test table
    await pool.query(`
      DROP TABLE IF EXISTS public.users
    `);
  });

  test('GET /users should return users data', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].firstname).toBe('abc1');
    // expect(response.body[1].firstname).toBe('test2');
    // expect(response.body[2].firstname).toBe('test3');
  });
});
