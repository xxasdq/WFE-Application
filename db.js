const { MongoClient } = require('mongodb');
const { encrypt } = require('./app/api/auth/utils');

async function CreateDB() {
  const uri = 'mongodb://localhost:27017';
  const db_name = 'ivao';

  try {
    const client = new MongoClient(uri);
    await client.connect();
    const db = await client.db(db_name);

    console.log(`Connected to the DB: ${db_name}`);

    CreateCollection(db, 'users', [
      { vid: 123456, password: 'Pass123' },
      { vid: 987654, password: 'Pass987' },
    ]);
    CreateCollection(db, 'schedule', [
      {
        vid: 987654,
        position: 'LEPA_S_TWR',
        date: '2024-03-24',
        start: '02:00',
        end: '04:00',
      },
      {
        vid: 123456,
        position: 'LEPA_S_TWR',
        date: '2024-03-24',
        start: '00:00',
        end: '02:00',
      },
      {
        vid: 987654,
        position: 'LEMD_S_TWR',
        date: '2024-03-24',
        start: '00:00',
        end: '02:00',
      },
      {
        vid: 987654,
        position: 'LEMD_S_TWR',
        date: '2024-02-23',
        start: '18:00',
        end: '20:00',
      },
    ]);
  } catch (error) {
    console.error(error);
  }
}

async function CreateCollection(db, name, data) {
  const collections = await db.listCollections().toArray();
  const exists = collections.some((collection) => collection.name === name);

  if (!exists) {
    const collection = await db.collection(name);

    data.forEach(async (obj) => {
      if (name == 'users') {
        const newPassword = await encrypt(obj.password);
        obj['password'] = newPassword;
        await collection.insertOne(obj);
      } else {
        await collection.insertOne(obj);
      }
    });
  }
}

CreateDB();
