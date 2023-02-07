const moment = require("moment/moment");
const db = require("../models");
const jwt = require("jsonwebtoken");

const commentsController = {
    getComments: async(req, res) => {
        try {
            const token = req.cookies.accessToken;
            if(!token) {
                return res.status(401).json("Not logged in");
            }

            jwt.verify(token, "secretKey", (err, userInfo) => {
                if(err) {
                    return res.status(403).json("Token is not valid");
                }
            })

            const postId = req.params.postId;
            const comments = await db.Comment.findAll({
                where: {postId},
                include: [
                    {
                        model: db.User,
                        as: "user"
                    }
                ]
            });
            return res.status(200).json(comments);
        } catch (error) {
            return res.status(500).json({
                "error": error.message
            });
        }
    },

    addComment: async (req, res) => {
        try {
            const token = req.cookies.accessToken;
            if(!token) {
                return res.status(401).json("Not logged in");
            }

            jwt.verify(token, "secretKey", (err, userInfo) => {
                if(err) {
                    return res.status(403).json("Token is not valid");
                }
            });

            await db.Comment.create({
                desc: req.body.desc,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
                postId: req.params.postId,
                userId: req.body.userId
            })
            return res.status(200).json('comment added successfully');
        } catch (error) {
            return res.status(500).json({
                "error": error.message
            });
        }
    },

    getCommentsCount: async (req, res) => {
        try {
            const postId = req.params.postId;
            const count = await db.Comment.count({
                where: {postId: postId}
            })
            return res.status(200).json(count);
        } catch (error) {
            return res.status(500).json({
                "error": error.message
            });
        }
    },
}

module.exports = commentsController;