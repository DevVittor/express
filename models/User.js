const Sequelize = require("sequelize");
const conn = require('../database/conn');
const User = conn.define('User',{
    id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        autoIncrement:true,
        primaryKey:true
    },
    name:{
        type:Sequelize.STRING,
        allowNull:false
    },
    age:{
        type:Sequelize.INTEGER,
        allowNull:false
    },
    height:{
        type:Sequelize.FLOAT(3.2),
        allowNull:false
    }
})


User.sync();
module.exports = User;