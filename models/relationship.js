// const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Relationship = sequelize.define(
        "Relationship",
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            followerUserId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            followedUserId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
        },
        {
            sequelize,
            tableName: "relationships",
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        }
    );

    Relationship.associate = function(models){
        Relationship.belongsTo(models.User, {
            foreignKey: {
                name: 'followerUserId',
                allowNull: false
            },
            as: 'follower'
        });

        Relationship.belongsTo(models.User, {
            foreignKey: {
                name: 'followedUserId',
                allowNull: false
            },
            as: 'followed'
        });
    }


    return Relationship;
}