import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'omega_crm_db',
  password: '!KTKphine1',
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const db = {
  query: async(text, params, callback) => {
    let client;
    try {
      client = pool.connect();
      console.log('Client acquired from pool.');

      const res = (await client).query(text, params, callback);
      return res;
    } catch (err) {
      console.error('Error executing query:', err);
    } finally {
      if (client) {
        (await client).release();
        console.log('Client released to pool.');
      }
    }
  }
}

export default db;