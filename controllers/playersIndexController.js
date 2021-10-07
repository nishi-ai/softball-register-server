const db = require('../db');

exports.getIndex = (req, res, next) => {
    console.log("GET: Hello getPlayersPage")
    db.getDb()
        .db('softball')
        .collection('players')
        .find(
            {},
            {_id: 0, name: 1, email: 1}
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
                    .send(JSON.stringify({
                        error: 'db-allPlayers-find-error'
                    }));
                }
            }
        ) 
};