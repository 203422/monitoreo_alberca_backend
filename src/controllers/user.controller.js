const createAccessToken = require('../auth/generateToken');
const User = require('../models/user');
const getUserInfo = require('../libs/getUserInfo');
const getTokenFromHeader = require('../auth/getTokenFromHeader');
const Token = require('../models/token');

const login = async (req, res) => {
    const { username, password } = req.body;

    if (!!!username || !!!password) {
        return res.status(400).json({
            error: 'Todos los campos son requeridos'
        })
    }
    const user = await User.findOne({ username });

    if (user) {

        const correctPassword = await User.comparePassword(password, user.password)

        if (correctPassword) {

            const accessToken = user.createAccessToken();
            const refreshToken = await user.createRefreshToken();


            res.status(200).json({ user: getUserInfo(user), accessToken, refreshToken });

        } else {
            res.status(401).json({
                error: 'Nombre de usuario o contraseña incorrecta'
            });
        }
    } else {
        res.status(404).json({
            error: 'Usuario no econtrado'
        });
    }
}

const getUser = (req, res) => {
    res.status(200).json(req.user);
}

const signOut = async (req, res) => {

    try {

        const refreshToken = getTokenFromHeader(req.headers);

        if (refreshToken) {
            await Token.findOneAndDelete({ token: refreshToken });
            res.status(200).json({ message: "Token eliminado" });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Error al eliminar el token"
        });
    }

}

module.exports = { login, getUser, signOut }