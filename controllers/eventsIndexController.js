const db = require('../db');

exports.getEventsIndex = async (req, res) => {
    console.log("GET: Hello getEvents")
    try { 
        const collectionEvents = db.getDb().db('softball').collection('events')
        const allEvents = await collectionEvents.find(
            {},
            {_id: 0, date: 1, result: 1}
        )
        .sort({ date: -1 })
        .toArray()
        console.log('allEvents', allEvents)
        res
          .status(200)
          .json(allEvents);
    } catch(err) {
        console.log(err)
        res
          .status(500)
          .json({
            error: 'db-events-could-not-find',
            message: err
        });
    }
};