const mongoose = require('mongoose');
const dotenv = require('dotenv').config()

const dbConnection = () => {
    mongoose.connect(process.env.mongoose_local_db)
}

module.exports = dbConnection