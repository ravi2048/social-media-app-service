const db = require("../models");
const jwt = require("jsonwebtoken");

const relationshipController = {
    addFriend: async(req, res) => {
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
            });

            const relationObj = {
                userId: loggedInUserId,
                friendId: req.body.friendId
            };

            await db.Relationship.create(relationObj);

            return res.status(200).json(`user ${loggedInUserId} added user ${req.query.friendId} as friend`);
        } catch (error) {
            // return res.status(500).json({
            //     "error": error.message
            // });
            console.log(`**** something went wrong ***, ${error.message}`);
        }
    },

    findRelation: async(req, res) => {
        try {
            const token = req.headers["authorization"].split(" ")[1];
            let loggedInUserId = null;
            if(!token) {
                return res.status(401).json("Not logged in");
            }

            jwt.verify(token, "secretKey", (err, userInfo) => {
                if(err) {
                    return res.status(403).json({msg: "Token is not valid", error: err});
                }
                loggedInUserId = userInfo.id;
            })
            const friendId = req.query.friendId;
            const relationInfo = await db.Relationship.findOne({
                where: {
                    userId: loggedInUserId,
                    friendId: friendId
                }
            });
            return res.status(200).json(relationInfo);
        } catch (error) {
            // return res.status(500).json({
            //     "error": error.message
            // });
            console.log(`**** something went wrong ***, ${error.message}`);
        }
    },

    deleteFriend: async(req, res) => {
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
            });

            const userId = loggedInUserId;
            const friendId = req.body.friendId;

            await db.Relationship.destroy({
                where: {
                    userId: userId,
                    friendId: friendId
                }
            });

            return res.status(200).json(`user ${loggedInUserId} removed user ${req.query.friendId} as friend`);
        } catch (error) {
            // return res.status(500).json({
            //     "error": error.message
            // });
            console.log(`**** something went wrong ***, ${error.message}`);
        }
    }
};

module.exports = relationshipController;