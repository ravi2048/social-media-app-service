const db = require("../models");
const jwt = require("jsonwebtoken");
const moment = require("moment/moment");
const { now } = require("moment/moment");
require('dotenv').config();

const postsController = {
    getPosts: async (req, res) => {
        try {
            // get list of friends of logged in user
            // const friendsData = await db.Relationship.findAll({
            //     where: {
            //         userId: loggedInUserId
            //     }
            // });

            // logged in user see posts of only his and people they follow
            // const friendsIdList = [loggedInUserId];
            // friendsData.map(friend => {
            //     friendsIdList.push(friend.friendId);
            // });

            const allPosts = await db.Post.findAll({
                // where: {
                //     '$user.id$': friendsIdList
                // },
                include: [
                    {
                        model: db.User,
                        as: "user",
                    },
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            });

            res.status(200).json(allPosts);
        } catch (error) {
            // return res.status(500).json({
            //     "error": error.message
            // });
            console.log(`**** something went wrong ***, ${error.message}`);
        }        
    },

    getUsersPosts: async (req, res) => {
        try {
            const userId = req.params.userId;
            const allPosts = await db.Post.findAll({
                where: {
                    '$user.id$': userId
                },
                include: [
                    {
                        model: db.User,
                        as: "user",
                    }
                ],
                order: [
                    ['createdAt', 'DESC']
                ]
            });

            res.status(200).json(allPosts);
        } catch (error) {
            // return res.status(500).json({
            //     "error": error.message
            // });
            console.log(`**** something went wrong ***, ${error.message}`);
        }
    },

    createPost: async (req, res) => {
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

            // if logged in, create post
            const newPost = await db.Post.create({
                desc: req.body.desc,
                img: req.body.img,
                userId: loggedInUserId,
                createdAt: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
            });

            res.status(200).json('Post created successfully');
        } catch (error) {
            // return res.status(500).json({
            //     "error": error.message
            // });
            console.log(`**** something went wrong ***, ${error.message}`);
        }        
    },

    deletePost: async (req, res) => {
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

            // if logged in, delete post
            await db.Post.destroy({
                where: {
                    id: req.params.postId
                }
            });

            res.status(200).json('Post deleted successfully');
        } catch (error) {
            // return res.status(500).json({
            //     "error": error.message
            // });
            console.log(`**** something went wrong ***, ${error.message}`);
        }        
    },
}

module.exports = postsController;