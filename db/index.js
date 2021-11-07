const {Client} = require('pg');
const client = new Client(process.env.DATABASE_URL || 'postgres://localhost/acme_user_places_db');

const getUsers = async()=>{
  return (await client.query('SELECT * FROM "User";')).rows;
};

const getPlaces = async()=>{
  return (await client.query('SELECT * FROM "Place";')).rows;
};
const createUser =async({name})=>{
  return (await client.query('INSERT INTO "User"(name) VALUES($1) RETURNING *;', [name])).rows[0]
}

const deleteUser =async(id)=>{
  await client.query('DELETE FROM "User" WHERE id=$1', [id]);
}

const syncAndSeed = async()=>{
  const SQL =`
  DROP TABLE IF EXISTS "User";
  DROP TABLE IF EXISTS "Place";
  CREATE TABLE "User"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE
  );
  CREATE TABLE "Place"(
    id SERIAL PRIMARY KEY,
    name VARCHAR(20) NOT NULL UNIQUE
  );
  INSERT INTO "User"(name) VALUES ('moe');
  INSERT INTO "User"(name) VALUES ('ethyl');
  INSERT INTO "User"(name) VALUES ('lucy');
  INSERT INTO "Place"(name) VALUES ('NYC');
  INSERT INTO "Place"(name) VALUES ('Chicago');
  INSERT INTO "Place"(name) VALUES ('LA');
  INSERT INTO "Place"(name) VALUES ('Paris')
  `;
  await client.query(SQL);
}

module.exports ={
  deleteUser,
  syncAndSeed,
  client,
  getPlaces,
  createUser,
  getUsers
};