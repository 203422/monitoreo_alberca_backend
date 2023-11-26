const { generateAccessToken } = require("../auth/generateToken");
const getTokenFromHeader = require("../auth/getTokenFromHeader");
const { verifyRefreshToken } = require("../auth/verifyToken");
const Token = require('../models/token');


const refreshToken = async (req, res) => {

    const refreshToken = getTokenFromHeader(req.headers);

    if (refreshToken) {

        try {
            const found = await Token.findOne({ token: refreshToken });
            if (!found) {
                return res.status(401).json({
                    error: "No autorizado"
                });
            }
            const payload = verifyRefreshToken(found.token);
            if (payload) {
                const accessToken = generateAccessToken(payload.user);
                return res.status(200).json({
                    accessToken
                })
            } else {
                res.status(401).json({
                    error: "No autorizado"
                })
            }
        } catch (error) {
            return res.status(401).json({
                error: "No autorizado"
            });
        }

    } else {
        res.status(401).json({
            error: "No autorizado"
        });
    }

}


module.exports = { refreshToken }