const User = require("../models/user");

module.exports.userSignUpService = async (data) => {
    const user = await User.create(data);
    return user;
}


module.exports.getUsersService = async (query) => {
    console.log(query.filter);
    const users = await User.find({}).sort(query.filter);
    return users;
}

module.exports.getUserByEmail = async (email) => {
    return await User.findOne({ email: email });
}



module.exports.userUpdateService = async (id, data) => {
    const user = await User.updateOne({ id }, data);
    return user;
}
