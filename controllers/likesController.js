const db = require("../models");
const jwt = require("jsonwebtoken");

const likesController = {
    getLikes: async(req, res) => {
        try {
            const postId = req.params.postId;
            // fetch likes count on post
            const likesData = await db.Like.count({
                where: {postId}
            });
            return res.status(200).json(likesData)
        } catch (error) {
            return res.status(500).json({
                "error": error.message
            });
        }
    },
    addLike: async(req, res) => {
        try {
            const token = req.cookies.accessToken;
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

            const postId = req.params.postId;
            // add like
            const likesData = await db.Like.create({
                postId,
                userId: loggedInUserId
            });

            return res.status(200).json(`new like has been added to post ${postId} by user ${loggedInUserId}`)
        } catch (error) {
            return res.status(500).json({
                "error": error.message
            });
        }
    }
}

module.exports = likesController;