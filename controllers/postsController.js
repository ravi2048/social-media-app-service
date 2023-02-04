const db = require("../models");
const jwt = require("jsonwebtoken");
require('dotenv').config();

const postsController = {
    getPosts: async (req, res) => {
        try {
            // get all posts of current user and friends
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
            // console.log(`**** loggedInUser: ${JSON.stringify(loggedInUserId)}`);

            // get list of friends of logged in user
            const friendsData = await db.Relationship.findAll({
                where: {
                    userId: loggedInUserId
                }
            });

            // logged in user see posts of only his and people they follow
            const friendsIdList = [loggedInUserId];
            friendsData.map(friend => {
                friendsIdList.push(friend.friendId);
            });

            const allPosts = await db.Post.findAll({
                where: {
                    '$user.id$': friendsIdList
                },
                include: [
                    {
                        model: db.User,
                        as: "user",
                    }
                ]
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