const {DataTypes} = require('sequelize');
const sequalize = require('../config/db');

const User = sequalize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {isEmail: true},
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false,
    },
});

module.exports = User;