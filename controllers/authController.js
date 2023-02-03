const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        try {
            // find if user already exists
            const response = await db.User.findOne({
                where: {
                    username: req.body.username
                }
            });

            if (response) {
                res.status(409).json("User already exists!");
                return;
            }

            // new user, hash the password
            const salt = bcrypt.genSaltSync(10);
            const hashedPassword = bcrypt.hashSync(req.body.password, salt);

            // add the new user to db
            const newUser = await db.User.create({
                username: req.body.username,
                email: req.body.email,
                password: hashedPassword,
                name: req.body.name,
                coverPic: req.body?.coverPic,
                profilePic: req.body?.profilePic
            });

            return res.status(200).json({
                "message": "user has been created",
            });
        } catch (error) {
            return res.status(500).json({
                "error": error.message
            });
        }
    },

    login: async (req, res) => {
        try {
            // check if username exists
            const response = await db.User.findOne({
                where: {
                    username: req.body.username
                }
            });

            if (!response) {
                res.status(404).json("Username did not match!");
                return;
            }

            // match the password
            if (!bcrypt.compareSync(req.body.password, response.password)) {
                res.status(404).json("Password did not match!");
                return;
            }

            // create the token
            const token = jwt.sign(
                { id: response.id },
                "secretKey", { expiresIn: '24h' }
            );

            // using .get() sequelize method to ignore other properties which are attached by sequelize
            // .toJSON() can also be used
            const { password, ...others } = response.get();

            // set the cookies
            res.cookie("accessToken", token, {
                httpOnly: true,
            }).status(200).json(others);

            return;
        } catch (error) {
            return res.status(500).json({
                "error": error.message
            });
        }

    },

    logout: async(req, res) => {
        // clear the cookie
        res.clearCookie("accessToken", {
            secure: true,
            sameSite: "none"
        }).status(200).json("user has been logged out");
    }
    
}

module.exports = authController;