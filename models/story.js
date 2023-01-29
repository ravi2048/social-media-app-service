// const { sequelize, Sequelize } = require(".");

module.exports = (sequelize, Sequelize) => {
    const Story = sequelize.define(
        "Story",
        {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                primaryKey: true,
                autoIncrement: true
            },
            img: {
                type: Sequelize.STRING,
                allowNull: false,
            },
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
        },
        {
            sequelize,
            tableName: "stories",
            freezeTableName: true,
            underscored: true,
            timestamps: false,
        }
    );

    Story.associate = function(models){
        Story.belongsTo(models.User, {
            foreignKey: {
                name: 'userId',
                allowNull: false
            },
            as: 'user'
        })
    }

    return Story;
}