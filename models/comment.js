
module.exports = (sequelize, Sequelize) => {
    const Comment = sequelize.define(
        "Comment",
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
            createdAt: {
                type: Sequelize.BIGINT,
                allowNull: false,
                field: 'created_at'
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
            tableName: "comments",
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        }
    );

    Comment.associate = function(models) {
        Comment.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            as: 'user'
        });

        Comment.belongsTo(models.Post, {
            foreignKey: {
                name: 'postId',
                allowNull: false
            },
            as: 'post'
        });
    }

    return Comment;
}