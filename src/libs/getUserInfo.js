function getUserInfo(user) {
    return {
        username: user.username,
        id: user.id
    };
}

module.exports = getUserInfo;