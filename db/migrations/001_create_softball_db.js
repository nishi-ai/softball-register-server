const { connectDB } = require('./utils');

const migration = async () => {
  try {
    const db = await connectDB();
    
    // TODO: check if softball db exists and create it if not

    db.close();
    console.log('successfully done.');
  } catch (err) {
    console.log(err);
  }
};

migration();