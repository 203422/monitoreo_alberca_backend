const User = require('../models/user');

const createUser = async () => {

    try {

        const count = await User.estimatedDocumentCount()

        if (count > 0) return;

        const newAdmin = new User({
            username: 'admin',
            password: await User.encryptPassword('Abc12345'),
        });

        await newAdmin.save();

    } catch (error) {
        console.log(error);
    }
}

module.exports = { createUser }