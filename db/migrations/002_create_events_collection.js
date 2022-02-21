const { connectDB } = require('./utils');

const migration = async () => {
  try {
    const client = await connectDB();
    
    const db = client.db('softball');
    const collections = await (await db.listCollections()).toArray();
    if (collections.find(collection => collection.name === 'events') == null) {

      const col = await db.createCollection('events');

      if (process.env.NODE_ENV === 'development') {
        console.log('adding seed data');
        await col.insertMany([
          { date: new Date('2021-05-01'), result: { cats: 1, dogs: 5 } },
          { date: new Date('2021-06-01'), result: { cats: 15, dogs: 10 } },
          { date: new Date('2021-07-01'), result: null },
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