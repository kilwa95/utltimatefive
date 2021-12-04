const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { SECRET_KEY } = process.env;
const TOKEN_EXPIRE_IN = 24 * 60 * 60;

module.exports ={
    checkPassword: function(password1, password2){
        return bcrypt.compare(password1, password2);
    },
    generateToken: function(decoded, secretKey = SECRET_KEY, expiresIn = TOKEN_EXPIRE_IN){
        return jwt.sign({ ...decoded }, secretKey, { expiresIn });
    },
    getTokenFromRequest: function(req){
        let token = '';
        const authorization = req.headers['x-access-token'] || req.headers.authorization;
        if (!!authorization && authorization.startsWith('Bearer ')) {
          token = authorization.slice(7, authorization.length);
        }
        return token;
    },
    getDecodedFromToken: function(token){
        if (!token) {
            return '';
          }
          const decoded = jwt.verify(token, SECRET_KEY);
          return decoded;
    },
}