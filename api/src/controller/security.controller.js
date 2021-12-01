const {findUserByEmail} = require('../queries/user.queries');
const Helper = require('../Helper');
const Security = require('../services/security');

exports.login = async (req, res) => {
    const { email, password } = req.body;

    if(Helper.isEmpty([email, password])) {
        return res.status(Helper.HTTP.BAD_REQUEST).json({
            message: 'Please provide email and password'
        });
    }
    if(!Helper.validateEmail(email)){
        return res.status(Helper.HTTP.BAD_REQUEST).json({
            message: 'Invalid email'
        });
    }
    if(!Helper.validatePassword(password)){
        return res.status(Helper.HTTP.BAD_REQUEST).json({
            message: 'Invalid password'
        });
    }
    try {
        const user = await findUserByEmail(email);
        if(!user){
            return res.status(Helper.HTTP.NOT_FOUND).json({
                message: 'User not found'
            });
        }
        const isPasswordOk = Security.checkPassword(password, user.password);
        if(!isPasswordOk){
            return res.status(Helper.HTTP.BAD_REQUEST).json({
                message: 'Invalid password'
            });
        }
        const decoded = {
            id: user.id,
            email: user.email,
            firstName: user.firstName,
            lastName: user.lastName,
            isPlayer: user.roles.includes('player'),
            isAdmin: user.roles.includes('admin'),
            isOrganizer: user.roles.includes('organizer'),
            isCaptiner: user.roles.includes('captain'),
        }
        const token = Security.generateToken(decoded);
        res.header('Authorization', `Bearer ${token}`);

        return res.status(Helper.HTTP.CREATED).json({
            message: 'Login successful',
            token,
            user: decoded
        });
    } catch (error) {
        console.error(error);
        return res.status(Helper.HTTP.SERVER_ERROR).json({
            message: 'Internal server error'
        });
    }
}