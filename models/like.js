// const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Like = sequelize.define(
        "Like",
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            postId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        },
        {
            sequelize,
            tableName: "likes",
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        }
    );

    Like.associate = function(models) {
        Like.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            as: 'user'
        });

        Like.belongsTo(models.Post, {
            foreignKey: {
                name: 'postId',
                allowNull: false
            },
            as: 'post'
        });
    }


    return Like;
}