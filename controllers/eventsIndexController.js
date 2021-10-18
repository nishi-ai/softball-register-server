const db = require('../db');

exports.getEventsIndex = (req, res, next) => {
    console.log("GET: Hello getEvents")
    db.getDb()
        .db('softball')
        .collection('events')
        .find(
            {},
            {_id: 0, date: 1, result: 1}
        )
        .toArray(
            function(err, result) {
                if (result) {
                    res
                    .status(200)
                    .json(result)
                } else {
                    res
                    .status(500)
                    .json({
                        error: 'db-events-find-error',
                        message: err
                    });
                }
            }
        ) 
};