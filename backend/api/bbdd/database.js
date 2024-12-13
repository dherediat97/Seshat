const mysql = require('mysql2/promise');
const { Client } = require('pg');
const { config, isProd } = require('../config');

async function query(sqlQuery, params) {
  try {
    if (isProd === 'true') {
      const client = new Client({
        connectionString: process.env.DATABASE_URL_UNPOOLED,
      });
      await client.connect();
      const results = await client.query(sqlQuery, params);
      client.end();
      return results.rows;
    } else {
      const connection = await mysql.createConnection(config.db);
      const [results] = await connection.execute(sqlQuery, params);
      connection.end();
      return results;
    }
  } catch (err) {
    console.error(
      `Ha ocurrido un error en la consulta a la BBDD. Error: ${err}`
    );

    return -1;
  }
}

module.exports = {
  query,
};
