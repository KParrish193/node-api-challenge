//custom middleware - global

module.exports = { logger }

function logger(req, res, next) {
    console.log(`${req.method}, Request to ${req.originalUrl}, at ${new Date}`);
    next();
}

