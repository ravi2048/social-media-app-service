const db = require("../models");
const jwt = require("jsonwebtoken");

const likesController = {
    getLikes: async(req, res) => {
        try {
            const postId = req.params.postId;
            // fetch likes count on post
            const likesData = await db.Like.findAll({
                where: {postId}
            });
            return res.status(200).json(likesData.map(like => like.userId))
        } catch (error) {
            // return res.status(500).json({
            //     "error": error.message
            // });
            console.log(`**** something went wrong ***, ${error.message}`);
        }
    },
    addLike: async(req, res) => {
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

            const postId = req.params.postId;
            // add like
            const likesData = await db.Like.create({
                postId,
                userId: loggedInUserId
            });

            return res.status(200).json(`new like has been added to post ${postId} by user ${loggedInUserId}`)
        } catch (error) {
            // return res.status(500).json({
            //     "error": error.message
            // });
            console.log(`**** something went wrong ***, ${error.message}`);
        }
    },
    deleteLike: async(req, res) => {
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

            await db.Like.destroy({
                where: {
                    postId: req.params.postId,
                    userId: loggedInUserId
                }
            });
            return res.status(200).json(`user ${loggedInUserId} Disliked the post`)
        } catch (error) {
            // return res.status(500).json({
            //     "error": error.message
            // });
            console.log(`**** something went wrong ***, ${error.message}`);
        }
    }
}

module.exports = likesController;