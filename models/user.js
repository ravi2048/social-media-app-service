const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define(
        "User",
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            username: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING,
                validate: {
                    isEmail: true
                },
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            name: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            coverPic: {
                type: Sequelize.STRING,
                allowNull: true,
                field: 'cover_pic'
            },
            profilePic: {
                type: Sequelize.STRING,
                allowNull: true,
                field: 'profile_pic'
            },
            city: {
                type: Sequelize.STRING,
                allowNull: true,
            },
            website: {
                type: Sequelize.STRING,
                allowNull: true,
            }

        },
        {
            sequelize,
            tableName: "users",
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        }
    );

    User.associate = function(models) {
        User.hasMany(models.Post);
        User.hasMany(models.Like);
        User.hasMany(models.Comment);
        User.hasMany(models.Relationship, {as: 'relationships'});
        User.hasMany(models.Story);
    }
    return User;
}