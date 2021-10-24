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

exports.postDeletePlayer = (req, res, next) => {
    console.log('Here DESTROY PLAYER(S)');
    console.log('req.body:', req.body)
    const emailsArray = req.body
    // const emailsArray = ["test4@test.com", "test5@test.com"]
    // console.log('emailsArray:', emailsArray)
    db.getDb()
        .db('softball')
        .collection('players')
        .deleteMany({ email: {$in: emailsArray } })
        .then(() => {
            console.log('DESTROYED PLAYER(S)');
            // console.log(emailsArray)
            res
            .status(200)
            .json({message: 'ok'})
        })
        .catch((err) => {
            console.log(err)
            res.
            status(500)
            .json({
                error: 'db-players-could-not-delete',
                message: err
                });
        })
};