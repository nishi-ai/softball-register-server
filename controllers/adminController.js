const db = require('../db');

exports.getIndex = async (req, res) => {
    console.log("GET: Hello getPlayersPage")
    try {
        const collectionPlayers = db.getDb().db('softball').collection('players')
        const result = await collectionPlayers.find(
            {},
            {_id: 0, name: 1, email: 1}
        )
        .toArray()
        console.log('result', result)
        res
        .status(200)
        .json(result)
    } catch(err) {
        console.log(err)
        res
        .status(500)
        .json({
            error: 'db-players-could-not-find',
            message: err
        });
    }
};

exports.postDeletePlayer = async (req, res) => {
    console.log('Here DESTROY PLAYER(S)');
    console.log('req.body:', req.body)
    const emailsArray = req.body
    try {
        const collectionPlayers = db.getDb().db('softball').collection('players')
        const result = await collectionPlayers.deleteMany({ email: {$in: emailsArray } })
        console.log("Deleted " + result.deletedCount + " players");
        res
        .status(200)
        .json({message: 'ok'})
    } catch(err) {
        console.log(err)
        res.
        status(500)
        .json({
            error: 'db-players-could-not-delete',
            message: err
        });
    }
};