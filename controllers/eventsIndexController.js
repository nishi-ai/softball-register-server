const db = require("../db");

exports.getEventsIndex = async (req, res) => {
  console.log("GET: Hello getEvents");
  const sortedOrder = req.query.sort === "asc" ? 1 : -1;

  try {
    const collectionEvents = db.getDb().db("softball").collection("events");
    const allEvents = await collectionEvents
      .find({}, { _id: 0, date: 1, result: 1 })
      .sort({ date: sortedOrder })
      .toArray();
    res.status(200).json(allEvents);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "db-events-could-not-find",
      message: err,
    });
  }
};
