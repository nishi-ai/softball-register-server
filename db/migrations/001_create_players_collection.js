const { connectDB } = require('./utils');

const migration = async () => {
  try {
    const client = await connectDB();
    
    const db = client.db('softball');
    const collections = await (await db.listCollections()).toArray();
    if (collections.find(collection => collection.name === 'players') == null) {

      const col = await db.createCollection('players');

      if (process.env.NODE_ENV === 'development') {
        console.log('adding seed data');
        await col.insertMany([
          { name: 'Terry', email: 'terry@catleader.com', created_at: new Date('2021-05-01') },
          { name: 'Andy', email: 'andy@dogleader.com', created_at: new Date('2021-10-01') },
        ]);
      }

      console.log('Migration done.');
    } else {
      console.log('Softball DB already exists. Skipping...');
    }

    client.close();
  } catch (err) {
    console.log(err);
  }
};

migration();