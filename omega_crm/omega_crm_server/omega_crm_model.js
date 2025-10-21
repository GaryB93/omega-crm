import { Pool, Client } from 'pg';
// This model is a database component for the server to be able to communicate with the database and execute queries. The specific queries are described in the controllers to perform specific database operations.

/*
    COMMENTED CODE IS FOR RUNNING SERVER LOCALLY
*/

// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'omega_crm_db',
//   password: '!KTKphine1',
//   port: 5432,
//   max: 10,
//   idleTimeoutMillis: 30000,
//   connectionTimeoutMillis: 2000,
// });

// const db = {
//   query: async(text, params) => {
//     let client;
//     try {
//       client = pool.connect();
//       console.log('Client acquired from pool.');

//       const res = (await client).query(text, params);
//       return res;
//     } catch (err) {
//       console.error('Error executing query:', err);
//     } finally {
//       if (client) {
//         (await client).release();
//         console.log('Client released to pool.');
//       }
//     }
//   }
// }


const db = {
  query: async (query, params) => {

    const client = new Client({
      connectionString: process.env.DATABASE_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });

    try {
      await client.connect();
      console.log('Client acquired from pool.');

      const res = await client.query(query, params);
      return res;
    } catch (err) {
      console.error('Error executing query:', err);
    } finally {
      await client.end();
      console.log('Client has disconnected.');
    }
  }
}

export default db;