const Sequelize = require("sequelize");
const conn = require("../database/conn");

const Login = conn.define('login',{
    email:{
        type: Sequelize.STRING,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    }
})
Login.sync();
module.exports = Login;