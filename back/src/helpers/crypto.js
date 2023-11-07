const { SECRET_KEY } = process.env;
const crypto = require("crypto");

function encrypt(data) {
    const text = data.toString();
    //console.log(typeof text);
    const cipher = crypto.createCipher('aes-256-cbc', SECRET_KEY);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
}

function decrypt(data, secretkey) {
    try {
        const encryptedText = data.toString();
        const decipher = crypto.createDecipher('aes-256-cbc', secretkey);
        let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    } catch (error) {
        return false;
    }
}


module.exports = {
    encrypt,
    decrypt
};