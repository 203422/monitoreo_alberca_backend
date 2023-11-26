const mongoose = require('mongoose');
const Token = require('./token');
const bcrypt = require('bcryptjs');
const getUserInfo = require('../libs/getUserInfo');
const { generateAccessToken, generateRefreshToken } = require('../auth/generateToken');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true,
    versionKey: false
}
)

userSchema.statics.encryptPassword = async function (password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

userSchema.statics.comparePassword = async function (password, receivedPassword) {
    const same = await bcrypt.compare(password, receivedPassword);
    return !!same;
}

userSchema.methods.createAccessToken = function () {
    return generateAccessToken(getUserInfo(this));
}

userSchema.methods.createRefreshToken = async function () {
    const refreshToken = generateRefreshToken(getUserInfo(this));

    try {
        await new Token({ token: refreshToken }).save();
        return refreshToken;
    } catch (error) {
        console.log(error);
    }
}


module.exports = mongoose.model('User', userSchema);