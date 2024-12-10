const { User } = require('../db/models');

const resLocals = (req, res, next) => {
    if (req.session.user_sid) {
        res.locals.user_sid = req.session.user_sid;
    }
    next();
}

const getUser = async (req, res, next) => {
    if (req.session.user_sid) {
        try {
            const user = await User.findByPk(req.session.user_sid);
            
            if (user.id) {
                res.locals.user = { id: user.id, email: user.email };
            } else {
                res.status(500).redirect('/');
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    } 
    next();
}

module.exports = { getUser, resLocals }