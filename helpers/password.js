const bcrypt = require('bcrypt');

const hashPassword = async (plainPassword) => {
    const salt = await bcrypt.genSalt(15);
    const hashedPassword = bcrypt.hash(plainPassword, salt);
    return hashedPassword;
}

const comparePasswords = async (plainPassword, hashedPassword) => {
    const passwordIdentity = await bcrypt.compare(plainPassword, hashedPassword);
    return passwordIdentity ? true : false;
}

module.exports = {
    hashPassword,
    comparePasswords
}