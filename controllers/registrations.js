// GET
exports.getRegistraionPage = (req, res) => {
    console.log("GET: sending Hello")
};

// POST
exports.postRegistraionInfo = (req, res, next) => {
    console.log("POST:")
    console.log(req.body);
    const { name, email } = req.body;
    // create validation manually in server side, instead using required function in front end
    if (
        !name || 
        name.trim() === '' ||
        !email ||
        !email.includes('@') ||
        email.trim() === ''
    ) {
        res.status(422).json({ message: 'Invalid input.'})
        // stop request here when the input is invalid
        return;
    }
    res.status(200);
    // need to return something json because frontend expects to receive `json.
    res.send({});
};
