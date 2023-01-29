// const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define(
        "Post",
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            desc: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            img: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.BIGINT,
                allowNull: false,
                field: 'created_at'
            },
        },
        {
            sequelize,
            tableName: "posts",
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        }
    );

    Post.associate = function(models) {
        Post.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            as: 'user'
        });
        Post.hasMany(models.Like);
        Post.hasMany(models.Comment);
    }
    return Post;
}