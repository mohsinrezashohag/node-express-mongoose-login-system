const jwt = require('jsonwebtoken');

module.exports.generateToken = (userInfo) => {
    const payload = {
        email: userInfo.email,
        role: userInfo.role
    }
    //crypto.randomBytes(64).toString('hex')
    const token = jwt.sign(payload, process.env.USER_SECRET_KEY, { expiresIn: "7days" });
    return token;
}