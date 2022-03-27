const jwt = require('jsonwebtoken');

const generateToken = (data) => {
    const token = jwt.sign(
        data,
        "sssh secret key...",
        {
            expiresIn : '3h'
        });
    return token;
}

const decodeToken = (token) => {
    try {
        const payload = jwt.verify(token, "sssh secret key...");
        return payload;
    } catch(err) {
        console.log(err);
        return null;
    }
}

module.exports = {
    generateToken,
    decodeToken
}