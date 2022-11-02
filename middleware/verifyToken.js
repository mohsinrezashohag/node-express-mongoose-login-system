const jwt = require('jsonwebtoken');
const { promisify } = require('util')

module.exports = async (req, res, next) => {
    try {
        const token = req?.headers?.authorization?.split(' ')?.[1]
        if (!token) {
            return res.status(401).json({
                status: 'failed',
                message: 'you are not logged in user // here 1'
            })
        }
        const decoded = await promisify(jwt.verify)(token, process.env.USER_SECRET_KEY)
        req.user = decoded
        next();

    } catch (error) {
        res.status(401).json({
            status: 'failed',
            message: "you are not logged in // here 2"
        })
    }
}