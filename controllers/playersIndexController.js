const db = require('../db');

// GET http://localhost:7000/admin/players
exports.getIndex = (req, res, next) => {
    console.log("GET: Hello getPlayersPage")
    // connect to the database and save the new incoming player
    db.getDb()
        .db('softball')
        // the collction will be created dynamically if it does not exist yet
        .collection('players')
        .find(
            {},
            {_id: 0, name: 1, email: 1}
        )
        .toArray(
            function(result) {
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