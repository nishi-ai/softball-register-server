const { connectDB } = require('./utils');

const migration = async () => {
  try {
    const client = await connectDB();

    const db = client.db('softball');

    if (process.env.NODE_ENV === 'development') {
      await db.collection('players').drop();
      console.log('deleted players collection....');
      const col = await db.createCollection('players');
      console.log('adding seed data');
      await col.insertMany([
        {
          name: 'Terry',
          email: 'terry@catleader.com',
          created_at: new Date().toString(),
        },
        {
          name: 'Andy',
          email: 'andy@dogleader.com',
          created_at: new Date().toString(),
        },
        {
          name: 'Bright',
          email: 'bright@dogleader.com',
          created_at: new Date().toString(),
        },
      ]);
    }
    console.log('Migration done.');
    client.close();
  } catch (err) {
    console.log(err);
  }
};

migration();
