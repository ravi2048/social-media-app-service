const db = require("../models");
const jwt = require("jsonwebtoken");

const usersController = {
    getUserInfo: async (req, res) => {
        try {
            // unprotected route
            const userInfo = await db.User.findOne({
                where: { id: req.params.userId}
            });

            // using .get() sequelize method to ignore other properties which are attached by sequelize
            // .toJSON() can also be used
            const {password, ...otherProperties} = userInfo.get();
            return res.status(200).json(otherProperties);
        } catch (error) {
            // return res.status(500).json({
            //     "error": error.message
            // })
            console.log(`**** something went wrong ***, ${error}`);
        }
    },

    updateUserInfo: async (req, res) => {
        try {
            const token = req.headers["authorization"].split(" ")[1];
            let loggedInUserId = null;
            if(!token) {
                return res.status(401).json("Not logged in");
            }

            jwt.verify(token, "secretKey", (err, userInfo) => {
                if(err) {
                    return res.status(403).json("Token is not valid");
                }
                loggedInUserId = userInfo.id;
            })

            await db.User.update({
                name: req.body.name,
                email: req.body.email,
                city: req.body.city,
                website: req.body.website,
                coverPic: req.body.coverPic,
                profilePic: req.body.profilePic,
            }, { where: { id: loggedInUserId } });

            return res.status(200).json(`user ${loggedInUserId} info has been updated`);
        } catch (error) {
            // return res.status(500).json({
            //     "error": error.message
            // })
            console.log(`**** something went wrong ***, ${error.message}`);
        }
    }
}

module.exports = usersController;