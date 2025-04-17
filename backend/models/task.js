const {DataTypes} = require ('sequelize');
const sequalize = require('../config/db');
const User = require('./user');

const Task = sequalize.define('Task',{
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    title:{
        type:DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type:DataTypes.STRING,

    },
});

User.hasMany(Task,{foreignKey: 'userId',onDelete: 'CASCADE'});
Task.belongsTo(User, {foreignKey: 'userId'});