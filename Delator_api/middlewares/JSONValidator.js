module.exports.handleJsonError = (err, req, res, next) => {
    if (err) {
        console.log(err)
        return res.status(400).json({ status: 400, statusText: "Bad request", errors: "Received JSON not valid" });
    }
}
