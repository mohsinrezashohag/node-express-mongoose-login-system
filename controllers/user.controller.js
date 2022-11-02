const { userSignUpService, userUpdateService, getUsersService, getUserByEmail } = require("../services/user.service")
const { generateToken } = require("../utils/userLoginTimeToken")
const bcrypt = require('bcrypt');




module.exports.signUp = async (req, res, next) => {
    try {
        const data = req.body
        const user = await userSignUpService(data)
        res.status(200).json({
            status: 'success',
            message: "user sign up successful",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: "user sign up failed",
            error: error.message
        })
    }
}


module.exports.loginUser = async (req, res, next) => {
    /* 1. check email password is given
    2. if given check user exist or not(using email)
    3. if not user then send reset email
    4. check password
    5. if not matched then res res
    6. if matched then check account active or not
    7. if not active send res
    7. them generate token 
    8. send response & token
    */

    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                status: "failed",
                message: "email & password are not given"
            })
        }
        const user = await getUserByEmail(email);

        // hashing given password 
        // const userGivenPassHash = await bcrypt.hash(password, 10)
        const isPasswordMatched = user.comparePassword(password, user.password)

        if (!isPasswordMatched) {
            return res.status(400).json({
                status: "failed",
                message: "password does not matched"
            })
        }

        if (!user) {
            return res.status(400).json({
                status: "failed",
                message: "user not exist"
            })
        }
        const { password: pwd, ...userInfo } = user.toObject();
        //generating token
        const token = generateToken(userInfo)

        res.status(200).json({
            status: "success",
            message: "user login successful",
            data: { userInfo, token }
        })
    } catch (error) {
        return res.status(400).json({
            status: "failed",
            message: "login failed",
            error: error.message
        })
    }

}


// user persisting

module.exports.getCurrentUser = async (req, res, next) => {
    try {
        const user = await getUserByEmail(req?.user?.email);
        console.log("this current user :", user);
        res.status(200).json({
            status: "successful",
            data: { user }
        })

    } catch (error) {
        res.status(401).json({
            status: 'failed',
            message: "you are not a logged in use // here 3"
        })
    }
}







module.exports.getUsers = async (req, res) => {
    try {
        const query = req.query
        const sendingQuery = {}

        if (query.sortBy) {
            const sortedText = query.sortBy.split(',').join(' ')
            sendingQuery.filter = sortedText
        }
        console.log(query);
        const users = await getUsersService(sendingQuery);
        res.status(200).json({
            status: 'successful',
            message: 'users got successfully',
            data: users
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: 'users not found',
            error: error.message
        })
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body
        const user = await userUpdateService(id, data)
        res.status(200).json({
            status: 'success',
            message: "user successfully updated",
            data: user
        })
    } catch (error) {
        res.status(400).json({
            status: 'failed',
            message: "user update failed",
            error: error.message
        })
    }
}