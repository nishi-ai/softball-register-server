const { connectDB } = require("./utils");

const migration = async () => {
  try {
    const client = await connectDB();

    const db = client.db("softball");

    if (process.env.NODE_ENV === "development") {
      await db.collection("events").drop();
      console.log('deleted events collection....');
      const col = await db.createCollection("events");
        console.log("adding seed data");
        await col.insertMany([
          { date: new Date("2021-05-01"), result: { cats: 1, dogs: 5 } },
          { date: new Date("2021-06-01"), result: { cats: 15, dogs: 10 } },
          { date: new Date("2021-07-01"), result: null },
          { date: new Date("2020-05-01"), result: { cats: 15, dogs: 10 } },
          { date: new Date("2022-05-18"), result: null },
        ]);
    }
    console.log("Migration done.");
    client.close();
  } catch (err) {
    console.log(err);
  }
};

migration();
