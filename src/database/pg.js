const { Client } = require("pg");

function createClient() {
  const client = new Client({
    user: "postgres",
    password: "supersecretpassword",
    host: "localhost",
    database: "fsa",
  });
  return client
}

async function createDatabase() {
  const client = createClient();

  try {
    client.connect();

    const sql = `
    CREATE DATABASE "fsa";
    `

    await client.query(sql);
    client.end();
  } catch (err) {
    console.error(err);
  }

}

async function createTables() {
  const sql = `
  CREATE TABLE IF NOT EXISTS "Brands"(
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  );
  CREATE TABLE IF NOT EXISTS "Sneakers"(
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    brand_id INTEGER REFERENCES "Brands"(id)
  );
  `;

  const client = createClient();
  try {
    await client.connect()
    const response = await client.query(sql);
    await client.end();
    return response;
  } catch (err) {
    console.error(err)
  }

}

async function createRows() {
  const sql = `
  INSERT INTO "Brands"(id, name) VALUES(1, 'Nike');
  INSERT INTO "Brands"(id, name) VALUES(2, 'Adidas');
  INSERT INTO "Brands"(id, name) VALUES(3, 'Converse');
  INSERT INTO "Sneakers"(id, name, brand_id) VALUES(1, 'Air Max Jordan', 1)
  `
  const client = createClient();
  try {
    await client.connect()
    const response = await client.query(sql);
    await client.end();
    return response;
  } catch (err) {
    console.error(err)
  }
}

async function fetchBrands() {
  const sql = `
  SELECT * FROM "Brands";
  `
  const client = createClient();
  try {
    await client.connect()
    const response = await client.query(sql);
    await client.end();
    return response;
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  createDatabase,
  createTables,
  createRows,
  fetchBrands
}
