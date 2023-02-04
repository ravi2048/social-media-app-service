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
            userId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            friendId: {
                type: Sequelize.INTEGER,
                allowNull: false,
            }
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
                name: 'userId',
                allowNull: false
            },
            as: 'relationships'
        });
    }


    return Relationship;
}