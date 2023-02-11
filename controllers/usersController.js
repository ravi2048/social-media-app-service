const db = require("../models");

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
            return res.status(500).json({
                "error": error.message
            })
        }
    }
}

module.exports = usersController;