const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const jose = require('jose');

// DB
async function DB() {
  const uri = 'mongodb://localhost:27017';
  const db_name = 'ivao';

  try {
    const client = new MongoClient(uri);
    await client.connect();
    return client.db(db_name);
  } catch (err) {
    console.error(err);
  }
}

// ENCRYPTION
async function encrypt(psw) {
  const salt = bcrypt.genSaltSync(11);
  const hash = bcrypt.hashSync(psw, salt);

  return hash;
}

async function decrypt(psw, encPsw) {
  return await bcrypt.compare(psw, encPsw);
}

// TOKEN
const KEY = new TextEncoder().encode('secretXX');
async function generateToken(data) {
  return jwt.sign({ data }, KEY, { expiresIn: '1h' });
}

async function checkToken(token) {
  try {
    return jwt.verify(token, KEY);
  } catch (err) {
    console.error(err);
  }
}

module.exports = {
  DB,
  encrypt,
  decrypt,
  generateToken,
  checkToken,
};
