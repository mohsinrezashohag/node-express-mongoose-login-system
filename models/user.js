const mongoose = require('mongoose');
const validator = require('validator');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minimum: [5, "require at least t char"]
    },
    email: {
        type: String,
        required: true,
        unique: true,
        minimum: [5, "require at least t char"],
        lowercase: true,
        validate: [isEmail, 'must be an valid email']
    },
    password: {
        type: String,
        unique: true,
        validate: {
            validator: (value) => {
                validator.isStrongPassword(value,
                    {
                        minLength: 8,
                        minLowercase: 1,
                        minUppercase: 1,
                        minNumbers: 1
                    }
                )
            },
            messages: " password is not strong enough"
        }
    },
    confirmPassword: {
        type: String,
        required: true,
        validate: {
            validator: function (value) {
                return value = this.password
            },
            messages: "password don't matched"
        }
    },
    role: {
        type: String,
        required: true,
        enum: {
            values: ['candidate', 'hr'],
            messages: ['{VALUES} must be with in candidate/hr']
        },

    },
    passwordChangeAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date

}, {
    timestamps: true
})

userSchema.pre('save', async function (next) {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirmPassword = undefined;
    next();
})


// comparing password using method when login
userSchema.methods.comparePassword = (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
}

const User = mongoose.model('User', userSchema);
module.exports = User;
