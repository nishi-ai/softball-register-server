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
                    .json({
                        error: 'db-players-find-error',
                        message: err
                    });
                }
            }
        ) 
};

exports.postDeletePlayer = async (req, res) => {
    console.log('Here DESTROY PLAYER(S)');
    console.log('req.body:', req.body)
    const emailsArray = req.body
    try {
        const collection = db.getDb().db('softball').collection('players')
        await collection.deleteMany({ email: {$in: emailsArray } })
        console.log('DESTROYED PLAYER(S)');
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