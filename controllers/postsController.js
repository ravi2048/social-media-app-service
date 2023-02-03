const db = require("../models");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const postsController = {
    getPosts: async (req, res) => {
        try {
            // get all posts of current user and friends
            const token = req.cookies.accessToken;
            if(!token) {
                return res.status(401).json("Not logged in");
            }

            jwt.verify(token, "secretKey", (err, userInfo) => {
                if(err) {
                    return res.status(403).json("Token is not valid");
                }
            })
            console.log(`sgsdfgsdf`);
            const allPosts = await db.Post.findAll({
                include: [{
                    model: db.User,
                    as: "user"
                }]
            });
            res.status(200).json(allPosts);
        } catch (error) {
            return res.status(500).json({
                "error": error.message
            });
        }        
    }
}

module.exports = postsController;