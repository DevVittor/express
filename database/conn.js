const Sequelize = require("sequelize");
const conn = new Sequelize(
    "Express","root","",{
        host:"localhost",
        dialect:"mysql"
    }
)

conn.authenticate()
.then(()=>console.log("Banco de dados sincronizado"))
.catch(error=>console.error(`Não deu para sincronizar o Banco dados por causa do error ${error}`));

module.exports = conn;