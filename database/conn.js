const Sequelize = require("sequelize");
require("dotenv").config();
const conn = new Sequelize(
    process.env.DB_DATABASE,process.env.DB_USERNAME,process.env.DB_PASSWORD,{
        host:process.env.DB_HOST,
        dialect:process.env.DB_CONNECTION
    }
)

conn.authenticate()
.then(()=>console.log("Banco de dados sincronizado"))
.catch(error=>console.error(`Não deu para sincronizar o Banco dados por causa do error ${error}`));

module.exports = conn;